# Blue Consulting · sitio web (Vite + React)

Bilingüe ES (por defecto) / EN. Sin WebGL. La rama `redesign` abre con un paisaje a sangre, titular centrado (Newsreader) y una franja de tres datos. Debajo, fichas del mismo alto. Se distingue de `development`, que usa Roboto, un texto a la izquierda y servicios sin fotografía. No hay sección de fotos del equipo. La reserva es una solicitud en tres pasos: el equipo la confirma por WhatsApp o correo. No hay backend.

## Comandos
    npm install
    npm run dev      # desarrollo
    npm run build    # genera dist/ y, si hay Chrome, prerenderiza /es y /en
    npm run lint     # eslint-plugin-jsx-a11y
    npm run a11y     # axe sobre el preview de /es

La base del build es `/`, para que `/es` y `/en` resuelvan los archivos. Copie `.env.example` a `.env` antes de construir si va a activar analítica o el envío del formulario.

## Variables de entorno
Todas son opcionales. Vacías, el sitio no carga analítica y la reserva sigue con `.ics`, WhatsApp y correo.

- `VITE_SITE_URL`: origen absoluto para canonical y hreflang. Ejemplo `https://example.com`.
- `VITE_PLAUSIBLE_DOMAIN`: dominio de Plausible. Si está definido, se carga el script sin cookies.
- `VITE_PLAUSIBLE_SRC`: URL del script. Por defecto `https://plausible.io/js/script.js`.
- `VITE_UMAMI_SRC` y `VITE_UMAMI_WEBSITE_ID`: alternativa Umami, solo si Plausible está vacío.
- `VITE_FORMSPREE_ID`: id del formulario de Formspree. Si el envío falla, quedan WhatsApp, correo y `.ics`.

## Qué editar
- `src/config.js`: WhatsApp, correo, dirección, mapa, horarios (30 min, lunes a viernes, America/Bogota) y fotos.
- `src/i18n/dictionary.js`: todos los textos ES/EN.
- `src/styles/styles.css`: diseño. Titulares Newsreader, cuerpo Figtree.

## Marca
Papel `#F6F9F9`. Títulos y pie: `#36465F`. Acento `#556A88`. Salvia `#87A09A` y niebla `#B6CDCB` solo en fondos, líneas e iconos.
Logos: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.

## Hechos que sí se publican
Experiencia del equipo: 10 años. Sectores: 3 (ambiental, minero, administrativo). Sede: Bucaramanga, Carrera 29 No. 55A-56. Constitución: 23 de junio de 2023. NIT 901726097-9. Representante legal: Dra. Yolanda Salazar Ortiz. No hay casos con cifras ni logos de clientes.

## Fotos (licencia libre)
Las fotos de contenido viven en `src/assets` y el build las emite en AVIF y WebP con `srcset`. El hero usa `fetchpriority="high"`. El resto entra al acercarse a la pantalla y lleva un archivo pequeño, generado con vite-imagetools, como fondo de baja calidad. Las fichas llevan saturación 0,82, contraste 1,04 y una veladura niebla. Newsreader y Figtree se sirven desde `public/fonts` con `font-display: swap` y precarga. Newsreader va en el tamaño óptico del titular (opsz 48) y la cita en cursiva (opsz 36), en lugar del archivo variable completo, para no retrasar la primera pintura.

Unsplash License:

- `hero-*.webp` — cascada en bosque, paisaje del territorio. `photo-1432405972618-c60b0225b8f9`.
- `svc-amb-*.webp` — bosque de sol, estudio ambiental. `photo-1441974231531-c6227db76b6e`.
- `svc-min-*.webp` — tajo a cielo abierto con maquinaria. `photo-1611273426858-450d8e3c9fce`.
- `svc-adm-*.webp` — firma de documentos. `photo-1450101499163-c8848c66ca85`.
- `step-1.webp` — planos en el escritorio, diagnóstico. `photo-1454165804606-c3d57bc86b40`.
- `step-2.webp` — equipo en mesa, estrategia. `photo-1552664730-d307ca884978`.
- `step-3.webp` — documentos y cálculos, trámite. `photo-1554224155-8d04cb21cd6c`.
- `step-4.webp` — siembra de un brote, seguimiento en campo. `photo-1416339306562-f3d12fefd36f`.
- `meet.webp` — reunión de consulta con portátil. `photo-1600880292203-757bb62b4baf`.

`about.webp` (Pexels 8961055) no se publica: no hay sección de fotos del equipo.

## Mapa
Iframe perezoso de Google Maps para la sede (`CONFIG.mapEmbed`). No usa API key.

## Fotos de la comparación
No son un proyecto de la firma. Están marcadas como ilustrativas.

Unsplash License:

- `src/assets/land-before.jpg` — terreno abierto. `photo-1500534314209-a25ddb2bd429`.
- `src/assets/land-after.jpg` — ladera con cobertura vegetal. `photo-1470071459604-3b5ec3a7fe05`.

## Mapa
Dibujo SVG de Colombia. Resalta Santander y la sede en Bucaramanga. No coloca proyectos. El iframe de Google Maps sigue en el contacto.

## Movimiento
Animaciones de scroll con `animation-timeline` dentro de `@supports`, y transiciones de vista al cambiar idioma, pestañas y pasos. Se apagan con `prefers-reduced-motion`. El texto corrido no entra con una animación de aparición.
