import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router";

export default function CallToAction() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="gradient-hero rounded-2xl p-8 md:p-16 text-center relative">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

          <div className="relative">
            <Heart className="w-16 h-16 text-green-400 mx-auto mb-5" />
            <h2 className="text-3xl text-primary-foreground font-ride-title font-bold mb-5 capitalize">
              ready to start your journey?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who choose MyTrip for
              reliable, safe, and affordable transportation. Whether you need a
              ride or want to earn as a driver, we've got you covered.
            </p>

            {/* =========== cta button =========== */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-green-600 cursor-pointer hover:bg-green-700 duration-700 hover:duration-700 px-8 py-6 text-white border-0 text-lg"
              >
                <Link to="/register?role=rider" className="flex items-center gap-3">
                  Book Your First Ride
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-white hover:text-white hover:bg-primary-foreground/20 text-lg duration-700 hover:duration-700 px-8 py-6 cursor-pointer"
              >
                <Link to="/register?role=driver">Become a Driver</Link>
              </Button>
            </div>


            {/* cta footer */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 max-w-lg mx-auto">
                <div>
                    <h4 className="text-2xl text-primary-foreground font-bold font-ride-title">50k+</h4>
                    <p className="text-primary-foreground/80">Happy Riders</p>
                </div>
                <div>
                    <h4 className="text-2xl text-primary-foreground font-bold font-ride-title">5k+</h4>
                    <p className="text-primary-foreground/80">Active Drivers</p>
                </div>
                <div>
                    <h4 className="text-2xl text-primary-foreground font-bold font-ride-title">1M+</h4>
                    <p className="text-primary-foreground/80">Rides Completed</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
