# Blue Consulting · sitio web (Vite + React)

Bilingüe ES (por defecto) / EN. Sin WebGL. La rama `redesign` es un índice editorial sobre papel, con grilla simétrica (columnas iguales, fichas de la misma altura) y fotografías ligadas a cada tema. Es distinto del hero fotográfico a sangre de `development`. La reserva es una solicitud en tres pasos: el equipo la confirma por WhatsApp o correo. No hay backend.

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
WebP, con el mismo tratamiento de color: saturación 0,82, contraste 1,04 y una veladura niebla en multiplicar. El círculo del inicio precarga `territory-480.webp` y ofrece `srcset` 480/960. El resto va con `loading="lazy"`.

Unsplash License:

- `territory-*.webp` — cascada y bosque, territorio y agua. `photo-1432405972618-c60b0225b8f9`.
- `svc-amb-*.webp` — bosque de sol, estudio ambiental. `photo-1441974231531-c6227db76b6e`.
- `svc-min-*.webp` — tajo a cielo abierto con maquinaria. `photo-1611273426858-450d8e3c9fce`.
- `svc-adm-*.webp` — firma de documentos. `photo-1450101499163-c8848c66ca85`.
- `step-1.webp` — planos en el escritorio, diagnóstico. `photo-1454165804606-c3d57bc86b40`.
- `step-2.webp` — equipo en mesa, estrategia. `photo-1552664730-d307ca884978`.
- `step-3.webp` — documentos y cálculos, trámite. `photo-1554224155-8d04cb21cd6c`.
- `step-4.webp` — siembra de un brote, seguimiento en campo. `photo-1416339306562-f3d12fefd36f`.
- `meet.webp` — reunión de consulta con portátil. `photo-1600880292203-757bb62b4baf`.

Pexels License:

- `about.webp` — profesional con casco en campo. Foto 8961055.

## Mapa
Iframe perezoso de Google Maps para la sede (`CONFIG.mapEmbed`). No usa API key.

## Movimiento
Solo CSS, como máximo 400 ms. Se apaga con `prefers-reduced-motion`.
