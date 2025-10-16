import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/constants";
import { Linkedin, Mail } from "lucide-react";
import SectionHeading from "../public/Home/SectionHeading";

export default function TeamMembers() {
  return (
    <div>
      <div className="mb-12">
        <SectionHeading
          title="meet out team"
          desc=" Our diverse team of experts is passionate about creating innovative
          transportation solutions."
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="shadow-card hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6 text-center">
              <div className="w-32 h-32 gradient-primary rounded-full border-2 border-primary mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-muted-foreground font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {member.bio}
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href={member.linkedin}
                  className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
