"use client";

import { MessageCircle, IndianRupee, MapPin, Languages } from "lucide-react";

const indiaFeatures = [
  {
    icon: MessageCircle,
    title: "WhatsApp first",
    description: "All outputs delivered on WhatsApp. Not email. Not dashboard. WhatsApp.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: IndianRupee,
    title: "Rupees not dollars",
    description: "Every analysis in ₹. Razorpay not Stripe. Shiprocket not FedEx. India only.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: MapPin,
    title: "Tier 2 city ready",
    description: "Built for Pune, Jaipur, Surat, Indore. Not for Mumbai startups or Delhi agencies.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Languages,
    title: "Hindi and English",
    description: "Type in Hindi, Hinglish, or English. Agents understand and respond accordingly.",
    color: "bg-violet-50 text-violet-600",
  },
];

export function IndiaFirstSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Built for India. Not adapted.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {indiaFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
