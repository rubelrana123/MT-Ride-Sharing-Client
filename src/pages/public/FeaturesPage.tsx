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
          desc="Discover the comprehensive features that make My Trip the preferred choice for riders, drivers, and administrators."
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
            Ready to Experience My Trip?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied riders and drivers who choose My Trip
            for reliable, affordable transportation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Contact Support Button */}
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-xl transition-colors text-white duration-700 px-8 py-6"
            >
              <Link to="/register">Start Riding Today</Link>
            </Button>

            {/* Email Us Button */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-foreground text-lg transition-colors duration-700 px-8 py-6"
            >
              <Link to="/register">Become a Driver</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
