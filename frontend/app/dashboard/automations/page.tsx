"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Calendar,
  Sun,
  MessageSquare,
  Package,
  FileText,
  TrendingUp,
  Play,
  Pause,
  Settings,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Bell,
  Brain,
  Search,
  BarChart3,
  Megaphone,
  PenTool,
  Shield,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Eye,
  Activity,
  Mail,
  Instagram,
  Database,
} from "lucide-react";

// Agent types
interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  tasks: string[];
}

const agents: Agent[] = [
  {
    id: "planner",
    name: "Planner",
    role: "Business Project Manager",
    icon: Brain,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    tasks: [
      "Analyzes your business goal and profile",
      "Breaks down complex tasks into subtasks",
      "Assigns work to specialized agents",
      "Creates execution timeline",
    ],
  },
  {
    id: "researcher",
    name: "Researcher",
    role: "Business Intelligence",
    icon: Search,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    tasks: [
      "Searches web for competitor data",
      "Finds market trends and pricing",
      "Reads customer reviews",
      "Gathers industry reports",
    ],
  },
  {
    id: "analyst",
    name: "Analyst",
    role: "Business Data Scientist",
    icon: BarChart3,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    tasks: [
      "Analyzes sales and revenue data",
      "Identifies profit margins by product",
      "Finds bottlenecks in business",
      "Calculates growth projections",
    ],
  },
  {
    id: "marketing",
    name: "Marketing Analyst",
    role: "Competitive Intelligence",
    icon: Megaphone,
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-500/10",
    tasks: [
      "Analyzes competitor marketing strategies",
      "Finds ad campaigns and messaging",
      "Identifies positioning gaps",
      "Recommends best channels & budget",
    ],
  },
  {
    id: "writer",
    name: "Writer",
    role: "Content Creator",
    icon: PenTool,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    tasks: [
      "Creates Instagram captions & hashtags",
      "Drafts WhatsApp broadcast messages",
      "Writes email newsletters",
      "Generates review replies",
    ],
  },
  {
    id: "critic",
    name: "Critic",
    role: "Quality Controller",
    icon: Shield,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    tasks: [
      "Scores output quality (1-10)",
      "Checks for accurate data & sources",
      "Verifies Indian market context",
      "Approves or requests retry",
    ],
  },
];

// Automation types
interface Automation {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  schedule: string;
  status: "active" | "paused" | "error";
  lastRun: string;
  nextRun: string;
  stats: {
    runs: number;
    success: number;
  };
  involvedAgents: string[];
  outputs: string[];
}

const defaultAutomations: Automation[] = [
  {
    id: "morning-briefing",
    name: "Morning Briefing",
    description: "Daily WhatsApp summary with yesterday's revenue, reviews, and today's action",
    icon: Sun,
    schedule: "Daily at 7:00 AM IST",
    status: "active",
    lastRun: "Today, 7:00 AM",
    nextRun: "Tomorrow, 7:00 AM",
    stats: { runs: 28, success: 28 },
    involvedAgents: ["planner", "analyst", "writer"],
    outputs: ["WhatsApp message", "Revenue summary", "Action items"],
  },
  {
    id: "competitor-monitor",
    name: "Competitor Monitor",
    description: "Track competitor prices, new products, and marketing changes daily",
    icon: TrendingUp,
    schedule: "Daily at 8:00 AM IST",
    status: "active",
    lastRun: "Today, 8:00 AM",
    nextRun: "Tomorrow, 8:00 AM",
    stats: { runs: 28, success: 27 },
    involvedAgents: ["planner", "researcher", "marketing", "critic"],
    outputs: ["Competitor price list", "New product alerts", "Marketing changes"],
  },
  {
    id: "content-calendar",
    name: "Weekly Content Calendar",
    description: "Generate 7 Instagram posts and 3 WhatsApp broadcasts every Monday",
    icon: Calendar,
    schedule: "Weekly on Monday, 9:00 AM IST",
    status: "active",
    lastRun: "Mon, 9:00 AM",
    nextRun: "Next Mon, 9:00 AM",
    stats: { runs: 4, success: 4 },
    involvedAgents: ["planner", "marketing", "writer", "critic"],
    outputs: ["7 Instagram captions", "3 WhatsApp messages", "Hashtag sets"],
  },
  {
    id: "review-manager",
    name: "Review Auto-Reply",
    description: "Automatically reply to new Google reviews with personalized responses",
    icon: MessageSquare,
    schedule: "Every 2 hours",
    status: "paused",
    lastRun: "Yesterday, 6:00 PM",
    nextRun: "When enabled",
    stats: { runs: 156, success: 156 },
    involvedAgents: ["planner", "writer", "critic"],
    outputs: ["Review replies", "Sentiment analysis"],
  },
  {
    id: "inventory-alerts",
    name: "Inventory Alerts",
    description: "Get notified when products are running low on stock",
    icon: Package,
    schedule: "Daily at 10:00 AM IST",
    status: "active",
    lastRun: "Today, 10:00 AM",
    nextRun: "Tomorrow, 10:00 AM",
    stats: { runs: 28, success: 28 },
    involvedAgents: ["planner", "analyst"],
    outputs: ["Low stock alerts", "Reorder recommendations"],
  },
  {
    id: "weekly-report",
    name: "Weekly Business Report",
    description: "Comprehensive report with sales analysis, trends, and recommendations",
    icon: FileText,
    schedule: "Weekly on Sunday, 8:00 PM IST",
    status: "active",
    lastRun: "Last Sun, 8:00 PM",
    nextRun: "This Sun, 8:00 PM",
    stats: { runs: 4, success: 4 },
    involvedAgents: ["planner", "researcher", "analyst", "marketing", "writer", "critic"],
    outputs: ["Full PDF report", "Notion page", "Email summary"],
  },
];

// Agent Node Component
function AgentNode({ 
  agent, 
  isActive,
  onClick 
}: { 
  agent: Agent; 
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = agent.icon;
  
  return (
    <button
      onClick={onClick}
      className={`relative group flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
        isActive 
          ? `${agent.bgColor} ${agent.color.replace('text-', 'border-')} scale-105 shadow-lg` 
          : "border-foreground/10 bg-muted/30 hover:border-foreground/20"
      }`}
    >
      <div className={`w-12 h-12 rounded-xl ${agent.bgColor} flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
        <Icon className={`w-6 h-6 ${agent.color}`} />
      </div>
      <span className={`text-xs font-medium ${isActive ? agent.color : "text-muted-foreground"}`}>
        {agent.name}
      </span>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

// Agent Detail Panel
function AgentDetailPanel({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const Icon = agent.icon;
  
  return (
    <Card className="border-2 animate-in slide-in-from-right duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl ${agent.bgColor} flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${agent.color}`} />
            </div>
            <div>
              <h3 className={`font-semibold text-lg ${agent.color}`}>{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            What this agent does:
          </h4>
          <ul className="space-y-2">
            {agent.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 ${agent.color.replace('text-', 'bg-')}`} />
                {task}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Automation Card with Agent Workflow
function AutomationCard({ 
  automation, 
  onToggle,
  selectedAgent,
  onSelectAgent,
}: { 
  automation: Automation; 
  onToggle: (id: string) => void;
  selectedAgent: string | null;
  onSelectAgent: (id: string | null) => void;
}) {
  const Icon = automation.icon;
  const isActive = automation.status === "active";
  const successRate = Math.round((automation.stats.success / automation.stats.runs) * 100);
  const isExpanded = selectedAgent && automation.involvedAgents.includes(selectedAgent);

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isActive ? 'ring-1 ring-blue-500/20' : ''}`}>
      <CardContent className="p-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isActive ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-muted"}`}>
                <Icon className={`w-7 h-7 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{automation.name}</h3>
                  <Badge 
                    variant={isActive ? "default" : "secondary"}
                    className="text-[10px]"
                  >
                    {isActive ? (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 mr-1" />
                        Paused
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{automation.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {automation.schedule}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">Last run: {automation.lastRun}</span>
                </div>
              </div>
            </div>
            <Switch 
              checked={isActive}
              onCheckedChange={() => onToggle(automation.id)}
            />
          </div>

          {/* Agent Workflow Visualization */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Agent Workflow
              </h4>
              <span className="text-xs text-muted-foreground">
                Click an agent to see what it does
              </span>
            </div>
            
            {/* Agent Pipeline */}
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-rose-500/20 -translate-y-1/2 hidden md:block" />
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 relative">
                {agents.map((agent) => {
                  const isInvolved = automation.involvedAgents.includes(agent.id);
                  return (
                    <AgentNode
                      key={agent.id}
                      agent={agent}
                      isActive={isInvolved}
                      onClick={() => onSelectAgent(isInvolved ? agent.id : null)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Selected Agent Detail */}
            {selectedAgent && automation.involvedAgents.includes(selectedAgent) && (
              <div className="mt-4">
                <AgentDetailPanel 
                  agent={agents.find(a => a.id === selectedAgent)!} 
                  onClose={() => onSelectAgent(null)}
                />
              </div>
            )}
          </div>

          {/* Outputs */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              What You Get
            </h4>
            <div className="flex flex-wrap gap-2">
              {automation.outputs.map((output, i) => (
                <Badge key={i} variant="secondary" className="text-xs px-3 py-1.5">
                  {output.includes("WhatsApp") && <MessageSquare className="w-3 h-3 mr-1" />}
                  {output.includes("Instagram") && <Instagram className="w-3 h-3 mr-1" />}
                  {output.includes("Email") && <Mail className="w-3 h-3 mr-1" />}
                  {output.includes("Notion") && <Database className="w-3 h-3 mr-1" />}
                  {output.includes("PDF") && <FileText className="w-3 h-3 mr-1" />}
                  {!output.includes("WhatsApp") && !output.includes("Instagram") && !output.includes("Email") && !output.includes("Notion") && !output.includes("PDF") && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {output}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Runs</p>
              <p className="text-xl font-semibold mt-1">{automation.stats.runs}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Success Rate</p>
              <p className="text-xl font-semibold mt-1 text-green-500">{successRate}%</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next Run</p>
              <p className="text-sm font-medium mt-1">{automation.nextRun}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(defaultAutomations);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === "active" ? "paused" : "active" }
        : auto
    ));
  };

  const activeCount = automations.filter(a => a.status === "active").length;
  const totalRuns = automations.reduce((sum, a) => sum + a.stats.runs, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display tracking-tight">Automations</h1>
          <p className="text-muted-foreground mt-1">
            AI agents working 24/7 for your business
          </p>
        </div>
        <Button variant="outline" className="rounded-full">
          <Settings className="w-4 h-4 mr-2" />
          Configure All
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Play className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-display">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-display">{totalRuns}</p>
                <p className="text-xs text-muted-foreground">Total Runs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-display">6</p>
                <p className="text-xs text-muted-foreground">AI Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-display">₹45K</p>
                <p className="text-xs text-muted-foreground">Est. Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card className="bg-gradient-to-r from-violet-500/5 via-fuchsia-500/5 to-rose-500/5 border-foreground/10">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="text-muted-foreground">Agent Pipeline:</span>
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${agent.color.replace('text-', 'bg-')}`} />
                <span className="text-muted-foreground">{agent.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automations List */}
      <div className="space-y-6">
        {automations.map((automation) => (
          <AutomationCard 
            key={automation.id} 
            automation={automation} 
            onToggle={toggleAutomation}
            selectedAgent={selectedAgent}
            onSelectAgent={setSelectedAgent}
          />
        ))}
      </div>
    </div>
  );
}
