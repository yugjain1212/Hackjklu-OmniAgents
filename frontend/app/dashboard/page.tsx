"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  RefreshCw,
  Instagram,
  AlertTriangle,
  Package,
  Search,
  Star,
  MessageCircle,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// Quick suggestion pills for boutique owners
const quickSuggestions = [
  {
    icon: "🔄",
    label: "Bring back lost customers",
    prompt: "Find all customers who bought from me but haven't ordered in 30 days. Write them a personal re-engagement message with a discount offer and send it.",
  },
  {
    icon: "📱",
    label: "Write this week's Instagram posts",
    prompt: "Write 7 Instagram captions for this week for my clothing boutique. Include hashtags and best posting times.",
  },
  {
    icon: "📊",
    label: "Why did my sales drop?",
    prompt: "My sales have been lower than usual. Analyse my recent sales data, check what competitors are doing, and tell me exactly why and how to fix it.",
  },
  {
    icon: "⚠️",
    label: "Check my stock levels",
    prompt: "Check my current inventory. Find what is running low. Draft reorder emails to suppliers for low stock items.",
  },
  {
    icon: "🕵️",
    label: "What is my competitor doing?",
    prompt: "Research what my top competitors in Indian fashion are doing right now — their ads, their sales, their Instagram strategy. Find gaps I can exploit.",
  },
  {
    icon: "⭐",
    label: "Reply to my reviews",
    prompt: "Check my recent Google reviews. Draft professional replies to all unanswered reviews. Flag any 1-2 star reviews urgently.",
  },
];

// Mock data for morning briefing
const morningBriefing = {
  revenue: "14,200",
  growth: "+18%",
  orders: 19,
  bestSeller: "Floral Co-ord",
  alerts: 43,
};

export default function DashboardPage() {
  const [goalInput, setGoalInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBriefing, setShowBriefing] = useState(true);

  const handleSuggestionClick = (prompt: string) => {
    setGoalInput(prompt);
  };

  const handleRunAgents = () => {
    if (!goalInput.trim()) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => setIsProcessing(false), 3000);
  };

  // Check if it's morning (6 AM - 10 AM)
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 6 && currentHour < 10;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Morning Briefing Card */}
      {isMorning && showBriefing && (
        <Card className="bg-gradient-to-r from-violet-600 to-violet-700 text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                  Today&apos;s Briefing
                </p>
                <h2 className="text-xl font-semibold mb-3">
                  Good morning, Riya&apos;s Boutique!
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/15 text-white border-0">
                    ₹{morningBriefing.revenue} yesterday
                  </Badge>
                  <Badge variant="secondary" className="bg-white/15 text-white border-0">
                    {morningBriefing.orders} orders
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-400/20 text-amber-100 border-0">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {morningBriefing.alerts} alerts
                  </Badge>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white text-violet-600 hover:bg-white/90 shrink-0"
              >
                View full briefing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goal Input Section */}
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            What do you need today?
          </p>
          <Textarea
            placeholder="Type your problem or goal in Hindi or English... e.g. 'Bring back customers who haven't ordered in 30 days'"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            className="min-h-[120px] text-base resize-none"
          />
        </div>

        {/* Quick Suggestions */}
        <div>
          <p className="text-xs text-gray-500 mb-3">Common tasks:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion.prompt)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all"
              >
                <span>{suggestion.icon}</span>
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>

        {/* Run Button */}
        <Button
          onClick={handleRunAgents}
          disabled={!goalInput.trim() || isProcessing}
          className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Your AI team is working...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Run agents
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* Active Agents Preview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { name: "Planner", status: "ready", icon: "📝" },
          { name: "Researcher", status: "ready", icon: "🔍" },
          { name: "Analyst", status: "ready", icon: "📊" },
          { name: "Marketing", status: "ready", icon: "📢" },
          { name: "Writer", status: "ready", icon: "✍️" },
          { name: "Critic", status: "ready", icon: "✓" },
        ].map((agent, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span className="text-lg">{agent.icon}</span>
            <div>
              <p className="text-sm font-medium text-gray-900">{agent.name}</p>
              <p className="text-xs text-green-600 capitalize">{agent.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report Panel Placeholder */}
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your AI team is standing by
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            Type what you need above — in Hindi or English — and your team of 6 agents will research, analyse, and deliver verified results here.
          </p>
          <p className="text-sm text-violet-600 font-medium">
            Try: &quot;Bring back my lost customers&quot;
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Yesterday</p>
                <p className="text-2xl font-bold text-gray-900">₹14,200</p>
                <p className="text-xs text-emerald-600">+18%</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-2xl font-bold text-gray-900">19</p>
                <p className="text-xs text-emerald-600">+5</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lost Customers</p>
                <p className="text-2xl font-bold text-gray-900">43</p>
                <p className="text-xs text-amber-600">Need attention</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Briefing</p>
                <p className="text-2xl font-bold text-gray-900">7:00 AM</p>
                <p className="text-xs text-gray-500">Tomorrow</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-violet-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
