"use client";

import { Users, Package, Instagram, Eye, Star, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Lost customers coming back",
    description: "Finds every customer who hasn't ordered in 30+ days. Sends them a personal message with the right offer. Tracks who came back.",
    metric: "Average 23% of lost customers return",
  },
  {
    icon: Package,
    title: "Never out of stock again",
    description: "Monitors inventory daily. When stock hits your threshold, supplier email is drafted and sent automatically.",
    metric: "Zero stockouts reported by users",
  },
  {
    icon: Instagram,
    title: "7 Instagram posts every week",
    description: "Every Monday, 7 captions are written for your new arrivals, trending styles, and best performing content formats.",
    metric: "3x more consistent posting",
  },
  {
    icon: Eye,
    title: "Competitor moves monitored daily",
    description: "Checks what your competitors posted, what sales they launched, what ads they are running — every single morning.",
    metric: "Know before your customers do",
  },
  {
    icon: Star,
    title: "Every review replied to",
    description: "Google reviews checked every 2 hours. Professional reply drafted instantly. 1-star reviews flagged to you urgently.",
    metric: "100% review response rate",
  },
  {
    icon: TrendingUp,
    title: "Weekly revenue report",
    description: "Every Monday: best seller, worst performer, growth vs last week, and top 3 actions to take this week. Saved to your phone.",
    metric: "Decisions based on data not gut",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Six problems. Solved overnight.
          </h2>
          <p className="text-lg text-gray-600">
            Every morning these are handled before you wake up
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {problem.description}
                </p>
                <p className="text-sm font-semibold text-violet-600">
                  {problem.metric}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
