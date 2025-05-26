
import EventCard from "@/components/events/event-card"
import { events } from "@/data/Events";

export default function EventsPage() {
  const today = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= today
  );
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Events</h1>
        <p className="text-muted-foreground text-lg">
          Discover upcoming events and explore our past gatherings
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No upcoming events at the moment.
            </p>
            <p className="text-muted-foreground">
              Check back soon for new events!
            </p>
          </div>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No past events to display.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
