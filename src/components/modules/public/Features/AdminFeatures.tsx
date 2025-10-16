import { adminFeatures } from "@/constants";
import SectionHeading from "../Home/SectionHeading";
import FeatureCard from "./FeatureCard";

export default function AdminFeatures() {
  return (
    <section className="mb-20">
      <div>
        <SectionHeading
          title="For Drivers"
          desc="Comprehensive management tools to oversee operations, ensure safety, and drive platform growth."
        />

        {/* ride features container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} color="primary" />
          ))}
        </div>
      </div>
    </section>
  );
}
