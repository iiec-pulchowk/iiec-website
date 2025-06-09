"use client";
import React, { useState, useEffect } from "react";

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentJoke, setCurrentJoke] = useState(0);

  const innovationJokes = [
    "Even our 404 errors are innovative! 🚀",
    "This page is still in the incubation phase... 🥚",
    "Our entrepreneurs are too busy changing the world to maintain this page! 💡",
    "Error 404: Innovation not found (just kidding, it's everywhere else!) ⚡",
    "This page failed to pivot successfully... unlike our startups! 📊",
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % innovationJokes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-full overflow-hidden bg-white">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          >
            <div className="w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Mouse follower gradient */}
      <div
        className="fixed w-96 h-96 rounded-full opacity-20 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%)",
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-6 py-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 animate-pulse select-none">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-gray-200 opacity-30 blur-sm animate-pulse">
              404
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-20 bg-gray-50/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-gray-200 shadow-xl">
            <div className="mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-bold rounded-full uppercase tracking-wider shadow-lg">
                Oops! Innovation Overload
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              This Page Is Still
              <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent block">
                Incubating!
              </span>
            </h2>

            {/* Rotating jokes */}
            <div className="h-12 mb-6 flex items-center justify-center">
              <p className="text-lg md:text-xl text-gray-600 font-medium transition-all duration-500 transform">
                {innovationJokes[currentJoke]}
              </p>
            </div>

            <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Don't worry! Our team of brilliant entrepreneurs and innovators
              are probably too busy
              <span className="text-gray-800 font-semibold">
                {" "}
                disrupting industries
              </span>{" "}
              and
              <span className="text-gray-700 font-semibold">
                {" "}
                building the future
              </span>{" "}
              to notice this little hiccup.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.history.back()}
                className="group relative px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                <span className="relative z-10">← Go Back & Innovate</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="group relative px-6 py-3 bg-gradient-to-r from-white to-gray-100 text-gray-900 font-bold rounded-full border-2 border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                <span className="relative z-10">🏠 Home Sweet Innovation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Fun fact */}
            <div className="mt-6 p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl border border-gray-300">
              <p className="text-gray-700 text-sm">
                <span className="font-bold">💡 Fun Fact:</span> This 404 error
                has more creativity than most startups' entire pitch deck!
              </p>
            </div>
          </div>

          {/* Footer message */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Incubation Innovation & Entrepreneurship Center
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Where even our errors are innovative! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </main>
  );
}
