 
import AdminFeatures from "@/components/modules/public/Features/AdminFeatures";
import DriverFeatures from "@/components/modules/public/Features/DriverFeatures";
import RideFeatures from "@/components/modules/public/Features/RideFeatures";
import PageHeading from "@/components/modules/public/PageHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Features() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div>
        <PageHeading
          title="platform features"
          desc="Discover the comprehensive features that make Rydex the preferred choice for riders, drivers, and administrators."
        />


        {/* admin, rider, driver features */}
        <div>
          <RideFeatures />
          <DriverFeatures />
          <AdminFeatures />
        </div>

        {/* CTA Section */}
        <div className="gradient-hero rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Rydex?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied riders and drivers who choose Rydex
            for reliable, affordable transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 cursor-pointer hover:bg-green-700 duration-700 hover:duration-700 px-8 py-6 rounded-lg font-semibold transition-colors">
              <Link to="/register">Start Riding Today</Link>
            </Button>
            <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 duration-700 hover:duration-700 px-8 py-6 rounded-lg font-semibold transition-colors">
              <Link to="/register">Become a Driver</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
