"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { communityOrganizations } from "@/data/Community";

export default function OurCommunity() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Community
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the thriving community, and partners who make our
                innovation ecosystem run and succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Section - Preview with just 2 items */}
      <div className="px-4 py-8">
        <div className="space-y-12">
          {communityOrganizations.map((org, index) => (
            <div key={org.id} className="group">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-4 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={org.image}
                    alt={org.imageAlt}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {org.name}
                  </h2>
                  <p className="text-gray-700 text-sm">{org.description}</p>

                  {/* Details List - Simplified for preview */}
                  {org.details && org.details.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Teams
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                        {org.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Projects - Simplified for preview */}
                  {org.projects && org.projects.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Projects
                      </h3>
                      <div className="space-y-2">
                        {org.projects.map((project, i) => (
                          <div
                            key={i}
                            className="bg-white p-2 rounded-lg shadow-sm"
                          >
                            <h4 className="font-bold text-gray-700 text-sm">
                              {project.name}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Button */}
                  <div className="mt-4">
                    <a
                      href={org.url}
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-4 rounded-lg text-sm"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Join Our Community
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're an entrepreneur, mentor, investor, or supporter
                of innovation, there's a place for you in our community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/programs">Explore Programs</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
