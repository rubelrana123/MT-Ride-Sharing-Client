export default function OurStory() {
  return (
    <div className="grid md:grid-cols-2 gap-12 mb-20">
      <div>
        <h2 className="text-3xl font-bold text-foreground font-ride-title mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Founded in 2020, MyTrip started with a simple vision: make
            transportation accessible to everyone, regardless of their financial
            situation or technical expertise.
          </p>
          <p>
            We noticed that many ride-sharing platforms required credit cards
            and smartphone apps, leaving behind cash-only users and those with
            limited tech access. MyTrip bridges this gap by accepting cash
            payments and providing an inclusive platform.
          </p>
          <p>
            Today, we serve thousands of riders daily across multiple cities,
            maintaining our commitment to affordability, safety, and
            accessibility.
          </p>
        </div>
      </div>

      <div className="gradient-primary rounded-xl p-8 text-primary-foreground dark:text-white/80">
        <h3 className="text-2xl font-ride-title font-bold mb-6">Our Impact</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold font-ride-title">50K+</div>
            <div className="text-primary-foreground/80 dark:text-primary">Happy Riders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-ride-title">5K+</div>
            <div className="text-primary-foreground/80 dark:text-primary">Active Drivers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-ride-title">1M+</div>
            <div className="text-primary-foreground/80 dark:text-primary">Rides Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-ride-title">15</div>
            <div className="text-primary-foreground/80 dark:text-primary">Cities Served</div>
          </div>
        </div>
      </div>
    </div>
  );
}
