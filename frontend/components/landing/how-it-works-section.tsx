"use client";

import { MessageSquare, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell us your problem",
    description: "Type anything in plain Hindi or English. 'My sales dropped' or 'Write this week's posts' or 'Why are customers not returning'",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "6 agents get to work",
    description: "Your AI team researches, analyses your data, studies competitors, writes content, and checks quality — all automatically.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Results on WhatsApp",
    description: "Emails sent. Posts scheduled. Customers re-engaged. Report saved. You get a WhatsApp summary of everything done.",
    icon: CheckCircle,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <p className="text-lg text-gray-600">
            Three steps. No coding. No setup calls.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-violet-100 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Line */}
        <p className="text-center text-violet-600 font-semibold mt-12">
          Average time from typing to done: 90 seconds
        </p>
      </div>
    </section>
  );
}
