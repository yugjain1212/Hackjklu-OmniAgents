"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

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
  },
];

function AutomationCard({ 
  automation, 
  onToggle 
}: { 
  automation: Automation; 
  onToggle: (id: string) => void;
}) {
  const Icon = automation.icon;
  const isActive = automation.status === "active";
  const successRate = Math.round((automation.stats.success / automation.stats.runs) * 100);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? "bg-blue-500/10" : "bg-muted"}`}>
                <Icon className={`w-6 h-6 ${isActive ? "text-blue-500" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{automation.name}</h3>
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
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {automation.schedule}
                  </span>
                  <span>•</span>
                  <span>Last run: {automation.lastRun}</span>
                </div>
              </div>
            </div>
            <Switch 
              checked={isActive}
              onCheckedChange={() => onToggle(automation.id)}
            />
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Runs</p>
              <p className="text-lg font-medium mt-1">{automation.stats.runs}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Success Rate</p>
              <p className="text-lg font-medium mt-1 text-green-500">{successRate}%</p>
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display tracking-tight">Automations</h1>
          <p className="text-muted-foreground mt-1">
            Set up recurring AI tasks that run automatically
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
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-display">0</p>
                <p className="text-xs text-muted-foreground">Alerts</p>
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
                <p className="text-2xl font-display">₹0</p>
                <p className="text-xs text-muted-foreground">Est. Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-sm">All times are in IST (Indian Standard Time)</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Automations run automatically based on your business profile. Connect WhatsApp, Gmail, and other integrations in Settings to enable full functionality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <AutomationCard 
            key={automation.id} 
            automation={automation} 
            onToggle={toggleAutomation}
          />
        ))}
      </div>
    </div>
  );
}
