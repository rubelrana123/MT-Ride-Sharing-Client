import { highlights } from "@/constants";
 
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

export default function WhyChoose() {
  return (
    <section className="my-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="why choose MyTrip?"
          desc="Experience the difference with our commitment to safety, affordability, and accessibility."
        />

        {/* why choose container */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {highlights.map((highlight, idx) => (
            <Card
              key={idx}
              className="shadow-card duration-500 hover:scale-105 hover:shadow-lg transition-all group hover:duration-500"
            >
              <CardContent className="text-center">
                <div
                  className={`w-16 h-16 ${highlight.color} bg-current/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-current/20 transition-colors`}
                >
                  <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
