"use client"; // Mark as a Client Component
import EventCard from "@/components/events/event-card";
import UpcomingEventsSection from "@/components/events/upcomingEventsSection";
import { useEvents } from "@/data/Events"; // Import the useEvents hook
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Loader2,
} from "lucide-react"; // Added AlertTriangle and Loader2

export default function EventsPage() {
  const { events: allEvents, loading, error } = useEvents(); // Use the hook

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today

  // Past events calculation will happen after loading and error checks
  let pastEvents = [];
  if (!loading && !error) {
    pastEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0); // Normalize event date
      return eventDate < today;
    });
    // Sort past events by date, most recent first
    pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Programs & Events
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join us for workshops, seminars, and networking events designed
                to help you enhance your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events - Using Reusable Component */}
      <UpcomingEventsSection
        showHeader={true}
        variant="default"
        containerClass="container mx-auto px-4 py-12 mb-8"
      />

      {/* Past Events */}
      <section className="container mx-auto px-4 py-12 mb-12 bg-gray-50">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
            <Clock className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Past Events</h2>
            <p className="text-gray-600 mt-1">
              Look back at our successful events and achievements
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
            <p className="mt-4 text-gray-600 text-lg">Loading past events...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 bg-red-50 p-6 rounded-lg border border-red-200">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <p className="mt-4 text-red-700 text-lg font-semibold">
              Could not load past events.
            </p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && pastEvents.length > 0 ? (
          <>
            <div className="bg-white rounded-lg p-6 mb-8 border border-purple-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="text-gray-800 font-semibold">
                  {pastEvents.length} Event{pastEvents.length !== 1 ? "s" : ""}{" "}
                  Completed
                </span>
              </div>
              <p className="text-gray-700">
                Explore our event archive and see the impact we've made
                together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative opacity-90 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="relative grayscale hover:grayscale-0 transition-all duration-300">
                    <EventCard event={event} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Event Archive</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Past Events Yet
            </h3>
            <p className="text-gray-600">
              This is where we'll showcase our completed events and their
              success stories.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Want to Host an Event With Us?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're always looking for partners to collaborate on events that
                benefit our entrepreneurial community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Propose an Event</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Become a Sponsor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
