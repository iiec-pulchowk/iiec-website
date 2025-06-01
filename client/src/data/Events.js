"use client"; // Mark this file as a Client Component
// Sample events data will be fetched from the backend
// export const events = [ ... ]; // Remove static data
import { useState, useEffect } from "react"; // Added missing import

// const API_BASE_URL = "http://localhost:8080"; // Adjust if your backend URL is different
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API service for events
export const eventsAPI = {
  getEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch events:", error);
      // Propagate the error to be handled by the caller (e.g., useEvents hook)
      throw error;
    }
  },
  // Placeholder for other API methods if needed in the future
  // getEvent: async (id) => { /* ... */ },
  // createEvent: async (eventData) => { /* ... */ },
  // updateEvent: async (id, eventData) => { /* ... */ },
  // deleteEvent: async (id) => { /* ... */ },
};

// React Hook for managing events data
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to calculate status
  const getEventStatus = (eventDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    const eventDate = new Date(eventDateStr);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date

    return eventDate >= today ? "upcoming" : "past";
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEventsInternal(); // Renamed for clarity, or ensure it calls the inner function
  }, []);

  // Renamed inner function to avoid confusion with the potentially previously exported one
  const fetchEventsInternal = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventsAPI.getEvents();

      // Transform the data to match your existing structure and calculate status
      const transformedEvents = data.map((event) => ({
        id: event.id.toString(),
        title: event.title,
        description: event.description,
        date: event.date, // Assuming date is YYYY-MM-DD
        time: event.time,
        location: event.location,
        url: event.url,
        imageUrl: event.imageUrl || "/placeholder.svg",
        status: getEventStatus(event.date), // Calculate status
        created_at: event.created_at,
        updated_at: event.updated_at,
      }));

      setEvents(transformedEvents);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch events:", err);
      // Fallback to sample data if API fails
      const sampleEvents = [
        {
          id: "1",
          title: "Art of Science (Fallback)",
          date: "2024-12-15", // Example future date
          time: "09:00 AM",
          location: "Library Hall, Pulchowk Campus",
          description:
            "Reprehenderit pariatur occaecat consequat in tempor ipsum consequat non veniam excepteur sit quis.",
          url: "https://drive.google.com/drive/home",
          imageUrl: "/placeholder.svg",
        },
        {
          id: "2",
          title: "Past Workshop (Fallback)",
          date: "2023-01-10", // Example past date
          time: "14:00 PM",
          location: "Online",
          description: "A workshop that already happened.",
          url: "https://example.com/past-workshop",
          imageUrl: "/placeholder.svg",
        },
      ];
      setEvents(
        sampleEvents.map((event) => ({
          ...event,
          status: getEventStatus(event.date),
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = () => {
    fetchEventsInternal(); // Call the renamed inner function
  };

  return { events, loading, error, refetch: refreshEvents };
};

// Export the API service as default
export default eventsAPI;
