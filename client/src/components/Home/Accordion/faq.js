"use client";
// ======================== Imports ========================
import "flowbite";
import React, { useState } from "react";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";

export default function FAQ({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="md:p-10 p:3"
    >
      {faqs.map((faq, index) => (
        <AnimatedElement
          variant="scaleUp"
          delay={300}
          duration={800}
          threshold={0.5}
          once={true}
        >
          <div key={index}>
            <h2 id={`accordion-collapse-heading-${index}`}>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium font-bold text-gray-900 border border-b-0 rounded-t-xl focus:ring-2 focus:ring-indigo-800 hover:bg-indigo-100 gap-3"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span
                  className="text-left
"
                >
                  {faq.title}
                </span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 shrink-0 ${
                    activeIndex === index ? "" : "rotate-180"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${index}`}
              className={`${activeIndex === index ? "block" : "hidden"}`}
              aria-labelledby={`accordion-collapse-heading-${index}`}
            >
              <div className="p-5 border border-b-0 dark:bg-gray-900">
                <p className="text-gray-500">{faq.content}</p>
              </div>
            </div>
          </div>
        </AnimatedElement>
      ))}
    </div>
  );
}
