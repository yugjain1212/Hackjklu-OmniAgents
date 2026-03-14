"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Bot,
  Search,
  BarChart3,
  Zap,
  PenTool,
  Shield,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Eye,
} from "lucide-react";

// Agent definitions
const agents = [
  { id: "planner", name: "Planner", icon: Bot, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { id: "researcher", name: "Researcher", icon: Search, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { id: "analyst", name: "Analyst", icon: BarChart3, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { id: "marketing", name: "Marketing", icon: Zap, color: "from-orange-500 to-red-500", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  { id: "writer", name: "Writer", icon: PenTool, color: "from-pink-500 to-rose-500", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
  { id: "critic", name: "Critic", icon: Shield, color: "from-amber-500 to-yellow-500", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
];

// Automation definitions with workflows
const automationDetails: Record<string, {
  name: string;
  description: string;
  icon: string;
  gradient: string;
  schedule: string;
  runs: number;
  successRate: number;
  status: string;
  workflow: { step: number; agent: string; action: string; output: string }[];
}> = {
  "order-management": {
    name: "Order Management",
    description: "Automatically send order confirmations, shipping updates, and delivery notifications to customers via WhatsApp and Email.",
    icon: "📦",
    gradient: "from-blue-500 to-cyan-500",
    schedule: "Real-time",
    runs: 156,
    successRate: 99,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Receives new order event from Shopify", output: "Creates task list for order processing" },
      { step: 2, agent: "researcher", action: "Fetches customer data and order details", output: "Customer profile + Order items retrieved" },
      { step: 3, agent: "writer", action: "Generates personalized confirmation message", output: "WhatsApp + Email templates ready" },
      { step: 4, agent: "critic", action: "Reviews message quality and compliance", output: "Approved for sending (Score: 9.4/10)" },
      { step: 5, agent: "marketing", action: "Adds upsell recommendations", output: "Related products appended to message" },
      { step: 6, agent: "writer", action: "Finalizes and sends via WhatsApp/Email", output: "Message delivered to customer" },
    ],
  },
  "inventory-management": {
    name: "Inventory Management",
    description: "Daily stock checks with automatic low-stock alerts and supplier reorder emails when inventory drops below threshold.",
    icon: "📊",
    gradient: "from-purple-500 to-pink-500",
    schedule: "Daily at 6:00 AM",
    runs: 45,
    successRate: 100,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Triggers daily inventory check", output: "Scan all products task created" },
      { step: 2, agent: "researcher", action: "Queries Shopify inventory API", output: "Current stock levels retrieved" },
      { step: 3, agent: "analyst", action: "Compares stock vs reorder thresholds", output: "15 items flagged as low stock" },
      { step: 4, agent: "analyst", action: "Calculates optimal reorder quantities", output: "Reorder amounts determined" },
      { step: 5, agent: "writer", action: "Drafts supplier reorder emails", output: "3 supplier emails prepared" },
      { step: 6, agent: "critic", action: "Validates order quantities and suppliers", output: "All orders verified (Score: 9.8/10)" },
      { step: 7, agent: "marketing", action: "Creates low-stock alert for marketing", output: "Flash sale opportunity identified" },
      { step: 8, agent: "writer", action: "Sends emails and internal alerts", output: "Suppliers notified, team alerted" },
    ],
  },
  "customer-reengagement": {
    name: "Customer Re-engagement",
    description: "Identify inactive customers and send personalized win-back campaigns with dynamic discount offers.",
    icon: "👥",
    gradient: "from-orange-500 to-red-500",
    schedule: "Weekly on Sunday",
    runs: 12,
    successRate: 94,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Starts weekly re-engagement scan", output: "Find inactive customers task" },
      { step: 2, agent: "researcher", action: "Analyzes customer purchase history", output: "412 inactive customers identified" },
      { step: 3, agent: "analyst", action: "Segments customers by value & behavior", output: "3 segments: VIP, Regular, Occasional" },
      { step: 4, agent: "marketing", action: "Creates personalized offers per segment", output: "Discount tiers: 20%, 15%, 10%" },
      { step: 5, agent: "writer", action: "Writes personalized win-back messages", output: "412 unique messages generated" },
      { step: 6, agent: "critic", action: "Reviews message tone and offers", output: "All messages approved (Score: 9.2/10)" },
      { step: 7, agent: "writer", action: "Schedules WhatsApp/Email campaigns", output: "Campaign queued for optimal send times" },
    ],
  },
  "social-media-content": {
    name: "Social Media Content",
    description: "Generate and schedule 7 Instagram posts per week with trending hashtags and engaging captions.",
    icon: "📱",
    gradient: "from-pink-500 to-rose-500",
    schedule: "Weekly on Monday",
    runs: 8,
    successRate: 100,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Plans weekly content calendar", output: "7 post slots assigned" },
      { step: 2, agent: "researcher", action: "Finds trending hashtags and topics", output: "Top 20 trending hashtags identified" },
      { step: 3, agent: "researcher", action: "Scrapes product images from store", output: "15 product images collected" },
      { step: 4, agent: "marketing", action: "Develops content themes for week", output: "Themes: New Arrivals, Style Tips, Customer Stories" },
      { step: 5, agent: "writer", action: "Writes captions for all 7 posts", output: "Engaging captions with CTAs ready" },
      { step: 6, agent: "analyst", action: "Analyzes best posting times", output: "Optimal schedule: 7 PM daily" },
      { step: 7, agent: "critic", action: "Reviews content quality and brand voice", output: "All posts approved (Score: 9.6/10)" },
      { step: 8, agent: "marketing", action: "Schedules posts on Instagram", output: "7 posts scheduled for the week" },
    ],
  },
  "review-management": {
    name: "Review Management",
    description: "Monitor and respond to Google reviews automatically with AI-generated replies. Alert on negative reviews.",
    icon: "⭐",
    gradient: "from-amber-500 to-orange-500",
    schedule: "Every 2 hours",
    runs: 89,
    successRate: 97,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Triggers review check", output: "Scan Google My Business task" },
      { step: 2, agent: "researcher", action: "Fetches new reviews from Google", output: "3 new reviews found" },
      { step: 3, agent: "analyst", action: "Analyzes sentiment of each review", output: "2 positive, 1 negative detected" },
      { step: 4, agent: "writer", action: "Drafts personalized responses", output: "3 tailored replies generated" },
      { step: 5, agent: "critic", action: "Reviews response appropriateness", output: "Responses approved (Score: 9.3/10)" },
      { step: 6, agent: "marketing", action: "Flags negative review for manager", output: "Urgent alert sent to team" },
      { step: 7, agent: "writer", action: "Posts responses to Google", output: "Replies published" },
    ],
  },
  "sales-analytics": {
    name: "Sales Analytics & Reporting",
    description: "Generate comprehensive weekly reports with revenue trends, best sellers, and actionable insights.",
    icon: "📈",
    gradient: "from-emerald-500 to-teal-500",
    schedule: "Weekly on Monday",
    runs: 4,
    successRate: 100,
    status: "active",
    workflow: [
      { step: 1, agent: "planner", action: "Starts weekly report generation", output: "Report structure defined" },
      { step: 2, agent: "researcher", action: "Collects sales data from Shopify", output: "7 days of transaction data" },
      { step: 3, agent: "researcher", action: "Gathers marketing campaign data", output: "Campaign performance metrics" },
      { step: 4, agent: "analyst", action: "Calculates KPIs and trends", output: "Revenue, AOV, conversion rates" },
      { step: 5, agent: "analyst", action: "Identifies top products & categories", output: "Best sellers ranked" },
      { step: 6, agent: "marketing", action: "Analyzes campaign effectiveness", output: "ROI by channel calculated" },
      { step: 7, agent: "writer", action: "Compiles executive summary", output: "Formatted report with charts" },
      { step: 8, agent: "critic", action: "Validates data accuracy", output: "Report verified (Score: 9.9/10)" },
      { step: 9, agent: "writer", action: "Emails report to stakeholders", output: "Report delivered" },
    ],
  },
};

export default function AutomationDetailPage() {
  const params = useParams();
  const automationId = params.id as string;
  const [mounted, setMounted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const automation = automationDetails[automationId];

  if (!automation) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-zinc-900">Automation not found</h2>
          <Link href="/dashboard/automations">
            <Button className="mt-4">Back to Automations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= automation.workflow.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setActiveStep(0);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-full bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link href="/dashboard/automations">
              <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-zinc-500 hover:text-zinc-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Automations
              </Button>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${automation.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                  {automation.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-zinc-900">{automation.name}</h1>
                    <Badge className={`${automation.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {automation.status === "active" ? (
                        <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />Active</>
                      ) : (
                        "Paused"
                      )}
                    </Badge>
                  </div>
                  <p className="text-zinc-500 mt-1 max-w-2xl">{automation.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25"
                >
                  {isRunning ? (
                    <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Running...</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" />Run Simulation</>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Configure
                </Button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-500">Schedule:</span>
                <span className="text-sm font-medium text-zinc-900">{automation.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-500">Total Runs:</span>
                <span className="text-sm font-medium text-zinc-900">{automation.runs}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-zinc-500">Success Rate:</span>
                <span className="text-sm font-medium text-emerald-600">{automation.successRate}%</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-zinc-500">Enable Automation</span>
                <Switch checked={automation.status === "active"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="workflow" className="space-y-6">
            <TabsList className="bg-white border border-zinc-200 p-1">
              <TabsTrigger value="workflow" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Agent Workflow
              </TabsTrigger>
              <TabsTrigger value="runs" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
                <Clock className="w-4 h-4 mr-2" />
                Recent Runs
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workflow" className="space-y-6">
              <div className={`transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <Card className="border-0 shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-xl font-semibold text-zinc-900">How Agents Work Together</h2>
                        <p className="text-zinc-500 mt-1">Step-by-step workflow of how our AI agents collaborate to execute this automation</p>
                      </div>
                      {isRunning && (
                        <Badge className="bg-violet-100 text-violet-700 animate-pulse">
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          Simulating...
                        </Badge>
                      )}
                    </div>

                    {/* Workflow Steps */}
                    <div className="relative">
                      {/* Connection Line */}
                      <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-zinc-200" />
                      
                      <div className="space-y-6">
                        {automation.workflow.map((step, index) => {
                          const agent = agents.find(a => a.id === step.agent);
                          if (!agent) return null;
                          const Icon = agent.icon;
                          const isActive = isRunning && index === activeStep;
                          const isCompleted = isRunning && index < activeStep;
                          const isPending = isRunning && index > activeStep;

                          return (
                            <div
                              key={index}
                              className={`relative flex gap-6 transition-all duration-500 ${
                                isActive ? "scale-[1.02]" : ""
                              }`}
                            >
                              {/* Step Number / Icon */}
                              <div className="relative z-10 flex-shrink-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                  isActive
                                    ? `bg-gradient-to-br ${agent.color} shadow-lg shadow-violet-500/25 animate-pulse`
                                    : isCompleted
                                      ? "bg-emerald-500 shadow-lg"
                                      : isPending
                                        ? "bg-zinc-200"
                                        : `bg-gradient-to-br ${agent.color}`
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                  ) : (
                                    <Icon className={`w-6 h-6 ${isPending ? "text-zinc-400" : "text-white"}`} />
                                  )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-zinc-700 border-2 border-zinc-200">
                                  {index + 1}
                                </div>
                              </div>

                              {/* Content */}
                              <div className={`flex-1 p-5 rounded-xl border-2 transition-all duration-500 ${
                                isActive
                                  ? `${agent.bgColor} ${agent.borderColor} shadow-lg`
                                  : isCompleted
                                    ? "bg-emerald-50 border-emerald-200"
                                    : isPending
                                      ? "bg-zinc-50 border-zinc-200 opacity-60"
                                      : "bg-white border-zinc-200 hover:border-zinc-300"
                              }`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className={`text-sm font-semibold ${
                                        isActive ? "text-violet-700" : isCompleted ? "text-emerald-700" : "text-zinc-900"
                                      }`}>
                                        {agent.name}
                                      </span>
                                      {isActive && (
                                        <Badge className="bg-violet-100 text-violet-700 text-xs animate-pulse">
                                          Working...
                                        </Badge>
                                      )}
                                      {isCompleted && (
                                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                          Completed
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-zinc-700 font-medium">{step.action}</p>
                                    <div className={`mt-3 p-3 rounded-lg text-sm ${
                                      isActive
                                        ? "bg-white/80 text-violet-800"
                                        : isCompleted
                                          ? "bg-white/80 text-emerald-800"
                                          : "bg-zinc-50 text-zinc-600"
                                    }`}>
                                      <span className="font-medium">Output:</span> {step.output}
                                    </div>
                                  </div>
                                  <ArrowRight className={`w-5 h-5 ml-4 transition-all duration-300 ${
                                    isActive ? "text-violet-500 translate-x-1" : "text-zinc-300"
                                  }`} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Final Output */}
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-emerald-900">Automation Complete</h3>
                          <p className="text-emerald-700 text-sm">All agents have successfully completed their tasks</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agent Legend */}
              <div className={`transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h3 className="text-sm font-medium text-zinc-500 mb-4">Agents Involved</h3>
                <div className="flex flex-wrap gap-3">
                  {Array.from(new Set(automation.workflow.map(s => s.agent))).map((agentId) => {
                    const agent = agents.find(a => a.id === agentId);
                    if (!agent) return null;
                    const Icon = agent.icon;
                    const count = automation.workflow.filter(s => s.agent === agentId).length;
                    
                    return (
                      <div
                        key={agentId}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-sm"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-zinc-900">{agent.name}</span>
                        <Badge variant="secondary" className="text-xs">{count} tasks</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="runs">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recent Runs</h3>
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-zinc-900">Run #{automation.runs - i}</p>
                            <p className="text-sm text-zinc-500">{i === 0 ? "Just now" : i === 1 ? "2 hours ago" : `${i * 4} hours ago`}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-zinc-500">{automation.workflow.length} agents</span>
                          <span className="text-sm font-medium text-emerald-600">Success</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-4">Automation Settings</h3>
                  <p className="text-zinc-500">Configure settings for this automation here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
