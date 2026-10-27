# Blue Consulting · sitio web (Vite + React)

Diseño inspirado en https://almaster.com.co/ (capturas de referencia en `../reference/`).
Bilingüe ES (por defecto) / EN. Reserva de reuniones por formulario (WhatsApp / correo) + espacio para Calendly / Google Calendar.

## Comandos
    npm install
    npm run dev      # desarrollo
    npm run build    # genera dist/ (estático, base './')

## Qué editar
- `src/config.js`: WhatsApp, correo, dirección, horarios del formulario, **`calendarEmbedUrl`** (Calendly/Google Calendar), **`social`** (URLs de Instagram y LinkedIn; vacías = íconos deshabilitados con aviso "pendientes"), **`heroImage`** (ej. `/assets/hero.jpg`, archivo en `public/assets/`; vacío = fondo de marca).
- `src/i18n/dictionary.js`: todos los textos ES/EN.
- `src/styles/styles.css`: diseño y paleta (variables al inicio).

## Marca
Paleta oficial (PDF de la cliente): #556A88 azul acero · #87A09A salvia · #B6CDCB niebla · #A5ADBE lavanda gris.
Derivados (no oficiales, ajustables): #36465f (azul acero oscuro, títulos/pie) y #f2f6f5 (fondo claro).
Logos vectoriales generados desde `Logo Blue Consulting_2.pdf`: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.
Archivos originales de la cliente en `public/assets/brand/`.
Fuentes: Roboto + Nunito Sans (Google Fonts).

Sección "Equipo" eliminada a pedido del cliente.

## 3D del hero (react-three-fiber + drei + three)
- `src/components/Hero3D.jsx`: anillo "pincelada" de vidrio/brillo (eco del círculo del logo) que flota y reacciona al mouse, sobre cordilleras low-poly y agua en la paleta de marca, luz suave y niebla.
- Carga diferida (`React.lazy` + `Suspense`, chunk aparte de ~240 kB gzip), DPR limitado a 1.5, se pausa fuera de pantalla (IntersectionObserver).
- Cae al degradado + SVG si hay "reducir movimiento", sin WebGL, ahorro de datos o móvil de baja potencia. `?3d=0` lo apaga y `?3d=1` lo fuerza.
- Tarjetas de servicios: inclinación 3D con CSS `perspective` (solo con mouse).
# blueconsulting
