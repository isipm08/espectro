# T06 DPPI
### Integrantes
☆ Isidora Pérez

☆ Dayana Pañitrur

## Espectro
> Concepto y relación imagen–sonido. ¿Qué relación propones y por qué? ¿Es de semejanza, de contraste o de traducción? ¿Qué quieres que la persona escuche que antes no escuchaba?

Establecemos la relación que tienen 3 elementos en conjunto, que tienen que ver con lo auditivo, lo visual y lo emocional, dentro de un mismo concepto: el espectro, rescatando la manera en que funcionan y cómo se interpretan todos por un mismo ente, en este caso el humano.

Nuestro proyecto es capaz de convertir la expresión facial visible en una composición visual en tiempo real. La relación imagen-sonido es una traducción simbólica, la cual una emoción es transformada en color y luego a un sonido representativo de tal emoción. 

Trabajamos con 3 espectros, los cuales son:

```Espectro emocional``` el sistema es capaz de reconocer las emociones de los rostros que identifica, ya sea en el video o en la cámara

```Espectro visible``` los colores presentes en la visualización, los cuáles son asociados cada uno a una emoción estimada por el sistema

```Espectro sonoro``` se define la escala, registro, timbre, ritmo y efectos, donde las notas se sintetizan en el momento, y que solo son controlables por los espectros anteriores

### Banco sonidos
> Banco de sonidos y disparador. Qué sonidos usaste, de dónde vienen y cómo los elegiste o grabaste. Qué fenómeno de la imagen los dispara y con qué regla (el mapping). Incluye una tabla con los sonidos, su autor y su licencia.

El "banco de sonidos" en realidad es una herramienta que entrega osciladores, envolventes, filtros, eco y reverb, llamada Tone.js, creando una composición distinta de cada sonido asociado a cada emoción. La mayoría de los parámetros que alteran la onda no son controlables manualmente, esto debido a que son las propias emociones identificadas que modifican el sonido.

```Tone.js``` es el motor en nuestro proyecto que es capaz de convertir las detecciones del sistema en sonido, generando las notas en tiempo real mediante síntesis. Además de generar estas notas, también es capaz de controlar características del sonido, como lo son la duración, volumen, timbre, filtro, delay.

Los fenómenos de la imagen que gatillan el sonido son dos:

1. Al contar con dos modos, el primer disparador "rostros", al momento de identificar la emoción produce el sonido asociado a esta.

2. El escáner necesita del modo "rostros" para saber en qué escala (emoción) emitirá el sonido, por cada lugar en la imagen que tenga el color asociado a esa emoción el escaner las reproducirá a medida que recorre el ancho del video.

### Funcionamiento
1. Realizar la carga de video o activar cámara.
2. El detector de forma automática hace el reconocimiento de rostros, en donde se clasifican según expresión facial: neutral, alegría, tristeza, enojo, miedo, asco y sorpresa.
3. Cada rostro recibe color y receta sonora según emoción actual.
4. El escáner recorre la imagen de izquierda a derecha o también se posiciona de forma manual, donde dispara notas.
   
### Parámetros
> Parámetros y gráfica. Qué parámetros del sonido se pueden modificar y por qué esos y no otros. 

| Sonido / emoción | Color en pantalla | Escala asignada | Timbre sintetizado | Autor de la receta y licencia |
|---|---|---|---|---|
| Neutral | Blanco frío `#EEF0FF` | Pentatónica mayor | Onda personalizada con parciales | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Alegría | Lima `#E2FF3B` | Lidia | Onda personalizada rica en armónicos | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Tristeza | Azul `#6A8CFF` | Eólica | Senoidal | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Enojo | Coral `#FF4D6D` | Frigia | Diente de sierra gruesa (3 voces desafinadas) | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Miedo | Violeta `#9A7BFF` | Octatónica | Senoidal FM con vibrato | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Asco | Verde `#7BD88F` | Locria | Cuadrada | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Sorpresa | Cian `#5CE1E6` | Tonos enteros | Senoidal AM | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |
| Murmullo (cantidad de personas) | — | — | Ruido rosa filtrado (pasa-banda 700 Hz) | Isidora Pérez y Dayana Pañitrur · sintetizado con Tone.js (MIT) · Licencia: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es) |

La detección de rostros y el reconocimiento facial es realizado por ```face-api.js```, la cual analiza los encuadres del video o cámara y entrega las expresiones, para luego ser traducidas a un color y sonido predeterminado.

### Activación
Se utilizan diferentes aspectos para poder generar la activación del sonido tales como:

```Rostro``` la expresión de este y la emoción que se genera es la que asigna la escala y el timbre, donde el grado musical es el que avanza dentro de esa escala.

```Escáner``` se colorean las zonas de los rostros, donde se dispara una nota

### Decisiones gráficas
> Qué decisiones gráficas tomaste (tipografía, color, visualización) y cómo se relacionan con el concepto. Incluye dos o tres capturas.

El nombre de nuestro proyecto se debe a diferentes conceptos que fuimos rescatando al momento de nuestra propuesta y proceso, donde queríamos representar las diferentes funciones que se capturan en nuestra interfaz, ya sea las emociones de las personas que luego son representadas en color y finalizando con lo sonoro. Donde todos estos aspectos se abarcaban en este concepto llamado ```Espectro```, el cuál busca representar la manera en la que el sistema navega en tiempo real por estos tres tipos de espectros distintos que se alimentan entre sí, a medida que las personas se mueven, cambian de expresión o aumenta la cantidad de rostros en la pantalla, los colores y los sonidos mutan.

El fondo de nuestra interfaz utiliza un tipo de gradiente, de una paleta compartida de rosados, lilas, naranjos y amarillos con leve textura.

```Espectro``` aparece en la tipografía llamada Instrument Serif cursiva y la interfaz a modo de textos generales y botones utiliza la tipografía llamada Libre Franklin Medium.

La diagramación de nuestra interfaz esta pensado con botones visibles tanto en la parte superior como inferior, los cuales representan funciones necesarias, como activar sonido, opción de video o cámara y también de poder pausar o darle play a este. Además tenemos los encuadres y las emociones, mostrando de forma gráfica lo que se está presentando en la visualización. Por último quisimos darle mayor énfasis a punto 05.Señal, el cual es de suma importancia para ir visualizando los datos que se nos van presentando tanto al activar cámara como al insertar un video.

### Reflexión
> Reflexión. ¿Qué descubriste al traducir imagen en sonido? ¿Qué queda fuera de la escucha de tu sistema? Propón al menos dos mejoras concretas para tu plataforma.

Espectro según Wikipedia es "una condición que no se limita a un conjunto específico de valores, sino que puede variar, sin pasos, a través de un continuo".
Este concepto no se mantuvo exclusivo de la ciencia física. A lo largo de los siglos se ha ido integrando a distintas áreas disciplinares, como las ciencias sociales, ciencias políticas, entre muchas otras más.

El espectro visible para el humano se encuentra entre los 380 y los 750 nanómetros (nm) de longitud de onda.

El espectro que percibe un oído humano está ubicado entre los 20 Hz y los 20 000 Hz (20 kHz)

Y en el ámbito de la psicología el espectro emocional abarca una gama amplia de aspectos relacionados a las experiencias afectivas, que van más allá de entender las emociones de forma ambigua como lo "bueno" y lo "malo".

Al desarrollar nuestro proyecto Espectro, descubrimos que una imagen puede escucharse de muchas maneras. El sistema traduce las expresiones faciales que detecta en colores, escalas y sonidos, haciendo perceptibles algunos patrones que normalmente solo vemos. Así, el rostro deja de ser únicamente una imagen: se convierte en una composición sonora que cambia mientras el video avanza o la cámara reconoce expresiones.

Este proceso también nos hizo notar que la traducción nunca es completa ni neutral. El sistema reconoce un conjunto limitado de expresiones y las interpreta según un modelo; no puede saber con certeza qué siente una persona. La iluminación, el ángulo, la calidad del video y las diferencias entre rostros pueden cambiar el resultado. Por eso, el sonido representa lo que el sistema detecta, no necesariamente la emoción real de quien aparece.

Como mejoras, nos gustaría mostrar cuánta confianza tiene el sistema en cada detección y permitir que las personas ajusten cómo se relacionan las emociones con los sonidos. También sería valioso probar la plataforma con rostros diversos y distintas condiciones de grabación para entender mejor sus límites y hacerla más inclusiva.





