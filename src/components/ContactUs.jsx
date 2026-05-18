import React from 'react'
import ContactForm from './ContactForm'
import ContactAddress from './ContactAddress'
import useScrollReveal from '../hooks/useScrollReveal'

const ContactUs = () => {
  const addressRef = useScrollReveal({ animation: 'reveal-left' });
  const formRef = useScrollReveal({ animation: 'reveal-right', delay: '0.2s' });

  return (
    <div className='contact-us'>
      <div ref={addressRef} className="scroll-hidden-left">
        <ContactAddress />
      </div>
      <div ref={formRef} className="scroll-hidden-right">
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactUs
