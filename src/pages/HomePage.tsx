import Domain from "../components/Domain";
import Founders from "../components/Founders";
import GettingSite from "../components/GettingSite";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Reviews from "../components/Reviews";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import Works from "../components/Works";
import Footer from "../components/Footer";
import FAQs from "../components/Faqs";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col gap-8 sm:gap-12 pt-0 sm:pt-0 overflow-x-hidden">
        <Hero />
        <Works />
        <Services />
        <Domain />
        <Reviews />
        <TechStack />
        <Founders />
        <FAQs />
        <GettingSite />
        <Footer />
      </div>
    </div>
  );
};
export default HomePage;
