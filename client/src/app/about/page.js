import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Our Innovation Center</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Learn about our mission, vision, and the team behind our innovation and entrepreneurship center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Mission</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Empowering Innovators to Create Positive Change
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Our mission is to foster innovation and entrepreneurship by providing resources, mentorship, and a
                supportive community for individuals and teams with transformative ideas. We believe that
                entrepreneurship is a powerful vehicle for creating positive social, economic, and environmental impact.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed">
                We are committed to making entrepreneurship accessible to all, regardless of background or experience,
                and to supporting ventures that address meaningful challenges in our world.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Vision</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">A Thriving Ecosystem of Innovation</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                We envision a future where our innovation center is the heart of a thriving entrepreneurial ecosystem
                that generates sustainable solutions to local and global challenges. We aim to be a catalyst for
                economic growth, job creation, and positive social change in our community and beyond.
              </p>
              <p className="text-muted-foreground md:text-xl/relaxed">
                By 2030, we aspire to have supported over 500 startups, created 5,000 jobs, and established our region
                as a recognized hub for innovation in technology, sustainability, and social enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Story</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                How our innovation center came to be and evolved over time.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-border"></div>
            <div className="space-y-12">
              {[
                {
                  year: "2015",
                  title: "The Idea Takes Shape",
                  description:
                    "A group of entrepreneurs, educators, and community leaders came together with a shared vision of creating a hub for innovation and entrepreneurship in our region. They recognized the need for a supportive ecosystem to help aspiring entrepreneurs turn their ideas into reality.",
                  image: "/placeholder.svg?height=300&width=500&text=2015",
                },
                {
                  year: "2017",
                  title: "Doors Open",
                  description:
                    "After securing initial funding and a physical space, the Innovation Center officially opened its doors. We launched with a small team, a handful of startups, and a big vision. Our first cohort included five startups, three of which are still thriving today.",
                  image: "/placeholder.svg?height=300&width=500&text=2017",
                },
                {
                  year: "2019",
                  title: "Expansion and Growth",
                  description:
                    "With growing demand for our programs and services, we expanded to a larger facility and added new programs focused on specific sectors, including healthcare, sustainability, and education technology. Our community grew to include over 50 startups and 100+ mentors.",
                  image: "/placeholder.svg?height=300&width=500&text=2019",
                },
                {
                  year: "2021",
                  title: "Adapting to Change",
                  description:
                    "The global pandemic challenged us to reimagine how we support entrepreneurs. We launched virtual programs, created digital resources, and found new ways to foster connection in a remote environment. These innovations allowed us to reach entrepreneurs beyond our geographic area.",
                  image: "/placeholder.svg?height=300&width=500&text=2021",
                },
                {
                  year: "2023",
                  title: "Today and Beyond",
                  description:
                    "Today, our Innovation Center is a vibrant hub of activity, supporting over 100 startups annually through various programs and services. We've helped our portfolio companies raise more than $50 million in funding and create hundreds of jobs. As we look to the future, we're focused on expanding our impact and addressing emerging challenges through innovation and entrepreneurship.",
                  image: "/placeholder.svg?height=300&width=500&text=2023",
                },
              ].map((milestone, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground md:absolute md:left-1/2 md:-translate-x-1/2 md:z-10">
                    {milestone.year}
                  </div>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                      <Image
                        src={milestone.image || "/placeholder.svg"}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Team</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The dedicated professionals who make our innovation center possible.
              </p>
            </div>
          </div>

          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="board">Board</TabsTrigger>
            </TabsList>

            {/* Leadership Tab */}
            <TabsContent value="leadership" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Dr. Jane Smith",
                    role: "Executive Director",
                    image: "/placeholder.svg?height=300&width=300&text=Dr.+Jane",
                    bio: "Dr. Smith has over 15 years of experience in entrepreneurship education and startup development. Before joining the Innovation Center, she founded two successful tech companies and served as a professor of entrepreneurship at Global University.",
                  },
                  {
                    name: "Michael Johnson",
                    role: "Director of Programs",
                    image: "/placeholder.svg?height=300&width=300&text=Michael+J",
                    bio: "Michael oversees all entrepreneurship programs and curriculum development. With a background in venture capital and startup acceleration, he brings valuable insights on scaling early-stage ventures and securing investment.",
                  },
                  {
                    name: "Sarah Chen",
                    role: "Director of Partnerships",
                    image: "/placeholder.svg?height=300&width=300&text=Sarah+C",
                    bio: "Sarah leads our efforts to build strategic partnerships with corporations, investors, and community organizations. Her experience in corporate innovation and business development helps create valuable opportunities for our startups.",
                  },
                ].map((person, i) => (
                  <Card key={i}>
                    <div className="relative h-[200px]">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{person.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "David Rodriguez",
                    role: "Program Manager",
                    image: "/placeholder.svg?height=200&width=200&text=David+R",
                    bio: "David manages our incubation program and provides direct support to early-stage startups.",
                  },
                  {
                    name: "Aisha Patel",
                    role: "Events Coordinator",
                    image: "/placeholder.svg?height=200&width=200&text=Aisha+P",
                    bio: "Aisha organizes all center events, workshops, and networking opportunities.",
                  },
                  {
                    name: "James Wilson",
                    role: "Marketing Manager",
                    image: "/placeholder.svg?height=200&width=200&text=James+W",
                    bio: "James leads our marketing efforts and helps startups develop their brand strategies.",
                  },
                  {
                    name: "Lisa Thompson",
                    role: "Operations Manager",
                    image: "/placeholder.svg?height=200&width=200&text=Lisa+T",
                    bio: "Lisa ensures the smooth day-to-day operations of our center and facilities.",
                  },
                  {
                    name: "Carlos Mendez",
                    role: "Startup Advisor",
                    image: "/placeholder.svg?height=200&width=200&text=Carlos+M",
                    bio: "Carlos provides one-on-one coaching and business development support to our startups.",
                  },
                  {
                    name: "Emma Wilson",
                    role: "Community Manager",
                    image: "/placeholder.svg?height=200&width=200&text=Emma+W",
                    bio: "Emma fosters connections within our community and manages our mentor network.",
                  },
                  {
                    name: "Robert Kim",
                    role: "Technical Advisor",
                    image: "/placeholder.svg?height=200&width=200&text=Robert+K",
                    bio: "Robert provides technical guidance and support to startups developing new technologies.",
                  },
                  {
                    name: "Maria Gonzalez",
                    role: "Finance Manager",
                    image: "/placeholder.svg?height=200&width=200&text=Maria+G",
                    bio: "Maria manages our financial operations and helps startups with financial planning.",
                  },
                ].map((person, i) => (
                  <Card key={i}>
                    <div className="relative h-[150px]">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{person.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Board Tab */}
            <TabsContent value="board" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Dr. Thomas Lee",
                    role: "Board Chair",
                    organization: "Global University",
                    image: "/placeholder.svg?height=200&width=200&text=Dr.+Thomas",
                    bio: "Dr. Lee is the Dean of Business at Global University and brings extensive experience in entrepreneurship education and academic-industry partnerships.",
                  },
                  {
                    name: "Jennifer Martinez",
                    role: "Vice Chair",
                    organization: "TechVentures Capital",
                    image: "/placeholder.svg?height=200&width=200&text=Jennifer+M",
                    bio: "Jennifer is a Managing Partner at TechVentures Capital with expertise in early-stage investments and startup growth strategies.",
                  },
                  {
                    name: "Richard Wong",
                    role: "Treasurer",
                    organization: "Community Bank",
                    image: "/placeholder.svg?height=200&width=200&text=Richard+W",
                    bio: "Richard is the CFO of Community Bank and provides financial oversight and guidance for our center.",
                  },
                  {
                    name: "Mayor Olivia Brown",
                    role: "Board Member",
                    organization: "City Government",
                    image: "/placeholder.svg?height=200&width=200&text=Mayor+Brown",
                    bio: "Mayor Brown represents the city's interests and helps align our center's activities with local economic development goals.",
                  },
                  {
                    name: "Samuel Jackson",
                    role: "Board Member",
                    organization: "Successful Startup Founder",
                    image: "/placeholder.svg?height=200&width=200&text=Samuel+J",
                    bio: "Samuel founded and scaled a successful tech company and now mentors early-stage entrepreneurs.",
                  },
                  {
                    name: "Dr. Priya Sharma",
                    role: "Board Member",
                    organization: "Healthcare Innovation",
                    image: "/placeholder.svg?height=200&width=200&text=Dr.+Priya",
                    bio: "Dr. Sharma is a physician and healthcare entrepreneur who provides expertise on healthcare innovation and medical technology ventures.",
                  },
                ].map((person, i) => (
                  <Card key={i}>
                    <div className="relative h-[150px]">
                      <Image
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                      <CardDescription className="text-sm">{person.organization}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{person.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Facilities */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Facilities</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the spaces and resources available at our innovation center.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Co-working Space",
                description:
                  "Open workspace with high-speed internet, printing facilities, and meeting areas for startups and entrepreneurs.",
                image: "/placeholder.svg?height=300&width=500&text=Co-working+Space",
                features: ["24/7 access for members", "High-speed internet", "Meeting booths", "Printing and scanning"],
              },
              {
                name: "Event Space",
                description:
                  "Versatile area for workshops, presentations, networking events, and demo days with modern AV equipment.",
                image: "/placeholder.svg?height=300&width=500&text=Event+Space",
                features: [
                  "Capacity for 150 people",
                  "State-of-the-art AV equipment",
                  "Flexible seating arrangements",
                  "Catering options",
                ],
              },
              {
                name: "Innovation Lab",
                description:
                  "Specialized workspace with tools and equipment for prototyping and testing hardware and physical products.",
                image: "/placeholder.svg?height=300&width=500&text=Innovation+Lab",
                features: ["3D printers", "Laser cutters", "Electronics workstations", "Material testing equipment"],
              },
              {
                name: "Meeting Rooms",
                description: "Private spaces for team meetings, client presentations, and confidential discussions.",
                image: "/placeholder.svg?height=300&width=500&text=Meeting+Rooms",
                features: [
                  "Various sizes (4-20 people)",
                  "Video conferencing equipment",
                  "Digital whiteboards",
                  "Online booking system",
                ],
              },
            ].map((facility, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-[250px]">
                  <Image src={facility.image || "/placeholder.svg"} alt={facility.name} fill className="object-cover" />
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

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Visit Our Center?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Schedule a tour to see our facilities and learn more about how we can support your entrepreneurial
                journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule a Tour</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
