"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useProjects,
  useProjectSections,
  project_success_matrics,
} from "@/data/Projects";

import Projects from "@/components/portfolio/projects";
import Loading from "@/app/portfolio/loading";
import Error from "@/app/portfolio/error";

export default function ProjectsPage() {
  // Use the API hooks from Projects.js
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const {
    sections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useProjectSections();

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

  // Show loading state
  if (projectsLoading || sectionsLoading) {
    <Loading />;
  }

  // Show error state
  if (projectsError || sectionsError) {
    <Error />;
  }

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

      {/*Reusable Projects Section*/}
      <Projects />

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
