import React from "react";
import { Phone, Mail, Building } from "lucide-react";
import AnimatedElement from "@/components/Common/Animation/AnimatedElement";

export default function DepartmentCard({ data }) {
  return (
    <AnimatedElement>
      <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6">
        <div className="flex items-center mb-4">
          <Building className="mr-3 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">{data.Title}</h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <Phone className="mr-2 text-green-500 w-5 h-5" />
            <a
              href={`tel:${data.Tel.trim()}`}
              className="hover:text-blue-600 transition-colors"
            >
              {data.Tel}
            </a>
          </div>

          <div className="flex items-center text-gray-700">
            <Mail className="mr-2 text-red-500 w-5 h-5" />
            <a
              href={`mailto:${data.Email}`}
              className="hover:text-blue-600 transition-colors"
            >
              {data.Email}
            </a>
          </div>
        </div>
      </div>
    </AnimatedElement>
  );
}
