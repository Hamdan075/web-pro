import { NavLink } from "react-router-dom";
import useScrollReveal from '../hooks/useScrollReveal';

import Footer from "../components/Footer";
import MissionVision from "../components/MissionVision";
import Testimonials from "../components/Testimonials";
import WhySchool from "../components/WhySchool";

const Home = () => {
    const titleRef = useScrollReveal();
    const infoRef = useScrollReveal({ delay: '0.2s' });
    const btnRef = useScrollReveal({ delay: '0.4s' });

    return ( 
        <>
            <div className="home">
                <p className="title scroll-hidden" ref={titleRef}>Welcome to Cambridge School</p>
                <br></br>
                <p className="info scroll-hidden" ref={infoRef}>We are delighted to have you visit our virtual home a place where knowledge thrives, dreams soar, and friendships flourish. At Cambridge school, we believe in cultivating an environment that fosters academic excellence, nurtures creativity, and embraces diversity.</p>
                <NavLink to='/about' className="scroll-hidden" ref={btnRef}>Explore</NavLink>
            </div>
            <MissionVision />
            <WhySchool />
            <Testimonials />
            <Footer />
        </>
    );
}
 
export default Home;