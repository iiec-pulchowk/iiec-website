"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    preferredContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
      preferredContact: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Contact Us
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch with our team to learn more about our programs,
                schedule a tour, or discuss partnership opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground">
                  We're here to answer any questions you have about our
                  programs, events, or how to get involved with our incubation,
                  innovation and entrepreneurship center.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <address className="not-italic text-muted-foreground">
                      <p>Pulchowk Campus</p>
                      <p>Pulchowk, Lalitpur</p>
                    </address>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:iiec@pcampus.edu.np"
                        className="hover:underline"
                      >
                        iiec@pcampus.edu.np
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+9779869310836" className="hover:underline">
                        (+977) 9869310836
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <div className="text-muted-foreground">
                      <p>Sunday - Friday: 10:15 AM - 5:00 PM</p>
                      <p>Saturday: Closed </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                <div className="container max-w-md mx-auto">
                  <div className="relative w-full h-196 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.381915633584!2d85.31976412851584!3d27.683553398506085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19006138c731%3A0x515ac1c075e3654c!2sSEDS%20Pulchowk!5e1!3m2!1sen!2snp!4v1737654176228!5m2!1sen!2snp"
                      width="600"
                      height="500"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Ram Chandra"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ram@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredContact">
                          Preferred Contact Method
                        </Label>
                        <Select
                          value={formData.preferredContact}
                          onValueChange={(value) =>
                            handleSelectChange("preferredContact", value)
                          }
                        >
                          <SelectTrigger id="preferredContact">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup
                        value={formData.inquiryType}
                        onValueChange={handleRadioChange}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="font-normal">
                            General Inquiry
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="program" id="program" />
                          <Label htmlFor="program" className="font-normal">
                            Program Information
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="partnership"
                            id="partnership"
                          />
                          <Label htmlFor="partnership" className="font-normal">
                            Partnership Opportunity
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tour" id="tour" />
                          <Label htmlFor="tour" className="font-normal">
                            Schedule a Tour
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        required
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find quick answers to common questions about contacting us and
                visiting our center.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="visiting" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visiting">Visiting</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
              </TabsList>

              <TabsContent value="visiting" className="mt-6 space-y-4">
                {[
                  {
                    question:
                      "Do I need to make an appointment to visit the Innovation Center?",
                    answer:
                      "While walk-ins are welcome during regular hours, we recommend scheduling a tour in advance to ensure staff availability and to receive a comprehensive introduction to our facilities and programs.",
                  },
                  {
                    question: "Is there parking available at the center?",
                    answer:
                      "Yes, we have a dedicated parking lot for visitors with 50 spaces. Additional street parking is available nearby. We also encourage the use of public transportation, as we're located near the Central Station.",
                  },
                  {
                    question:
                      "Can I use the co-working space for a day without being a member?",
                    answer:
                      "Yes, we offer day passes for our co-working space at $25 per day. This includes access to high-speed internet, coffee and tea, and common areas. Please bring a photo ID when purchasing a day pass.",
                  },
                  {
                    question: "Are your facilities accessible?",
                    answer:
                      "Yes, our building is fully accessible with ramps, elevators, and accessible restrooms. If you have specific accessibility needs, please contact us in advance so we can ensure the best experience during your visit.",
                  },
                ].map((faq, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="programs" className="mt-6 space-y-4">
                {[
                  {
                    question: "How do I apply for your incubation program?",
                    answer:
                      "Applications for our incubation program can be submitted through our website. We have quarterly application deadlines (March, June, September, December). The application process includes an online form, pitch deck submission, and an interview for shortlisted candidates.",
                  },
                  {
                    question:
                      "What stage should my startup be at to apply for your programs?",
                    answer:
                      "We have programs for entrepreneurs at various stages. Our Idea Validation program is for those with just a concept, while our Incubation Program is for early-stage startups with at least a prototype or MVP. Our Accelerator is designed for startups ready to scale with some market traction.",
                  },
                  {
                    question: "Do you charge fees for your programs?",
                    answer:
                      "Our Idea Validation program is free of charge. The Incubation Program has a monthly membership fee of $200, which includes workspace and all program benefits. For our Accelerator, we take a small equity stake (2-5%) instead of charging fees.",
                  },
                  {
                    question:
                      "Can I attend workshops without being in a program?",
                    answer:
                      "Yes, many of our workshops and events are open to the public, either for free or for a small fee. Check our Events page for upcoming opportunities and registration details.",
                  },
                ].map((faq, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="partnerships" className="mt-6 space-y-4">
                {[
                  {
                    question:
                      "How can my organization partner with the Innovation Center?",
                    answer:
                      "We offer various partnership opportunities, including corporate innovation programs, sponsored events, mentorship programs, and investment partnerships. Contact our Partnerships Director at partnerships@innovationcenter.com to discuss potential collaboration.",
                  },
                  {
                    question: "Do you accept donations or sponsorships?",
                    answer:
                      "Yes, as a non-profit organization, we welcome donations and sponsorships that help us expand our programs and support more entrepreneurs. Contributions may be tax-deductible, and we offer recognition benefits for sponsors at different levels.",
                  },
                  {
                    question: "Can I become a mentor at the Innovation Center?",
                    answer:
                      "We're always looking for experienced professionals to join our mentor network. Mentors typically commit to at least 4 hours per month for a minimum of 6 months. Please fill out the mentor application form on our website to express your interest.",
                  },
                  {
                    question:
                      "How can my company connect with startups in your portfolio?",
                    answer:
                      "We regularly host networking events where corporations can meet our startups. We can also facilitate introductions based on specific interests or needs. For more structured engagement, consider joining our Corporate Partners Program.",
                  },
                ].map((faq, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start Your Entrepreneurial Journey?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our community of innovators and entrepreneurs today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/programs">Explore Programs</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
