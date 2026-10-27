import { CONFIG } from '../config.js';
import { media } from '../images.js';
import { useLang } from '../i18n/LangContext.jsx';

const copy = {
  es: {
    title: 'Blue Consulting · Consultoría ambiental, minera y jurídica',
    description: 'Blue Consulting S.A.S.: asesoría, consultoría y capacitación técnica y jurídica en materia ambiental, minera y administrativa. Bucaramanga, Colombia.',
  },
  en: {
    title: 'Blue Consulting · Environmental, mining and legal advisory',
    description: 'Blue Consulting S.A.S.: technical and legal advisory, consulting and training in environmental, mining and administrative matters. Bucaramanga, Colombia.',
  },
};

export function Seo() {
  const { lang } = useLang();
  const configured = String(import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
  const site = configured || (typeof window !== 'undefined' ? window.location.origin : '');
  const es = site ? `${site}/es` : '/es';
  const en = site ? `${site}/en` : '/en';
  const text = copy[lang];
  const image = site ? `${site}${media.hero.img.src}` : media.hero.img.src;
  const data = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    name: 'Blue Consulting S.A.S.',
    description: text.description,
    email: CONFIG.email,
    telephone: '+573227337121',
    foundingDate: '2023-06-23',
    taxID: '901726097-9',
    image,
    url: lang === 'en' ? en : es,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrera 29 No. 55A-56',
      addressLocality: 'Bucaramanga',
      addressRegion: 'Santander',
      addressCountry: 'CO',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Santander',
      containedInPlace: { '@type': 'Country', name: 'Colombia' },
    },
  };
  return (
    <>
      <title>{text.title}</title>
      <meta name="description" content={text.description} />
      <link rel="canonical" href={lang === 'en' ? en : es} />
      <link rel="alternate" hrefLang="es" href={es} />
      <link rel="alternate" hrefLang="en" href={en} />
      <link rel="alternate" hrefLang="x-default" href={es} />
      <meta property="og:title" content={text.title} />
      <meta property="og:description" content={text.description} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'es_CO'} />
      <meta property="og:image" content={image} />
      <link
        rel="preload"
        as="image"
        href={media.hero.img.src}
        imageSrcSet={media.hero.sources.avif}
        imageSizes="100vw"
        type="image/avif"
        fetchPriority="high"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </>
  );
}
