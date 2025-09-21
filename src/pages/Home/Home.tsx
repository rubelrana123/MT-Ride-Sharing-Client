import Hero from "@/components/modules/Home/HeroSection";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import WhyChoose from "@/components/modules/Home/WhyChoose";

const Home = () => {
  return (
    <div>
        <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      {/* <Testimonial />
      <CallToAction /> */}
    </div>
    </div>
  );
};

export default Home;