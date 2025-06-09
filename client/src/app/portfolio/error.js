"use client";
import { Button } from "@/components/ui/button";

export default function Error() {
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

      {/* Error State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error loading projects: {projectsError || sectionsError}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
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
