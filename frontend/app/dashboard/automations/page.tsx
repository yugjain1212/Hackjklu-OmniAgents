"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  AlertCircle,
  Settings,
  ChevronRight,
  Bot,
  Brain,
  Calendar,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const automations = [
  {
    id: "order-management",
    name: "Order Management",
    description: "Automatically send order confirmations, shipping updates, and delivery notifications to customers via WhatsApp and Email.",
    schedule: "Real-time",
    runs: 156,
    successRate: 99,
    lastRun: "2 min ago",
    status: "active",
    icon: "📦",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    description: "Daily stock checks with automatic low-stock alerts and supplier reorder emails when inventory drops below threshold.",
    schedule: "Daily at 6:00 AM",
    runs: 45,
    successRate: 100,
    lastRun: "6 hours ago",
    status: "active",
    icon: "📊",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "customer-reengagement",
    name: "Customer Re-engagement",
    description: "Identify inactive customers and send personalized win-back campaigns with dynamic discount offers.",
    schedule: "Weekly on Sunday",
    runs: 12,
    successRate: 94,
    lastRun: "2 days ago",
    status: "active",
    icon: "👥",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "social-media-content",
    name: "Social Media Content",
    description: "Generate and schedule 7 Instagram posts per week with trending hashtags and engaging captions.",
    schedule: "Weekly on Monday",
    runs: 8,
    successRate: 100,
    lastRun: "5 days ago",
    status: "active",
    icon: "📱",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "review-management",
    name: "Review Management",
    description: "Monitor and respond to Google reviews automatically with AI-generated replies. Alert on negative reviews.",
    schedule: "Every 2 hours",
    runs: 89,
    successRate: 97,
    lastRun: "1 hour ago",
    status: "active",
    icon: "⭐",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "sales-analytics",
    name: "Sales Analytics & Reporting",
    description: "Generate comprehensive weekly reports with revenue trends, best sellers, and actionable insights.",
    schedule: "Weekly on Monday",
    runs: 4,
    successRate: 100,
    lastRun: "6 days ago",
    status: "active",
    icon: "📈",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "ad-intelligence",
    name: "Ad Campaign Intelligence",
    description: "Monitor competitor ads, optimize your campaigns, and get AI-powered suggestions for better ROAS.",
    schedule: "Daily at 9:00 AM",
    runs: 23,
    successRate: 91,
    lastRun: "3 hours ago",
    status: "paused",
    icon: "🎯",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Auto-respond to common customer queries on WhatsApp and Instagram. Escalate complex issues.",
    schedule: "Real-time",
    runs: 234,
    successRate: 98,
    lastRun: "5 min ago",
    status: "active",
    icon: "💬",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function AutomationsPage() {
  const [automationList, setAutomationList] = useState(automations);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const toggleAutomation = (id: string) => {
    setAutomationList(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === "active" ? "paused" : "active" }
        : auto
    ));
  };

  const handleCreateAutomation = async () => {
    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    setShowCreateDialog(false);
    setCustomPrompt("");
  };

  const activeCount = automationList.filter(a => a.status === "active").length;
  const totalRuns = automationList.reduce((sum, a) => sum + a.runs, 0);

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">Automations</h1>
              <p className="text-zinc-500 mt-1">
                {activeCount} active · {totalRuns.toLocaleString()} total runs
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="bg-zinc-900 hover:bg-zinc-800">
              <Wand2 className="w-4 h-4 mr-2" />
              Create Custom
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Active</p>
                    <p className="text-3xl font-semibold mt-1">{activeCount}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Play className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">Total Runs</p>
                    <p className="text-3xl font-semibold text-zinc-900 mt-1">{totalRuns.toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-violet-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">Success Rate</p>
                    <p className="text-3xl font-semibold text-zinc-900 mt-1">97.4%</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Automations Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {automationList.map((automation) => (
              <Card 
                key={automation.id} 
                className={`border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group ${
                  automation.status === "paused" ? "opacity-75" : ""
                }`}
                onClick={() => window.location.href = `/dashboard/automations/${automation.id}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${automation.gradient} flex items-center justify-center text-xl shadow-lg`}>
                        {automation.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-900">{automation.name}</h3>
                        <p className="text-xs text-zinc-500">{automation.schedule}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={automation.status === "active"}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                    {automation.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-xs text-zinc-500">{automation.runs} runs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs text-zinc-500">{automation.successRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs text-zinc-500">{automation.lastRun}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-violet-600" />
              Create Custom Automation
            </DialogTitle>
            <DialogDescription>
              Describe what you want to automate and our AI will create it for you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="e.g., Every Monday at 8 AM, analyze my top 5 products and send a summary to my WhatsApp..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[120px]"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Frequency</label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Select defaultValue="8">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i.toString().padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-violet-50">
              <Brain className="w-4 h-4 text-violet-600" />
              <span className="text-sm text-violet-700">
                6 AI agents will collaborate to create and run this automation
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateAutomation} 
              disabled={!customPrompt.trim() || isCreating}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {isCreating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Automation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
