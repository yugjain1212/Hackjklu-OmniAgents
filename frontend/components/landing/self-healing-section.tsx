"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export function SelfHealingSection() {
  const [score, setScore] = useState(7.5);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setScore(Math.random() > 0.5 ? 9.2 : 8.7);
        setIsAnimating(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-violet-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              We guarantee the quality of every output.
            </h2>
            <div className="space-y-4 text-white/85 leading-relaxed">
              <p>
                Most AI tools give you an answer and hope it is correct.
              </p>
              <p>
                Our Critic agent scores every output out of 10 before you ever see it.
              </p>
              <p>
                If the score is below 7 — the system automatically rejects it, finds better data, and tries again.
              </p>
              <p>
                You only ever receive verified, quality-checked advice.
              </p>
              <p className="font-semibold text-white">
                No other tool does this.
              </p>
            </div>
          </div>

          {/* Right - Animated Score Widget */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <p className="text-sm font-semibold text-violet-600 mb-4">
                Quality Check
              </p>
              
              <div className="text-center mb-4">
                <span className={`text-5xl font-bold transition-all duration-500 ${
                  score >= 7 ? "text-emerald-500" : "text-amber-500"
                }`}>
                  {score.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-400"> / 10</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    score >= 7 ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>

              {/* Status Badge */}
              <div className="flex justify-center mb-4">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${
                  score >= 7
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}>
                  <Check className="w-4 h-4" />
                  {score >= 7 ? "APPROVED" : "IMPROVING..."}
                </span>
              </div>

              {/* Checked Items */}
              <p className="text-xs text-gray-500 text-center">
                Checked: Sources cited · Goal answered · Budget realistic · Indian market context
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
