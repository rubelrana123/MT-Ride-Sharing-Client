import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
 
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import z from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "name must be contain at least 3 characters"),
  email: z.email("Please provide valid email address"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(20, "message must be contain at least 20 characters")
    .max(3000, "you cross the maximum character limit 3000"),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    setLoading(true)
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully!");

      // Reset form
      form.reset();
      setLoading(false)
    } catch {
      toast("Failed to send message");
      setLoading(false)
    }
  };

  return (
    <div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Send us a message
          </CardTitle>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xl font-ride-title mb-1">Name</Label>
                    <FormControl>
                      <Input
                        placeholder="Jhone Doe"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xl font-ride-title mb-1">Email</Label>
                    <FormControl>
                      <Input
                        placeholder="jhondoe@gmaol.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xl font-ride-title mb-1">Message</Label>
                    <FormControl>
                      <Textarea
                        placeholder="your message..."
                        {...field}
                        value={field.value || ""}
                        className="h-60 no-scrollbar resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" variant="default" className="">
                {loading ? (
                  <p className="flex items-center gap-2">
                    {" "}
                    <ClipLoader size={18} color="#fff" /> Sending...
                  </p>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}