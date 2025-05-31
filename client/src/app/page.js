import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import HeroAnimation from "@/components/hero-animation";
import Facilities from "@/components/about/Facilities";
import Projects from "@/components/portfolio/Projects";
import UpcomingEventsSection from "@/components/events/upcomingEventsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Animation */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Empowering Innovators & Entrepreneurs
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  We provide the resources, mentorship, and community to help
                  turn your ideas into successful ventures.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button asChild size="lg">
                  <Link href="/events">Explore Programs</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Message from Head Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full overflow-hidden">
                <Image
                  src="/personnel/ChairPerson.jpeg?height=400&width=400"
                  alt="Director of Innovation Center"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Message from Our Head
                </h2>
                <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                  "Innovation is not just about new ideas; it's about creating
                  value and impact. At our center, we're committed to nurturing
                  the next generation of entrepreneurs who will shape our
                  future."
                </blockquote>
                <p className="text-muted-foreground">
                  Our Innovation Center was founded with a vision to create an
                  ecosystem where ideas can flourish and entrepreneurs can
                  thrive. We believe in the power of collaboration, mentorship,
                  and continuous learning.
                </p>
                <p className="font-semibold">Asst. Prof. Kamal Darlami </p>
              </div>
              <div>
                <Button variant="outline" asChild>
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <Facilities />

      {/* Upcoming Events Section for Home Page */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Upcoming Events
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join us for workshops, seminars, and networking opportunities
                designed to enhance your skill.
              </p>
            </div>
          </div>
          <UpcomingEventsSection
            showHeader={false}
            maxEvents={3} // Show only 3 events on home page
            variant="compact" // Use compact layout
            containerClass="container mx-auto px-4 py-16 bg-white" // Custom styling for home page
          />
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/events" className="flex items-center">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlighted Projects Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Highlighted Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover some of the innovative projects developed through our
                incubation program.
              </p>
            </div>
          </div>
            <Projects homePage={true} />
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/portfolio" className="flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our programs and
                services.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "Who can join the Innovation Center?",
                  answer:
                    "Our center is open to students, faculty, alumni, and community members with innovative ideas or startups at any stage of development.",
                },
                {
                  question: "What resources do you provide for startups?",
                  answer:
                    "We offer mentorship, workspace, funding opportunities, networking events, workshops, and access to a community of like-minded entrepreneurs and industry experts.",
                },
                {
                  question: "How long is the incubation program?",
                  answer:
                    "Our standard incubation program runs for 6 months, but we offer flexible options based on the needs and stage of your startup.",
                },
                {
                  question: "Do you take equity in startups?",
                  answer:
                    "We have different programs with varying terms. Some programs may involve equity, while others are completely free. Details are provided during the application process.",
                },
                {
                  question: "How can I apply for the incubation program?",
                  answer:
                    "You can apply through our website by filling out the application form on the Programs page. We review applications on a rolling basis.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/contact" className="flex items-center">
                Have More Questions? Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Turn Your Idea Into Reality?
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
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
