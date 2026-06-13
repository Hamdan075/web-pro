import React from 'react';
import AboutInfo from '../components/AboutInfo';
import AboutParts from '../components/AboutParts';
import MissionVision from '../components/MissionVision';
import '../components/Sections.css';
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <div className="pages">
        <h1 className="title">About us</h1>
      </div>
      <AboutInfo />
      <MissionVision />
      <AboutParts />
      <Footer />
    </>
  )
}

export default About