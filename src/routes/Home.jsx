import BookHero from "../components/BookHero";
import Footer from "../components/Footer";
import MissionVision from "../components/MissionVision";
import Testimonials from "../components/Testimonials";
import WhySchool from "../components/WhySchool";

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