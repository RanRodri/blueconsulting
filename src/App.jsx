import Header from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import Facts from './components/Facts.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Method from './components/Method.jsx';
import { Mission, Values, Projects, Why } from './components/Mission.jsx';
import Booking from './components/Booking.jsx';
import { Talk, Footer, Float } from './components/ContactFooter.jsx';
import { Tx } from './i18n/LangContext.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main"><Tx k="a11y.skip" /></a>
      <Header />
      <main id="main">
        <Hero />
        <Facts />
        <Services />
        <About />
        <Method />
        <Mission />
        <Values />
        <Projects />
        <Why />
        <Booking />
        <Talk />
      </main>
      <Footer />
      <Float />
      <a className="dock" href="#agendar"><Tx k="dock.cta" /></a>
    </>
  );
}
