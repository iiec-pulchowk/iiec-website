import React from "react";
import AnimatedElement from "../Animation/AnimatedElement";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative bottom-0 bg-[#272626]">
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">IIEC</h3>
              <p className="text-gray-400">
                Empowering innovators to build the future through technology and
                entrepreneurship.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Startup Incubation</li>
                <li>Innovation Lab</li>
                <li>Accelerator Program</li>
                <li>Mentorship</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Events</li>
                <li>Blog</li>
                <li>Success Stories</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-600">
                  Twitter
                </a>
                <a href="#" className="hover:text-blue-600">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-blue-600">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Innovation Incubation and Entrepreneurship Center. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
