import React from 'react'
import Footer from '../components/Footer'
import AdmissionInfo from '../components/AdmissionInfo'
import AdMoreInfo from '../components/AdMoreInfo'
import ApplyNow from '../components/ApplyNow'
import '../components/Sections.css'
import useScrollReveal from '../hooks/useScrollReveal'

const Admission = () => {
  const infoRef = useScrollReveal();
  const formRef = useScrollReveal({ delay: '0.15s' });

  return (
    <>
      <div className="pages admission">
        <h1 className="title">Admission</h1>
      </div>
      <div ref={infoRef} className="scroll-hidden">
        <AdmissionInfo />
      </div>
      <AdMoreInfo />
      <div ref={formRef} className="scroll-hidden">
        <ApplyNow />
      </div>
      <Footer />
    </>
  )
}

export default Admission