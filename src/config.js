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

  heroImage: './assets/hero.webp',
  aboutImage: './assets/about.webp',

  /* Si pega un Calendly o Google Calendar, el formulario sigue disponible debajo. */
  bookingEmbedUrl: import.meta.env.VITE_BOOKING_EMBED_URL || '',

  slots: {
    days: [1, 2, 3, 4, 5],
    start: '08:00',
    end: '17:00',
    stepMinutes: 60,
    skip: ['12:00', '13:00'],
  },
  timezoneLabel: 'Colombia (UTC-5)',
};
