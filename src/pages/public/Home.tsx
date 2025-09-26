import Hero from "@/components/modules/public/Home/HeroSection";
import HowItWorks from "@/components/modules/public/Home/HowItWorks";
import WhyChoose from "@/components/modules/public/Home/WhyChoose";
 

const Home = () => {
  return (
    <div>
        <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
    </div>
    </div>
  );
};

export default Home;