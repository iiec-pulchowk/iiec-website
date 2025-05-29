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
  function handleRegister(registrationURL) {
    if (registrationURL) {
      window.open(registrationURL, "_blank", "noopener,noreferrer");
    } else {
      alert("Registration link is not available for this event.");
    }
  }

  function handleViewRecap(recapURL) {
    if (recapURL) {
      window.open(recapURL, "_blank", "noopener,noreferrer");
    } else {
      alert("Event recap is not available yet.");
    }
  }

  const eventDate = new Date(event.event.date);
  const today = new Date();
  const isUpcoming = eventDate >= today;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Image
          src={event.event.imageUrl}
          alt={event.event.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{event.event.title}</CardTitle>
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {event.event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(event.event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{event.event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.event.location}</span>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        {isUpcoming ? (
          <Button
            className="w-full"
            onClick={() => handleRegister(event.event.url)}
          >
            Register for Event
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleViewRecap(event.event.url)}
          >
            View Event Recap
          </Button>
        )}
      </div>
    </Card>
  );
}
