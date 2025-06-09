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
                Startup Store
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover and support innovative products created by our startup
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Error State */}
      <section className="container mx-auto p-4 my-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Featured Products
        </h2>
        <div className="flex flex-col justify-center items-center py-20">
          <div className="text-red-500 text-xl mb-4">
            ⚠️ Failed to load products
          </div>
          <p className="text-gray-600 mb-4">Error: {error}</p>
          <Button onClick={refreshProducts} variant="outline">
            Try Again
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Have a Product to Showcase?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                If you're part of our incubation program and want to feature
                your product in our store, get in touch with us.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Submit Your Product</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/programs">Join Our Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
