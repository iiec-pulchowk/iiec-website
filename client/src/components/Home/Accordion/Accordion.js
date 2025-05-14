"use client";
// ======================== Imports ========================
import "flowbite";
import React from "react";
import FAQ from "./faq";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";

export default function Accordion() {
  const AccordionData = [
    {
      title: "What does IIEC stand for?",
      content:
        "IIEC stands for Incubation, Innovation, and Entrepreneurship Center at Pulchowk Engineering Campus.",
    },
    {
      title: "Who can participate in IIEC programs?",
      content:
        "Students, faculty, and alumni of Pulchowk Engineering Campus, as well as external innovators with promising ideas, can participate in IIEC programs.",
    },
    {
      title: "What types of innovations does IIEC support?",
      content:
        "IIEC supports technological innovations, social impact solutions, startups, and entrepreneurial initiatives across various domains including engineering, technology, and social innovation.",
    },
    {
      title: "What resources does IIEC provide to innovators?",
      content:
        "IIEC offers mentorship, workspace, prototype development support, funding guidance, networking opportunities, and access to industry experts and potential investors.",
    },
    {
      title: "How does IIEC support startup development?",
      content:
        "We provide comprehensive startup support including business model development, market research, pitch deck preparation, funding connections, and legal advisory services.",
    },
    {
      title: "How are innovative projects funded?",
      content:
        "Funding comes from multiple sources including campus grants, government innovation schemes, private sector partnerships, angel investors, and occasional crowdfunding campaigns.",
    },
  ];

  return (
    <div className="mb-10">
      <AnimatedElement>
        <h1 className="m-4 mb-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-900 from-blue-400">
            ⁉ FAQ
          </span>
        </h1>
      </AnimatedElement>
      <FAQ faqs={AccordionData} />
    </div>
  );
}
