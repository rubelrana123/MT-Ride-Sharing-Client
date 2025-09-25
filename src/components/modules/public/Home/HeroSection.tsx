import heroImage from "@/assets/images/hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen px-4 z-10">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-30" />
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <div className="flex justify-center items-center min-h-screen relative z-50">
        <div className="text-center max-w-2xl w-full px-4">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="w-fit text-primary bg-accent dark:bg-accent/80  "
          >
            🚗 Trusted by 50,000+ riders
          </Badge>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white dark:text-white">
            Reliable Rides,
            <span className="text-primary dark:text-primary/80"> Cash Payments</span>
          </h1>

          {/* Paragraph */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 dark:text-white/80 leading-relaxed">
            Book safe, affordable rides 24/7. Pay in cash, track your ride, and
            experience professional service every time.
          </p>

          {/* Buttons */}
          <div className="flex max-[430px]:flex-col justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/riders/ride-book" className="flex items-center gap-3">
                Book a Ride Now
                <ArrowRight />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/50   text-primary hover:bg-white/10 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
