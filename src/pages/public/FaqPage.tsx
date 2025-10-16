import PageHeading from "@/components/modules/public/PageHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqs } from "@/constants";

import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4">
      <div className="mt-20">
        <PageHeading
          title="Frequently Asked Questions"
          desc="Find answers to common questions about My Trip's services, payments, and policies."
        />

        {/* ================= search input ================== */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 max-w-4xl mx-auto w-full mt-20">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card rounded-lg border shadow-card"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-lg">
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No FAQs found matching your search. Try different keywords.
            </p>
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 text-center gradient-hero rounded-xl px-8  py-20 text-primary-foreground mb-24">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-primary-foreground mb-6">
          Our support team is here to help 24/7. Get in touch with us directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Contact Support Button */}
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-xl transition-colors text-white duration-700 px-8 py-6"
          >
            <Link to="/contact">Contact Support</Link>
          </Button>

          {/* Email Us Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-foreground text-lg transition-colors duration-700 px-8 py-6"
          >
            <Link to="mailto:saidulislamr333@gmail.com">Email Us</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
