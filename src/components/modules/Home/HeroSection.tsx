import heroImage from "@/assets/images/hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen px-4">
      <div className="absolute inset-0 bg-black/60 z-30" />
<div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      /> 

      <div className="flex justify-center items-center min-h-screen relative z-50">
        <div className="text-center max-w-2xl w-full">
          <Badge variant="secondary" className="w-fit">
            🚗 Trusted by 50,000+ riders
          </Badge>
          <h1 className="text-5xl text-primary-foreground font-ride-title md:text-6xl font-bold mb-6 leading-tight">
            Reliable Rides,
            <span className="text-primary"> Cash Payments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
            Book safe, affordable rides 24/7. Pay in cash, track your ride, and
            experience professional service every time.
          </p>
          <div className="flex max-[430px]:flex-col justify-center  gap-4">
            <Button
              size="lg"
              variant="default"
              className="text-muted dark:text-white border-0 text-lg"
            >
              <Link to="/ride/request-ride" className="flex items-center gap-3">
                  Book a Ride Now
                  <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 text-lg"
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
