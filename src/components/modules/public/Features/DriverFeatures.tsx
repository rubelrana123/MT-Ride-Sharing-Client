import { driverFeatures } from "@/constants";
import SectionHeading from "../Home/SectionHeading";
import FeatureCard from "./FeatureCard";

 

export default function DriverFeatures() {
  return (
    <section className="mb-20">
      <div>
        <SectionHeading
          title="For Drivers"
          desc="Powerful tools to help drivers maximize earnings and provide excellent service to riders."
        />

        {/* ride features container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {driverFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} color="green-500" />
          ))}
        </div>
      </div>
    </section>
  );
}
