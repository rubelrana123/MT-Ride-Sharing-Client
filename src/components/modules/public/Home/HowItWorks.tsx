import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { steps } from "@/constants";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
          <SectionHeading
            title="how it works"
            desc="Getting a ride with My Trip is simple and straightforward. Here's how:"
          />
    
          {/* how it works container */}
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {steps.map((step, idx) => (
              <Card key={idx} className="text-center group bg-transparent shadow-card duration-500 hover:scale-105 hover:shadow-lg transition-all group hover:duration-500">
                <CardHeader>
                  <div className="relative">
                    <CardDescription className="text-primary gradient-accent w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {<step.icon size={32} />}
                    </CardDescription>
    
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center bg-primary border-2 text-white font-semibold  ">
                      {idx + 1}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-ride-title font-bold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
      </div>
    </section>
  );
}
