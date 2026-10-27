# Blue Consulting · sitio web (Vite + React)

Página bilingüe ES (por defecto) / EN. Sin WebGL. Las fotos ilustran cada sección. La reserva tiene tres pasos: el visitante puede guardar un archivo `.ics`, escribir por WhatsApp o enviar un correo. Si existe `VITE_FORMSPREE_ID`, el formulario también se registra en Formspree.

## Comandos

```
npm install
npm run dev
npm run build
npm run preview
```

## Qué editar

- `src/config.js`: WhatsApp, correo, dirección, mapa y horarios.
- `src/i18n/dictionary.js`: textos ES/EN.
- `.env`: `VITE_FORMSPREE_ID` (ver `.env.example`). Sin esa variable el sitio no afirma que la solicitud quedó registrada.
- `src/styles/styles.css`: paleta y maquetación.

## Marca

Paleta: `#36465F` profundo · `#556A88` acero · `#87A09A` salvia · `#B6CDCB` niebla · `#A5ADBE` lavanda · `#1F2A3B` tinta · `#F6F9F9` papel · `#D5DCE4` suave.

Logos: `public/assets/logo-{steel,sage,mist,lavender,white}.svg`.

Fuentes locales: Newsreader y Figtree (`public/fonts`).

## Fotos

`public/photos/`: bosque (`env`), tajo (`mine`), documentos (`admin`) y cascada (`nature`), en AVIF y WebP.
