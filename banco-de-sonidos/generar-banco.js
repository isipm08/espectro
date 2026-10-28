// Genera el banco de sonidos a partir de las recetas de script-v09.js.
// Usa la Web Audio API nativa (OfflineAudioContext) en Chromium sin pantalla:
// los mismos nodos que Tone.js usa por dentro, con la misma cadena de la plataforma.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const PRESETS = {
  neutral:   { name: "Neutral",  scale: "pmaj",  root: 0,  oct: 4, wave: "custom", partials: [1, 0.3, 0.12], atk: 0.05, dec: 0.25, sus: 0.5, rel: 1.2, cut: 3000, q: 1, vib: 0, delay: 0, rev: 0.3, every: 4, prob: 0.7 },
  happy:     { name: "Alegría",  scale: "lyd",   root: 7,  oct: 5, wave: "custom", partials: [1, 0.55, 0.4, 0.25, 0.15, 0.08], atk: 0.01, dec: 0.15, sus: 0.35, rel: 0.7, cut: 6500, q: 1.5, vib: 0, delay: 0.25, rev: 0.25, every: 2, prob: 0.7 },
  sad:       { name: "Tristeza", scale: "aeo",   root: 9,  oct: 3, wave: "sine", atk: 0.45, dec: 0.6, sus: 0.6, rel: 3, cut: 1400, q: 0.7, vib: 0.08, delay: 0.3, rev: 0.6, every: 8, prob: 0.8 },
  angry:     { name: "Enojo",    scale: "phr",   root: 4,  oct: 3, wave: "fatsawtooth", atk: 0.004, dec: 0.12, sus: 0.3, rel: 0.3, cut: 2400, q: 7, vib: 0, delay: 0, rev: 0.12, every: 1, prob: 0.45 },
  fearful:   { name: "Miedo",    scale: "oct",   root: 1,  oct: 4, wave: "fmsine", atk: 0.35, dec: 0.4, sus: 0.5, rel: 2.6, cut: 1000, q: 3, vib: 0.35, delay: 0.45, rev: 0.55, every: 3, prob: 0.5 },
  disgusted: { name: "Asco",     scale: "loc",   root: 11, oct: 3, wave: "square", atk: 0.06, dec: 0.3, sus: 0.4, rel: 0.9, cut: 650, q: 9, vib: 0.18, delay: 0.1, rev: 0.2, every: 4, prob: 0.5 },
  surprised: { name: "Sorpresa", scale: "whole", root: 2,  oct: 5, wave: "amsine", atk: 0.002, dec: 0.2, sus: 0.2, rel: 1.6, cut: 8000, q: 1, vib: 0, delay: 0.35, rev: 0.45, every: 2, prob: 0.6 },
};
const SCALES = { pmaj: [0, 2, 4, 7, 9], lyd: [0, 2, 4, 6, 7, 9, 11], aeo: [0, 2, 3, 5, 7, 8, 10], phr: [0, 1, 3, 5, 7, 8, 10],
  oct: [0, 1, 3, 4, 6, 7, 9, 10], loc: [0, 1, 3, 5, 6, 8, 10], whole: [0, 2, 4, 6, 8, 10] };

// ---------------- código que corre dentro del navegador ----------------
async function renderInPage({ job, PRESETS, SCALES }) {
  const SR = 44100, BPM = 84, STEP = 60 / BPM / 4;            // semicorchea a 84 bpm, como el reloj de la plataforma
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  let seed = job.seed || 1;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };   // aleatorio repetible

  const ctx = new OfflineAudioContext(2, Math.ceil(job.len * SR), SR);
  // ---- bus: igual que la plataforma (filtro de tensión → salida) ----
  const bus = ctx.createGain();
  const tension = ctx.createBiquadFilter(); tension.type = "lowpass"; tension.frequency.value = 12000 * (1 - 0.6 * (job.tension || 0)); tension.Q.value = 0.5;
  bus.connect(tension); tension.connect(ctx.destination);
  // eco compartido: FeedbackDelay "8n" a 84 bpm, feedback 0,35
  const dl = ctx.createDelay(2); dl.delayTime.value = 60 / BPM / 2; const fb = ctx.createGain(); fb.gain.value = 0.35;
  dl.connect(fb); fb.connect(dl); dl.connect(bus);
  // reverb compartida: como Tone.Reverb (ruido estéreo que decae en 4 s, pre-delay 10 ms)
  const conv = ctx.createConvolver(), irLen = Math.floor(4 * SR), ir = ctx.createBuffer(2, irLen, SR);
  for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < irLen; i++) { const t = i / SR; d[i] = t < 0.01 ? 0 : (rnd() * 2 - 1) * Math.exp(-(t - 0.01) * 5 / 4); } }
  conv.buffer = ir; conv.connect(bus);

  // ---- una voz de rostro: oscilador → vibrato → filtro → pan → (directo + eco + reverb) ----
  function makeVoice(p, panV) {
    const out = ctx.createGain(); out.gain.value = 0.2;       // ≈ -14 dB de la plataforma
    const vibD = ctx.createDelay(0.01); vibD.delayTime.value = 0.0025 * p.vib;
    const vibL = ctx.createOscillator(); vibL.frequency.value = 5; const vibG = ctx.createGain(); vibG.gain.value = 0.0025 * p.vib;
    vibL.connect(vibG); vibG.connect(vibD.delayTime); vibL.start();
    const filt = ctx.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = p.cut; filt.Q.value = p.q;
    const pan = ctx.createStereoPanner(); pan.pan.value = panV;
    out.connect(vibD); vibD.connect(filt); filt.connect(pan);
    pan.connect(bus);
    const sd = ctx.createGain(); sd.gain.value = p.delay; pan.connect(sd); sd.connect(dl);
    const sr = ctx.createGain(); sr.gain.value = p.rev; pan.connect(sr); sr.connect(conv);
    return out;
  }
  // ---- una nota: oscilador según la forma de onda + envolvente ADSR ----
  function note(p, dest, freq, t0, dur, vel) {
    const env = ctx.createGain(); env.gain.value = 0; env.connect(dest);
    const stops = [];
    const osc = (type, f, detune) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune || 0; stops.push(o); return o; };
    if (p.wave === "custom") {
      const imag = new Float32Array([0, ...p.partials]), real = new Float32Array(imag.length);
      const o = osc("sine", freq); o.setPeriodicWave(ctx.createPeriodicWave(real, imag)); o.connect(env);
    } else if (p.wave === "fatsawtooth") {                     // 3 sierras desafinadas ±15 cents
      const g = ctx.createGain(); g.gain.value = 1 / Math.sqrt(3); g.connect(env);
      [-15, 0, 15].forEach((d) => osc("sawtooth", freq, d).connect(g));
    } else if (p.wave === "fmsine") {                          // FM: armonicidad 1, índice de modulación 2
      const car = osc("sine", freq), mod = osc("sine", freq), mg = ctx.createGain(); mg.gain.value = freq * 2;
      mod.connect(mg); mg.connect(car.frequency); car.connect(env);
    } else if (p.wave === "amsine") {                          // AM: seno modulado por una cuadrada de 0 a 1
      const car = osc("sine", freq), mod = osc("square", freq), am = ctx.createGain(), mg = ctx.createGain();
      am.gain.value = 0.5; mg.gain.value = 0.5; mod.connect(mg); mg.connect(am.gain); car.connect(am); am.connect(env);
    } else osc(p.wave, freq).connect(env);
    // envolvente: ataque lineal, decay y release exponenciales (como Tone.Envelope)
    const a = Math.max(0.002, p.atk), peak = vel, susV = Math.max(0.0001, vel * p.sus), tr = t0 + Math.max(dur, a);
    env.gain.setValueAtTime(0, t0); env.gain.linearRampToValueAtTime(peak, t0 + a);
    env.gain.setTargetAtTime(susV, t0 + a, p.dec / 4);
    env.gain.cancelScheduledValues(tr); env.gain.setTargetAtTime(0, tr, p.rel / 5);
    stops.forEach((o) => { o.start(t0); o.stop(tr + p.rel * 1.6 + 0.05); });
  }
  const tonicOf = (p) => 12 * (p.oct + 1) + p.root;

  if (job.kind === "nota") {                                    // tónica de la emoción, sostenida
    const p = PRESETS[job.emo], v = makeVoice(p, 0);
    note(p, v, mtof(tonicOf(p)), 0.05, job.hold, 0.85);
  } else if (job.kind === "frase") {                            // 3 rostros con la misma emoción: acorde + melodía
    const p = PRESETS[job.emo], sc = SCALES[p.scale];
    const voices = [-0.5, 0, 0.5].map((pn, i) => ({ v: makeVoice(p, pn), anchor: i * 2, walk: 0, n: 0 }));
    const steps = Math.floor(job.play / STEP);
    for (let s = 1; s <= steps; s++) {
      if (s % p.every !== 0) continue;
      voices.forEach((vc) => {
        if (rnd() > p.prob) return;
        if (vc.n++ > 0) { const r = rnd(); vc.walk += r < 0.3 ? -1 : r < 0.55 ? 0 : r < 0.9 ? 1 : 2; vc.walk = Math.max(-2, Math.min(3, vc.walk)); }
        const deg = Math.max(0, vc.anchor + vc.walk);
        const m = tonicOf(p) + sc[deg % sc.length] + 12 * Math.floor(deg / sc.length);
        note(p, vc.v, mtof(m), 0.05 + s * STEP, Math.max(0.08, p.every * STEP * 0.8), 0.75);
      });
    }
  } else if (job.kind === "murmullo") {                         // ruido rosa → pasa-banda 700 Hz (tensión máxima)
    const n = Math.floor(job.len * SR), buf = ctx.createBuffer(2, n, SR);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < n; i++) { const w = rnd() * 2 - 1;     // ruido rosa (método de Paul Kellet)
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926; }
    }
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 700; bp.Q.value = 1;
    const g = ctx.createGain(); g.gain.setValueAtTime(0, 0); g.gain.linearRampToValueAtTime(0.22, 1.5);
    g.gain.setValueAtTime(0.22, job.len - 1.5); g.gain.linearRampToValueAtTime(0, job.len - 0.05);
    src.connect(bp); bp.connect(g); g.connect(bus); src.start(0);
  }

  const out = await ctx.startRendering();
  // normalizar a -1 dBFS, fundido final de 50 ms y codificar WAV 16 bits estéreo
  const L = out.getChannelData(0), R = out.getChannelData(1); let peak = 0;
  for (let i = 0; i < L.length; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const k = peak > 0 ? 0.891 / peak : 1, n = L.length, fade = Math.floor(0.05 * SR);
  const bytes = new ArrayBuffer(44 + n * 4), dv = new DataView(bytes);
  const str = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  str(0, "RIFF"); dv.setUint32(4, 36 + n * 4, true); str(8, "WAVE"); str(12, "fmt "); dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true); dv.setUint16(22, 2, true); dv.setUint32(24, SR, true); dv.setUint32(28, SR * 4, true);
  dv.setUint16(32, 4, true); dv.setUint16(34, 16, true); str(36, "data"); dv.setUint32(40, n * 4, true);
  for (let i = 0; i < n; i++) {
    const f = i > n - fade ? (n - i) / fade : 1;
    dv.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i] * k * f)) * 32767, true);
    dv.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i] * k * f)) * 32767, true);
  }
  let bin = ""; const u8 = new Uint8Array(bytes);
  for (let i = 0; i < u8.length; i += 0x8000) bin += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return { b64: btoa(bin), peak };
}

(async () => {
  const order = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];
  const slug = { neutral: "neutral", happy: "alegria", sad: "tristeza", angry: "enojo", fearful: "miedo", disgusted: "asco", surprised: "sorpresa" };
  const jobs = [];
  let num = 1;
  order.forEach((emo) => {
    const p = PRESETS[emo], hold = Math.max(1.2, p.atk + p.dec + 0.6);
    jobs.push({ file: String(num++).padStart(2, "0") + "_" + slug[emo] + "_nota.wav", kind: "nota", emo, hold, len: Math.min(9, 0.05 + hold + p.rel * 1.6 + 2.5), seed: 7 });
    jobs.push({ file: String(num++).padStart(2, "0") + "_" + slug[emo] + "_frase.wav", kind: "frase", emo, play: 9, len: 9 + p.rel * 1.6 + 2.5, seed: 11 + num });
  });
  jobs.push({ file: "15_murmullo_tension.wav", kind: "murmullo", len: 8, tension: 1, seed: 3 });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<html><body></body></html>");
  for (const job of jobs) {
    const r = await page.evaluate(renderInPage, { job, PRESETS, SCALES });
    fs.writeFileSync(path.join(OUT, job.file), Buffer.from(r.b64, "base64"));
    console.log(job.file, "peak", r.peak.toFixed(3));
  }
  await browser.close();
})();
