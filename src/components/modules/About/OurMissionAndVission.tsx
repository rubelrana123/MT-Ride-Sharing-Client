import { Card, CardContent } from "@/components/ui/card";

export default function OurMissionAndVission() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-20">
      <Card className="shadow-card">
        <CardContent className="p-8">
          <h3 className="text-2xl font-ride-title font-bold text-foreground mb-4">
            Our Mission
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            To provide safe, reliable, and affordable transportation services
            that connect communities and empower both riders and drivers, while
            embracing financial inclusion through cash payment options.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-8">
          <h3 className="text-2xl font-ride-title font-bold text-foreground mb-4">
            Our Vision
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            To become the world's most inclusive transportation platform, where
            everyone has access to safe and reliable rides, regardless of their
            financial or technological circumstances.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
