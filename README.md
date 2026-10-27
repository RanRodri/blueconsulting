# Blue Consulting · sitio web (Vite + React)

Diseño inspirado en https://almaster.com.co/ (capturas de referencia en `../reference/`).
Bilingüe ES (por defecto) / EN. Reserva de reuniones por formulario (WhatsApp / correo) + espacio para Calendly / Google Calendar.

## Comandos
    npm install
    npm run dev      # desarrollo
    npm run build    # genera dist/ (estático, base './')

## Qué editar
- `src/config.js`: WhatsApp, correo, dirección, horarios del formulario, **`bookingEmbedUrl`** (Calendly/Google Calendar), **`social`** (URLs de Instagram y LinkedIn; vacías = íconos deshabilitados con aviso "pendientes"), **`heroImage`** (ej. `/assets/hero.jpg`, archivo en `public/assets/`; vacío = fondo estático de marca).
- `src/i18n/dictionary.js`: todos los textos ES/EN.
- `src/styles/styles.css`: diseño y paleta (variables al inicio).

## Marca
Paleta oficial (PDF de la cliente): #556A88 azul acero · #87A09A salvia · #B6CDCB niebla · #A5ADBE lavanda gris.
Derivados (no oficiales, ajustables): #36465f (azul acero oscuro, títulos/pie) y #f2f6f5 (fondo claro).
Logos vectoriales generados desde `Logo Blue Consulting_2.pdf`: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.
Archivos originales de la cliente en `public/assets/brand/`.
Fuentes: Roboto + Nunito Sans (Google Fonts).

Sección "Equipo" eliminada a pedido del cliente.

## Hero
Fondo estático (CSS + SVG, sin WebGL): degradado en la paleta de marca (`#36465F`, `#556A88`, `#87A09A`, `#B6CDCB`, `#A5ADBE`) y anillos lineales que evocan el círculo del logo. El texto queda sobre un velo suave para seguir leyéndose.
Las tarjetas de servicios usan un hover ligero (elevación y sombra), sin inclinación.
# blueconsulting
