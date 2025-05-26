"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventCard(event) {
  function handleRegister(eventId) {
    // Handle event registration logic here
    console.log(`Registering for event: ${eventId}`);
    // You can integrate with your registration system here
    alert("Registration functionality would be implemented here!");
  }

  function handleViewRecap(eventId) {
    // Handle view recap logic here
    console.log(`Viewing recap for event: ${eventId}`);
    // You can navigate to recap page or open modal here
    alert("Event recap functionality would be implemented here!");
  }

  const eventDate = new Date(event.date);
  const today = new Date();
  const isUpcoming = eventDate >= today;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        {isUpcoming ? (
          <Button className="w-full" onClick={() => handleRegister(event.id)}>
            Register for Event
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleViewRecap(event.id)}
          >
            View Event Recap
          </Button>
        )}
      </div>
    </Card>
  );
}
