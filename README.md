# Blue Consulting · sitio web (Vite + React)

Bilingüe ES (por defecto) / EN. Sin WebGL. La reserva es una solicitud en tres pasos: el equipo la confirma por WhatsApp o correo. No hay backend.

## Comandos
    npm install
    npm run dev      # desarrollo
    npm run build    # genera dist/ (estático, base './')

## Qué editar
- `src/config.js`: WhatsApp, correo, dirección, mapa, horarios (30 min, lunes a viernes, America/Bogota) y fotos.
- `src/i18n/dictionary.js`: todos los textos ES/EN.
- `src/styles/styles.css`: diseño. Titulares Newsreader, cuerpo Figtree.

## Marca
Papel `#F6F9F9`. Títulos, hero, botones y pie: `#36465F`. Acento `#556A88`. Salvia `#87A09A` y niebla `#B6CDCB` solo en fondos, líneas e iconos.
Logos: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.

## Hechos que sí se publican
Experiencia del equipo: 10 años. Áreas: 3. Sede: Bucaramanga, Carrera 29 No. 55A-56. Constitución: 23 de junio de 2023. NIT 901726097-9. Representante legal: Dra. Yolanda Salazar Ortiz. No hay casos con cifras ni logos de clientes.

## Fotos (licencia libre)
WebP. El hero lleva `srcset` 640/1280/1920 y se precarga. El resto va con `loading="lazy"`.

- `hero-*.webp` — lago y montañas. Unsplash License, `photo-1501785888041-af3ef285b470`.
- `about.webp` — profesional con casco blanco. Licencia Pexels, foto 8961055.
- `svc-amb-*.webp` — bosque de niebla. Unsplash License, `photo-1470071459604`.
- `svc-min-*.webp` — colinas verdes. Unsplash License, `photo-1472214103451`.
- `svc-adm-*.webp` — sala de trabajo vacía. Unsplash License, `photo-1497366216548`.

## Mapa
Iframe perezoso de Google Maps para la sede (`CONFIG.mapEmbed`). No usa API key.

## Movimiento
Solo CSS, como máximo 400 ms. Se apaga con `prefers-reduced-motion`.
