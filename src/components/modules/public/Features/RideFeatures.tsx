import { riderFeatures } from "@/constants";
 
import FeatureCard from "./FeatureCard";
import SectionHeading from "../Home/SectionHeading";

export default function RideFeatures () {
  return (
    <section className="mb-20">
      <div>
        <SectionHeading
          title="For Riders"
          desc="Everything you need for a seamless ride booking experience, from simple booking to cash payments."
        />

        {/* ride features container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riderFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} color="primary" />
          ))}
        </div>
      </div>
    </section>
  );
}
