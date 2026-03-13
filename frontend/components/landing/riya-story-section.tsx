"use client";

import { X, Check } from "lucide-react";

export function RiyaStorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-600 mb-4">
            This is Riya
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            She was working harder than ever.
            <br />
            Her business was not growing.
          </h2>
        </div>

        {/* Before/After Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Before Card */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
            <p className="text-sm font-semibold text-red-600 uppercase mb-6">
              Before OracleAgent
            </p>
            <ul className="space-y-4">
              {[
                "Checked WhatsApp 200 times a day",
                "Posted on Instagram only when she remembered (sometimes 2 weeks gap)",
                "Had no idea 68 customers never came back",
                "Found out competitor launched sale 3 days later",
                "Ran out of Blue Kurti stock 4 times",
                "Made business decisions on gut feeling",
                "Spent 4 hours daily on things that were not growing her business",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-red-200">
              <p className="text-base font-bold text-red-600">
                Revenue stuck at ₹3L/month for 6 months
              </p>
            </div>
          </div>

          {/* After Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-7">
            <p className="text-sm font-semibold text-emerald-600 uppercase mb-6">
              After OracleAgent
            </p>
            <ul className="space-y-4">
              {[
                "Gets WhatsApp briefing at 7 AM — done",
                "7 Instagram posts written every Monday",
                "57 lost customers re-engaged last month",
                "Competitor alerts within hours",
                "Auto supplier email when stock hits 10",
                "Weekly revenue report every Monday",
                "Spends 15 minutes a day on operations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-emerald-200">
              <p className="text-base font-bold text-emerald-600">
                Revenue: ₹3L → ₹7.2L in 4 months
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <p className="text-center text-gray-500 italic mt-8 max-w-2xl mx-auto">
          Riya did not hire anyone. She did not learn any software. She typed her problem in plain Hindi. Her AI team handled the rest.
        </p>
      </div>
    </section>
  );
}
