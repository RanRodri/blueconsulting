import Header from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import { CtaBand, Mission, Values, Why } from './components/Mission.jsx';
import Booking from './components/Booking.jsx';
import { Tx } from './i18n/LangContext.jsx';
import { Contact, Footer } from './components/ContactFooter.jsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#main"><Tx k="a11y.skip" /></a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Mission />
        <Values />
        <CtaBand />
        <Why />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
