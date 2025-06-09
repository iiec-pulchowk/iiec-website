"use client";

import { useState } from "react";
import { ChevronRight, Calendar, Eye } from "lucide-react";
import { useProjects, useProjectSections } from "@/data/Projects";

export default function Projects({ homePage = false }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Use the API hooks from Projects.js
  const { projects } = useProjects();
  const { sections } = useProjectSections();

  const getProjectSections = (projectId) => {
    return sections.filter((section) => section.projectId === projectId);
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
    <>
      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects available at the moment.
            </p>
            <p className="text-muted-foreground">
              Check back soon for new projects!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {(homePage ? [...projects].reverse().slice(0, 3) : projects).map(
              (project) => (
                <div
                  key={project.id}
                  className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/15 cursor-pointer ${
                    hoveredCard === project.id
                      ? "shadow-2xl shadow-gray-500/25"
                      : "shadow-xl"
                  }`}
                  onMouseEnter={
                    !homePage ? () => setHoveredCard(project.id) : undefined
                  }
                  onMouseLeave={
                    !homePage ? () => setHoveredCard(null) : undefined
                  }
                  onClick={
                    !homePage ? () => setSelectedProject(project) : undefined
                  }
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        project.mainImageUrl ||
                        "/placeholder.svg?height=256&width=400&text=Project+Image"
                      }
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
                      {formatDate(project.createdAt)}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-700  mb-3 group-hover:text-gray-900 transition-colors">
                      {project.name}
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {!homePage && (
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
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-blcak/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={
                  selectedProject.mainImageUrl ||
                  "/placeholder.svg?height=256&width=800&text=Project+Image"
                }
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
                {getProjectSections(selectedProject.id).length === 0 ? (
                  <p className="text-gray-400">
                    No project components available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getProjectSections(selectedProject.id).map((section) => (
                      <div
                        key={section.id}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <img
                          src={
                            section.imageUrl ||
                            "/placeholder.svg?height=128&width=300&text=Section+Image"
                          }
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
                )}
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
    </>
  );
}
