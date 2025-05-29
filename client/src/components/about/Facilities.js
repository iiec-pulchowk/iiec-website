import Image from "next/image";
import { facilities } from "@/data/Facilities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Facilities() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Facilities
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the spaces and resources available at our innovation
              center.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {facilities.map((facility, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{facility.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">{facility.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {facility.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
