"use client";
import React from "react";
import Image from "next/image";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import "./Message.styles.css"

export default function Message() {
  return (
    <div className="py-16 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="relative">
            <AnimatedElement>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse" />
                <div className="absolute inset-2 rounded-full border-2 border-blue-300 animate-pulse animation-delay-1000" />
                {/* Image container */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                  <div className="rounded-full overflow-hidden w-full h-full">
                    <Image
                      src="/images/director.jpg"
                      width={300}
                      height={300}
                      alt="Picture of the director"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Message Section */}
          <div className="flex-1 text-center md:text-left">
            <AnimatedElement>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Message from the Director
              </h2>
              <p className="text-lg text-gray-700 font-serif dark:text-gray-300 mb-6 leading-relaxed">
                “As we stand at the forefront of technological innovation, our
                center serves as a catalyst for transforming visionary ideas
                into impactful realities. We believe in nurturing not just
                startups, but dreamers and innovators who dare to challenge the
                status quo. Our commitment extends beyond providing resources –
                we create an ecosystem where creativity flourishes,
                collaboration thrives, and future leaders emerge.”
              </p>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-blue-600">
                  Kamal Darlami
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Director, Innovation and Entrepreneurship Center
                </span>
                <span className="text-sm text-gray-500 mt-2">
                  Asst. Professor at Institute of Engineering, Pulchowk Campus
                </span>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 3s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style> */}
    </div>
  );
}
