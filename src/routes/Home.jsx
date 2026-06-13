import React from 'react';
import BookHero from '../components/BookHero';
import MissionVision from '../components/MissionVision';
import WhySchool from '../components/WhySchool';
import FacilityList from '../components/FacilityList';
import Testimonials from '../components/Testimonials';
import '../components/Sections.css';
import Footer from "../components/Footer";

const Home = () => {
    return ( 
        <>
            <BookHero />
            <MissionVision />
            <WhySchool />
            <Testimonials />
            <Footer />
        </>
    );
}
 
export default Home;