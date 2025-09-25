 
import ContactForm from "@/components/modules/public/Contact/ContactForm";
import PageHeading from "@/components/modules/public/PageHeading";
import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/constants";

export default function ContactPage ()  {
 

  return (
    <main className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div>
          <PageHeading
            title="Contact Us"
            desc="Have questions, feedback, or need support? We're here to help. Reach
              out to us anytime."
          />
        </div>

        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Get in touch
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our dedicated support team is available 24/7 to assist you with
                any questions, concerns, or technical issues. We value your
                feedback and are committed to providing exceptional customer
                service.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
 
      </div>
    </main>
  );
};

