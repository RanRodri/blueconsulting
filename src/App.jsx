import { useState } from 'react';
import Header from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import { CtaBand, Mission, Why } from './components/Mission.jsx';
import Booking from './components/Booking.jsx';
import { Tx } from './i18n/LangContext.jsx';
import { Contact, Footer } from './components/ContactFooter.jsx';

export default function App() {
  const [service, setService] = useState('general');
  return (
    <>
      <a className="skip" href="#main"><Tx k="a11y.skip" /></a>
      <Header />
      <main id="main">
        <Hero />
        <Services onPick={setService} />
        <About />
        <CtaBand />
        <Mission />
        <Why />
        <Booking service={service} setService={setService} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
