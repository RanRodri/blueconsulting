/* ============================================================
   BLUE CONSULTING · Configuración editable
   ============================================================ */
export const CONFIG = {
  whatsappNumber: '573227337121',
  whatsappDisplay: '+57 322 733 7121',
  email: 'Blueconsultingcol@gmail.com',
  addressQuery: 'Carrera 29 No. 55A-56, Bucaramanga, Colombia',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+29+No.+55A-56+Bucaramanga+Colombia',
  mapEmbed: 'https://maps.google.com/maps?q=Carrera+29+No.+55A-56,+Bucaramanga,+Colombia&z=16&output=embed',

  social: { instagram: '', linkedin: '' },

  heroImage: {
    src: './assets/hero-1280.webp',
    srcSet: './assets/hero-640.webp 640w, ./assets/hero-1280.webp 1280w, ./assets/hero-1920.webp 1920w',
  },
  aboutImage: './assets/about.webp',
  serviceImages: {
    ambiental: {
      src: './assets/svc-amb-1280.webp',
      srcSet: './assets/svc-amb-640.webp 640w, ./assets/svc-amb-1280.webp 1280w',
    },
    minero: {
      src: './assets/svc-min-1280.webp',
      srcSet: './assets/svc-min-640.webp 640w, ./assets/svc-min-1280.webp 1280w',
    },
    administrativo: {
      src: './assets/svc-adm-1280.webp',
      srcSet: './assets/svc-adm-640.webp 640w, ./assets/svc-adm-1280.webp 1280w',
    },
  },

  bookingEmbedUrl: import.meta.env.VITE_BOOKING_EMBED_URL || '',

  slots: {
    days: [1, 2, 3, 4, 5],
    start: '08:00',
    end: '17:00',
    stepMinutes: 30,
    skip: ['12:00', '12:30'],
  },
  timezone: 'America/Bogota',
};
