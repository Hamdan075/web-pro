import React from 'react';
import ContactUs from '../components/ContactUs';
import ContactForm from '../components/ContactForm';
import ContactAddress from '../components/ContactAddress';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import '../components/Sections.css';

const Contact = () => {
  const mapRef = useScrollReveal({ animation: 'reveal-scale' });

  return (
    <>
      <div className="pages contact">
        <h1 className="title">Contact Us</h1>
      </div>
      <div className="map scroll-hidden-scale" ref={mapRef}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13759.207479461347!2d72.34203252567055!3d30.44171806862763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3923356d63f51c8d%3A0x7f4b36585e56e875!2sCambridge%20Public%20High%20School!5e0!3m2!1sen!2s!4v1760288677997!5m2!1sen!2s" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <ContactUs />
      <Footer />
    </>
  )
}

export default Contact
