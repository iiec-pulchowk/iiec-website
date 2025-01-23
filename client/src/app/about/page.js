"use client";
import React, { useEffect } from "react";
import AboutCard from "@/components/About/AboutCard";

// ==================== About Page ====================
export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  // ==================== Return ====================
  return (
    <div className="relative isolate px-2 min-h-screen">
      <div className="mx-auto max-w-4xl py-2 pt-8 lg:py-24">
        <div className="text-center">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300 md:text-4xl">
            “Empowering innovators to build the future through technology and
            entrepreneurship.”.
          </h1>
          <p className="mt-6 text-md sm:text-xl text-gray-600 dark:text-gray-300 font-medium">
            Transform bold ideas into revolutionary ventures. We empower
            visionary entrepreneurs with cutting-edge resources, strategic
            mentorship, and a dynamic ecosystem to turn breakthrough concepts
            into global solutions.
          </p>
        </div>
      </div>
      <AboutCard />
    </div>
  );
}

// ============================================================================
