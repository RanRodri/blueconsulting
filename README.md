# Blue Consulting · sitio web (Vite + React)

Bilingüe ES (por defecto) / EN. Sin WebGL. Reserva de reuniones con calendario propio (la confirmación abre WhatsApp) y mapa embebido de la sede.

## Comandos
    npm install
    npm run dev      # desarrollo
    npm run build    # genera dist/ (estático, base './')

## Qué editar
- `src/config.js`: WhatsApp, correo, dirección, mapa, horarios del formulario, redes y rutas de las fotos.
- `src/i18n/dictionary.js`: todos los textos ES/EN.
- `src/styles/styles.css`: diseño y paleta (variables al inicio).

## Marca
Paleta oficial: #556A88 azul acero · #87A09A salvia · #B6CDCB niebla · #A5ADBE lavanda gris.
Derivado para títulos, banda y pie: #36465F.
Logos: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.
Fuentes: Roboto + Nunito Sans.

## Fotos (licencia libre)
Optimizadas a WebP. El hero se precarga (es la primera pintura). La foto de «Quiénes somos» y el mapa van con `loading="lazy"`.

- `public/assets/hero.webp` — lago alpino y montañas. Unsplash License, `photo-1501785888041-af3ef285b470`. [Archivo](https://images.unsplash.com/photo-1501785888041-af3ef285b470).
- `public/assets/about.webp` — ingeniera con casco blanco mirando el horizonte. Licencia Pexels, foto 8961055. [Página](https://www.pexels.com/photo/8961055/).

## Mapa
Iframe perezoso de Google Maps para Carrera 29 No. 55A-56, Bucaramanga (`CONFIG.mapEmbed`). No usa API key.
