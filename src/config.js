/* ============================================================
   BLUE CONSULTING · Configuración editable
   ============================================================ */
export const CONFIG = {
  /* Datos reales tomados del PDF de la cliente */
  whatsappNumber: '573227337121', // +57 322 733 7121 (solo dígitos, con indicativo de país)
  whatsappDisplay: '+57 322 733 7121',
  email: 'Blueconsultingcol@gmail.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Carrera+29+No.+55-56+Bucaramanga+Colombia',

  /* Redes sociales (el brochure menciona Instagram y LinkedIn; faltan los enlaces) */
  social: { instagram: '', linkedin: '' },

  /* Foto de fondo del hero (opcional). Ej.: '/assets/hero.jpg' (archivo en public/assets/).
     Vacío = fondo de marca con gradiente y ondas. */
  heroImage: '',

  /* ---- RESERVA DE REUNIONES (Calendly / Google Calendar) ----
     Pegue aquí el enlace de su página de agenda y el widget aparecerá solo:
       Calendly:        'https://calendly.com/SU-USUARIO/30min'
       Google Calendar: 'https://calendar.google.com/calendar/appointments/schedules/XXXXXXXX?gv=true'
     Déjelo vacío ('') para usar solo el formulario (WhatsApp / correo).
     También puede definirlo al compilar con la variable VITE_BOOKING_EMBED_URL. */
  bookingEmbedUrl: import.meta.env.VITE_BOOKING_EMBED_URL || '',

  /* ---- Disponibilidad del formulario (PROVISIONAL: confirmar con la cliente) ---- */
  slots: {
    days: [1, 2, 3, 4, 5], // 0=Dom ... 6=Sáb (Lun–Vie)
    start: '08:00',
    end: '17:00',
    stepMinutes: 60,
    skip: ['12:00'], // horas a omitir (p. ej. almuerzo)
  },
  timezoneLabel: 'Colombia (UTC-5)',
};
