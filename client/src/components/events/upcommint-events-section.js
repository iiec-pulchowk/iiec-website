"use client"; // Mark as a Client Component
import EventCard from "@/components/events/event-card";
import { useEvents } from "@/data/Events"; // Import the useEvents hook
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Users, AlertTriangle, Loader2 } from "lucide-react"; // Added AlertTriangle and Loader2

export default function UpcomingEventsSection({
  showHeader = true,
  maxEvents = null,
  containerClass = "container mx-auto px-4 py-12 mb-8",
  variant = "default",
}) {
  const { events: allEvents, loading, error } = useEvents(); // Use the hook

  if (loading) {
    return (
      <section className={containerClass}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <p className="text-gray-600 mt-1">
                Don't miss out on these exciting opportunities
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
          <p className="mt-4 text-gray-600 text-lg">
            Loading upcoming events...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={containerClass}>
        {showHeader && (
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <p className="text-gray-600 mt-1">
                Don't miss out on these exciting opportunities
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 p-6 rounded-lg border border-red-200">
          <AlertTriangle className="h-12 w-12 text-red-500" />
          <p className="mt-4 text-red-700 text-lg font-semibold">
            Could not load upcoming events.
          </p>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

  let upcomingEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date
    return eventDate >= today;
  });

  // Sort upcoming events by date, soonest first
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Limit events if maxEvents is specified
  if (maxEvents) {
    upcomingEvents = upcomingEvents.slice(0, maxEvents);
  }

  return (
    <section className={containerClass}>
      {showHeader && (
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
            <Calendar className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <p className="text-gray-600 mt-1">
              Don't miss out on these exciting opportunities
            </p>
          </div>
        </div>
      )}

      {upcomingEvents.length > 0 ? (
        <>
          {variant === "default" && (
            <div className="bg-gradient-to-r from-gray-150 to-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="text-gray-800 font-semibold">
                  {upcomingEvents.length} Event
                  {upcomingEvents.length !== 1 ? "s" : ""} Coming Up
                </span>
              </div>
              <p className="text-gray-700">
                Reserve your spot now and be part of our growing entrepreneurial
                community!
              </p>
            </div>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              variant === "compact" ? "lg:grid-cols-2" : "lg:grid-cols-3"
            } gap-8`}
          >
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <EventCard event={event} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Upcoming Events
          </h3>
          <p className="text-gray-600 mb-4">
            We're planning something amazing! Check back soon for new events.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contact">Get Notified</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
