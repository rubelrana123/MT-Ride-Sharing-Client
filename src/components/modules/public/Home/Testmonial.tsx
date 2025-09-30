import { Card, CardContent } from "@/components/ui/card";

import { testimonials } from "@/constants";
import { Star, User } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Testimonial() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Users Say"
          desc="Real feedback from riders and drivers who trust My Trip for their transportation needs."
        />

        {/* why choose container */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="shadow-card duration-500 hover:scale-105 hover:shadow-lg transition-all group hover:duration-500"
            >
              <CardContent className="p-6 flex flex-col justify-evenly h-full">
                {/* Stars */}
                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 text-center italic leading-relaxed">
                  “{testimonial.text}”
                </blockquote>

                {/* User Info */}
                <div className="flex items-center  justify-center">
                  <div className="w-12 h-12 gap-x-[-10px] flex items-center justify-center gradient-primary rounded-full">
                    <User className="w-6 h-6 dark:text-white" />
                  </div>
                  <div className="flex flex-col justify-center text-left">
                    <h3 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
