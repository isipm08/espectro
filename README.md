# T06 DPPI
### Integrantes
☆ Isidora Pérez

☆ Dayana Pañitrur

## Espectro
- Concepto y relación imagen–sonido. ¿Qué relación propones y por qué? ¿Es de semejanza, de contraste o de traducción? ¿Qué quieres que la persona escuche que antes no escuchaba?
  
Espectro según Wikipedia es "una condición que no se limita a un conjunto específico de valores, sino que puede variar, sin pasos, a través de un continuo".
Este concepto no se mantuvo exclusivo de la ciencia física. A lo largo de los siglos se ha ido integrando a distintas áreas disciplinares, como las ciencias sociales, ciencias políticas, entre muchas otras más.

El espectro visible para el humano se encuentra entre los 380 y los 750 nanómetros (nm) de longitud de onda.

El espectro que percibe un oído humano está ubicado entre los 20 Hz y los 20 000 Hz (20 kHz)

Y en el ámbito de la psicología, ------

Nuestro proyecto es capaz de convertir la expresión facial visible en una composición visual en tiempo real. La relación imagen-sonido es una traducción simbólica, la cual una emoción es transformada en color y luego a un sonido representativo de tal emoción. 

Trabajamos con 3 espectros, los cuales son:

```Espectro visible``` rostro recibe color asociado a la emoción la cual estima el sistema

```Espectro sonoro``` se define la escala, registro, timbre, ritmo y efectos, donde las notas se sintetizan en el momento

```Espectro visual``` el monitor es capaz de mostrar las formas de onda, armónicos y envolventes mediante la emoción, donde el sonido se vuelve visible

### Banco sonidos
Banco de sonidos y disparador. Qué sonidos usaste, de dónde vienen y cómo los elegiste o grabaste. Qué fenómeno de la imagen los dispara y con qué regla (el mapping). Incluye una tabla con los sonidos, su autor y su licencia.

**PONER MÁS INFO SOBRE ESTO**

### Funcionamiento
1. Realizar la carga de video o activar cámara.
2. El detector de forma automática hace el reconocimiento de rostros, en donde se clasifican según expresión facial: neutral, alegría, tristeza, enojo, miedo, asco y sorpresa.
3. Cada rostro recibe color y receta sonora según emoción actual.
4. El escáner recorre la imagen de izquierda a derecha o también se posiciona de forma manual, donde dispara notas.
   
### Parámetros
- Parámetros y gráfica. Qué parámetros del sonido se pueden modificar y por qué esos y no otros. 

**VER ESTO Y MODIFICAR TABLA**

| Sonido / emoción | Color en pantalla | Escala asignada | Timbre sintetizado | Autor de la receta y licencia |
|---|---|---|---|---|
| Neutral | Blanco frío `#EEF0FF` | Pentatónica mayor | Onda personalizada con parciales | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Alegría | Lima `#E2FF3B` | Lidia | Onda personalizada rica en armónicos | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Tristeza | Azul `#6A8CFF` | Eólica | Senoidal | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Enojo | Coral `#FF4D6D` | Frigia | Diente de sierra | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Miedo | Violeta `#9A7BFF` | Octatónica | Senoidal FM | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Asco | Verde `#7BD88F` | Locria | Cuadrada | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |
| Sorpresa | Cian `#5CE1E6` | Tonos enteros | Senoidal AM | Laboratorio de Sonido / equipo del proyecto; autoría individual y licencia por confirmar |

### Activación
Se utilizan diferentes aspectos para poder generar la activación del sonido tales como:

```Rostro``` la expresión de este y la emoción que se genera es la que asigna la escala y el timbre, donde el grado musical es el que avanza dentro de esa escala.

```Escáner``` se colorean las zonas de los rostros, donde se dispara una nota

### Decisiones gráficas
- Qué decisiones gráficas tomaste (tipografía, color, visualización) y cómo se relacionan con el concepto. Incluye dos o tres capturas.

El nombre de nuestro proyecto se debe a diferentes conceptos que fuimos rescatando al momento de nuestra propuesta y proceso, donde queríamos representar las diferentes funciones que se capturan en nuestra interfaz, ya sea las emociones de las personas que luego son representadas en color y finalizando con lo sonoro. Donde todos estos aspectos se abarcaban en este concepto llamado ```Espectro```. **METERLE MÁS CHAMULLO**

El fondo de nuestra interfaz utiliza un tipo de gradiente, de una paleta compartida de rosados, lilas, naranjos y amarillos con leve textura.

```Espectro``` aparece en la tipografía llamada Instrument Serif cursiva y la interfaz a modo de textos generales y botones utiliza la tipografía llamada Libre Franklin Medium.

La diagramación de nuestra interfaz esta pensado con botones visibles tanto en la parte superior como inferior, los cuales representan funciones necesarias, como activar sonido, opción de video o cámara y también de poder pausar o darle play a este. Además tenemos los encuadres y las emociones, mostrando de forma gráfica lo que se está presentando en la visualización. Por último quisimos darle mayor énfasis a punto 05.Señal, el cual es de suma importancia para ir visualizando los datos que se nos van presentando tanto al activar cámara como al insertar un video.

### Reflexión
- Reflexión. ¿Qué descubriste al traducir imagen en sonido? ¿Qué queda fuera de la escucha de tu sistema? Propón al menos dos mejoras concretas para tu plataforma.

- entender el sonido como una traducción del diseño
- qué fenómeno escuchamos
- con qué sonido lo representamos y la relación entre ambos > emociones
- elegir concepto: relación imagen-sonido
- banco sonidos: 5-15 sonidos
- disparador visual: definir fenómeno de la imagen que hace sonar / emitir sonidos > cantidad personas
- parámetros: cuales cualidades del sonido se modifican y por qué
- gráfica: nombre, tipografía, color, composición de la interfaz y forma de visualizar el sonido deben responder al concepto, como en una pieza de diseño completa.
- publicarla en github pages
- Jugar con una temática intima, como emociones y relación con las personas.
- Por ejemplo: el metro, muchas personas, la incomodidad de no conocer a nadie, un ambiente de tensión.
- open cv -- cargar imágenes y reconocer cosas
- cuanta cantidad de algo hay y se modifique un tono
- quizá uno es el tono y algunos son efectos, envolventes
- no poder controlar lo que sale

## Qué vamos a mantener de *Oír la luz*:
- pantalla completa
- activar sonido
- modo disparo > escáner > funcione para video/ cámara > estirar video o poder manipularlo
- sonido (mantener todo por ahora) -- se cambiará lo de las opciones de ondas 
- teclas > nota base y escala
- dejar como segunda función integrar la cámara en vivo y en directo, dejar primera opción la integración de videos pre grabados (fuente)
- modo disparo > escaner > cantidad personas
- grabar y descargar
- señal (dejarlo visible en la parte de arriba) qué pasa con tu video > dejar opción notas acá en forma de visualización (quizá nombrarlo monitor)

## Qué vamos a quitar
- visualización
- detección
- mapping
- midi
- teclas (quitar columnas y filas) se llamará escala
- sacar parte inferior abajo (pero dejar "líneas)
- sacar apartado ejemplo
- dejar solo frecuencia en la parte inferior izquierda

## Qué vamos a integrar en nuestra web:
Que la plataforma se enfoque principalmente en identificar elementos en videos montados, con la intención de abordar a más profundidad.

El sistema integrará la herramienta OpenCV, y esta identificará:
- Integrar según cantidad personas > expresiones faciales > emociones > colores > pentatonicas
- personas suman = alteran frecuencia en ciertos aspectos
- emociones agregan sonido en escala
- colores suman RGB, forma de onda 



## Criterios de evaluación
- Claridad y solidez del concepto.
- Coherencia entre banco de sonidos, disparador y parámetros.
- Calidad del diseño sonoro.
- Gráfica aplicada a la plataforma.
- Funcionamiento y publicación.
- Profundidad del README y la reflexión.
## Links
<https://opencv.org/about/>
<https://es.wikipedia.org/wiki/Espectro>
