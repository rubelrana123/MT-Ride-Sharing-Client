import Hero from "@/components/modules/public/Home/HeroSection";
import HowItWorks from "@/components/modules/public/Home/HowItWorks";
import Testimonial from "@/components/modules/public/Home/Testmonial";
import WhyChoose from "@/components/modules/public/Home/WhyChoose";
 

const Home = () => {
  return (
    <div>
        <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <Testimonial/>
    </div>
    </div>
  );
};

export default Home;