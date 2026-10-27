import Header from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import { Mission, Values, Quote, Why } from './components/Mission.jsx';
import Booking from './components/Booking.jsx';
import { Footer, Float } from './components/ContactFooter.jsx';
import { Tx } from './i18n/LangContext.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main"><Tx k="a11y.skip" /></a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Mission />
        <Values />
        <Quote />
        <Why />
        <Booking />
      </main>
      <Footer />
      <Float />
      <a className="dock" href="#agendar"><Tx k="dock.cta" /></a>
    </>
  );
}
