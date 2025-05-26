"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Calendar, Eye } from "lucide-react";
import {
  projects,
  project_sections,
  project_success_matrics,
} from "@/data/Projects";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const getProjectSections = (projectId) => {
    return project_sections.filter(
      (section) => section.project_id === projectId
    );
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "bg-green-200" : "bg-blue-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Innovation Portfolio
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the innovative projects and startups that have been
                developed through our incubation program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15 cursor-pointer ${
                hoveredCard === project.id
                  ? "shadow-2xl shadow-gray-500/25"
                  : "shadow-xl"
              }`}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.main_image_url}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-gray ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <Calendar size={16} />
                  {formatDate(project.created_at)}
                </div>

                <h3 className="text-2xl font-bold text-gray-700  mb-3 group-hover:text-gray-900 transition-colors">
                  {project.name}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <Eye size={16} />
                    View Details
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-gray-600 group-hover:text-gray-600 transition-colors transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-blcak/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={selectedProject.main_image_url}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {selectedProject.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-gray ${getStatusColor(
                    selectedProject.status
                  )}`}
                >
                  {selectedProject.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-4">
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>
              </div>

              {/* Project Sections */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Project Components
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getProjectSections(selectedProject.id).map((section) => (
                    <div
                      key={section.id}
                      className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={section.image_url}
                        alt={section.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold text-white mb-3">
                        {section.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gradient-to-r from-gray-600 to-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-700 transition-all duration-200 transform hover:scale-105"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Metrics */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Our Impact
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The collective achievements of our portfolio companies.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project_success_matrics.map((item, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold text-primary">
                    {item.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-medium mb-2">{item.label}</h3>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Join Our Portfolio?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Apply to our incubation program and turn your innovative idea
                into a successful venture.
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
                <Link href="/contact">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
