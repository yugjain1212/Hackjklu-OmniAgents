"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div 
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Tag */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-violet-50 mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-violet-600">
                Built for Indian Clothing Boutiques
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[42px] font-bold text-gray-900 leading-[1.15] mb-5">
              Your boutique is{" "}
              <span className="text-red-600">losing customers</span>{" "}
              every day. You just don&apos;t know it yet.
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-lg">
              OracleAgent finds your lost customers, understands why they left, and brings them back — automatically. While you sleep.
            </p>

            {/* Fear Stat Block */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8 max-w-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-amber-800">
                  The average Indian clothing boutique loses 65% of first-time customers because nobody follows up.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="h-12 px-7 text-[15px] font-semibold bg-violet-600 hover:bg-violet-700 rounded-xl"
                >
                  Find my lost customers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-7 text-[15px] font-medium rounded-xl border-gray-300"
              >
                Watch 90 second demo
              </Button>
            </div>
          </div>

          {/* Right Column - WhatsApp Mockup */}
          <div 
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Phone Frame */}
            <div className="relative w-[320px] bg-gray-900 rounded-[40px] p-3 shadow-2xl">
              {/* Phone Screen */}
              <div className="bg-white rounded-[32px] overflow-hidden">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">OracleAgent</p>
                    <p className="text-green-400 text-xs">online</p>
                  </div>
                  <span className="text-white/70 text-xs">7:02 AM</span>
                </div>

                {/* WhatsApp Message */}
                <div className="bg-[#E5DDD5] p-4 min-h-[400px]">
                  {/* Date */}
                  <div className="flex justify-center mb-4">
                    <span className="bg-[#D1D7DB] text-gray-600 text-xs px-3 py-1 rounded-lg">
                      Today
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div className="bg-[#DCF8C6] rounded-lg rounded-tl-none p-3 max-w-[280px] ml-auto shadow-sm">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      <span className="font-semibold">Good morning Riya! ☀️</span>
                      <br /><br />
                      <span className="font-medium">Riya&apos;s Boutique — Daily Briefing</span>
                      <br /><br />
                      Yesterday: <span className="font-semibold">₹14,200 revenue (↑18%)</span>
                      <br />
                      Orders: 19 | Best seller: Floral Co-ord
                      <br /><br />
                      <span className="text-amber-700">⚠️ Alert: 43 customers haven&apos;t ordered in 30+ days</span>
                      <br /><br />
                      <span className="font-medium">✅ Done overnight:</span>
                      <br />
                      → Re-engagement messages sent to 43 customers
                      <br />
                      → Blue Kurti supplier email sent
                      <br />
                      → 7 Instagram posts ready for this week
                      <br />
                      → Competitor Bewakoof launched sale — counter strategy ready
                      <br /><br />
                      One tap needed from you 👇
                    </p>
                    <p className="text-[10px] text-gray-500 text-right mt-1">7:02 AM ✓✓</p>
                  </div>

                  {/* Quick Reply Buttons */}
                  <div className="mt-3 space-y-2">
                    <button className="w-full bg-white border border-violet-200 text-violet-700 text-sm font-medium py-2.5 rounded-lg hover:bg-violet-50 transition-colors">
                      Review counter strategy
                    </button>
                    <button className="w-full bg-white border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                      See weekly posts
                    </button>
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
