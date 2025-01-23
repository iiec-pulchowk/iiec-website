import React from "react";
import { MapPin } from "lucide-react";

export default function GoogleMapSnippet() {
  return (
    <div className="container max-w-md mx-auto">
      {/* <div className="flex items-center justify-center mb-6">
        <MapPin className="text-red-500 mr-2" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">
          Location of IIEC Pulchowk
        </h2>
      </div> */}
      <div className="relative w-full h-196 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.381915633584!2d85.31976412851584!3d27.683553398506085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19006138c731%3A0x515ac1c075e3654c!2sSEDS%20Pulchowk!5e1!3m2!1sen!2snp!4v1737654176228!5m2!1sen!2snp"
          width="600"
          height="500"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
