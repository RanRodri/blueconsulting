/* ============================================================
   BLUE CONSULTING · Configuración editable
   ============================================================ */
import { media } from './images.js';

export const CONFIG = {
  whatsappNumber: '573227337121',
  whatsappDisplay: '+57 322 733 7121',
  email: 'Blueconsultingcol@gmail.com',
  addressQuery: 'Carrera 29 No. 55A-56, Bucaramanga, Colombia',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+29+No.+55A-56+Bucaramanga+Colombia',
  mapEmbed: 'https://maps.google.com/maps?q=Carrera+29+No.+55A-56,+Bucaramanga,+Colombia&z=16&output=embed',

  social: { instagram: '', linkedin: '' },

  heroImage: { src: media.hero.img.src, srcSet: media.hero.sources.webp },
  quoteImage: media.quote,
  aboutImage: media.plans.img.src,
  meetImage: media.meet.img.src,
  serviceImages: {
    ambiental: { src: media.forest.img.src, srcSet: media.forest.sources.webp },
    minero: { src: media.mine.img.src, srcSet: media.mine.sources.webp },
    administrativo: { src: media.admin.img.src, srcSet: media.admin.sources.webp },
  },
  stepImages: [media.plans.img.src, media.table.img.src, media.papers.img.src, media.sprout.img.src],

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
