import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ElementType } from "react";


export interface FeatureCardProps {
  icon: ElementType
  title: string
  description: string
  highlight: string
}

export default function FeatureCard( { feature, color }: { feature: FeatureCardProps, color: string } ) {
  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div
          className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center mb-4 group-hover:bg-${color}/20 transition-colors`}
        >
          <feature.icon className={`h-6 w-6 text-${color}`} />
        </div>
        <CardTitle className="text-xl font-ride-title text-foreground">
          {feature.title}
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {feature.highlight}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
}
