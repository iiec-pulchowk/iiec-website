import AnimatedElement from "@/components/Common/Animation/AnimatedElement";
import React from "react";
import {
  IconBuilding,
  IconLightbulb,
  IconRocket,
  IconTarget,
  IconUsers,
  IconTrophy,
} from "@/components/icons";

// AboutCard Component
export default function AboutCard() {
  const features = [
    {
      icon: <IconBuilding className="h-8 w-8 text-blue-600" />,
      title: "State-of-the-Art Facilities",
      description:
        "Our center features modern co-working spaces, dedicated labs, meeting rooms, and advanced prototyping facilities to support your innovation journey.",
    },
    {
      icon: <IconTrophy className="h-8 w-8 text-blue-600" />,
      title: "Track Record of Success",
      description:
        "With over 200+ successful startups incubated and रु.50Cr+ in funding raised, we have a proven history of turning innovative ideas into successful ventures.",
    },
    {
      icon: <IconUsers className="h-8 w-8 text-blue-600" />,
      title: "Expert Mentorship",
      description:
        "Access our network of 100+ industry experts, successful entrepreneurs, and technical specialists who provide personalized guidance.",
    },
    {
      icon: <IconLightbulb className="h-8 w-8 text-blue-600" />,
      title: "Innovation Focus",
      description:
        "We specialize in emerging technologies including AI/ML, IoT, Clean Tech, and Digital Healthcare, helping startups stay at the cutting edge.",
    },
    {
      icon: <IconTarget className="h-8 w-8 text-blue-600" />,
      title: "Industry Partnerships",
      description:
        "Strategic collaborations with leading tech companies, research institutions, and government bodies provide unique opportunities for our startups.",
    },
    {
      icon: <IconRocket className="h-8 w-8 text-blue-600" />,
      title: "Comprehensive Support",
      description:
        "From ideation to market entry, we provide end-to-end support including technical resources, business development, and funding access.",
    },
  ];

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedElement>
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </div>
  );
};
