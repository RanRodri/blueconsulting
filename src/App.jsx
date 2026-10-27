import { ViewTransition } from 'react';
import Header from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import Strip from './components/Strip.jsx';
import Services from './components/Services.jsx';
import About, { Meter } from './components/About.jsx';
import { Bento } from './components/Bento.jsx';
import { Compare } from './components/Compare.jsx';
import { ColombiaMap } from './components/ColombiaMap.jsx';
import { Mission, Values, Quote, Why } from './components/Mission.jsx';
import Booking from './components/Booking.jsx';
import { Footer, StickyCta, BookDialog } from './components/ContactFooter.jsx';
import { Analytics } from './components/Analytics.jsx';
import { Seo } from './components/Seo.jsx';
import { Tx } from './i18n/LangContext.jsx';

export default function App() {
  return (
    <>
      <Seo />
      <Analytics />
      <div className="readbar" aria-hidden="true" />
      <a className="skip" href="#main"><Tx k="a11y.skip" /></a>
      <ViewTransition default="none" update={{ lang: 'fade-lang' }}>
        <Header />
        <main id="main">
          <Hero />
          <Strip />
          <Services />
          <Meter />
          <Bento />
          <About />
          <Compare />
          <ColombiaMap />
          <Mission />
          <Values />
          <Why />
          <Quote />
          <Booking />
        </main>
        <Footer />
      </ViewTransition>
      <StickyCta />
      <BookDialog />
      <button type="button" className="dock" onClick={() => window.dispatchEvent(new Event('bc-open-book'))}>
        <Tx k="dock.cta" />
      </button>
    </>
  );
}
