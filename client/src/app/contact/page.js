"use client";
import React, { useState, useEffect } from "react";
import ContactCard from "@/components/contact/ContactCard";
import DirectMessageForm from "@/components/contact/Message/DirectMessage";
import GoogleMapSnippet from "@/components/contact/Map/MapSnippet";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import FetchContactData from "@/Helper/FetchContactData";
import { MapPin, Loader2 } from "lucide-react";

export default function CommunitySection({ HorizontalScroll = false }) {
  const [ContactData, setContactdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await FetchContactData();
      if (res.success) {
        setContactdata(res.data);
        setError(null);
      } else {
        setError("Failed to fetch contact data");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching contacts");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedElement>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-900 mb-2">
              Contact IIEC Pulchowk
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              Pulchowk Engineering Campus, IOE
            </h2>
            <div className="flex justify-center items-center text-gray-600 text-xl mt-2">
              <MapPin className="mr-2 text-red-500" />
              Pulchowk, Lalitpur, Nepal
            </div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Connecting Innovators and Entrepreneurs, Driving Technological
              Innovation
            </p>
          </div>
        </AnimatedElement>

        {isLoading && (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-indigo-500" size={56} />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {ContactData && (
          <div
            className={`grid ${
              HorizontalScroll
                ? "grid-flow-col overflow-x-auto space-x-4 py-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            }`}
          >
            {ContactData.map((data, index) => (
              <ContactCard key={index} data={data} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-20 px-20 gap-5 flex flex-row max-md:flex-col max-md:px-5 justify-center items-center">
      <div className="w-1/2 max-md:w-full max-xs:w-full">
        <DirectMessageForm />
      </div>
      <div className="w-1/2 max-md:w-full max-xs:w-full">
        <GoogleMapSnippet />
      </div>
    </div>
    </div>
  );
}
