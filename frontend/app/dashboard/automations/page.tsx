"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Users,
  Package,
  Instagram,
  Sun,
  Eye,
  Star,
  BarChart3,
  ShoppingBag,
  Play,
  Pause,
  Settings,
  ChevronRight,
  Loader2,
  Wand2,
  Sparkles,
  Bot,
  Brain,
} from "lucide-react";

// Boutique-focused automation cards
const boutiqueAutomations = [
  {
    id: "lost-customers",
    title: "Lost Customer Recovery",
    description: "Every Sunday, finds customers who haven't ordered in 30+ days and sends them a personal re-engagement message.",
    icon: Users,
    schedule: "Every Sunday 8 AM",
    lastResult: "47 messages sent · 11 customers returned",
    defaultOn: true,
    color: "bg-pink-500",
  },
  {
    id: "stock-watch",
    title: "Stock Watch",
    description: "Every morning checks inventory. When any item hits 10 pieces, automatically emails your supplier.",
    icon: Package,
    schedule: "Daily 6 AM",
    lastResult: "Blue Kurti — supplier emailed",
    defaultOn: true,
    color: "bg-purple-500",
  },
  {
    id: "instagram-content",
    title: "Weekly Instagram Content",
    description: "Every Monday creates 7 Instagram captions for your new arrivals and trending styles. Ready for you to post.",
    icon: Instagram,
    schedule: "Every Monday 8 AM",
    lastResult: "7 posts created · saved to Notion",
    defaultOn: true,
    color: "bg-indigo-500",
  },
  {
    id: "morning-briefing",
    title: "Morning Business Briefing",
    description: "Every day at 7 AM sends your revenue, alerts, and one recommended action directly to your WhatsApp.",
    icon: Sun,
    schedule: "Daily 7 AM",
    lastResult: "Sent to +91 98765 43210",
    defaultOn: true,
    color: "bg-amber-500",
  },
  {
    id: "competitor-watch",
    title: "Competitor Watch",
    description: "Checks daily what your competitors posted, what sales they launched, and what ads they are running.",
    icon: Eye,
    schedule: "Daily 9 AM",
    lastResult: "Bewakoof launched 40% sale — counter strategy drafted",
    defaultOn: true,
    color: "bg-cyan-500",
  },
  {
    id: "review-management",
    title: "Review Management",
    description: "Checks Google reviews every 2 hours. Drafts replies instantly. Sends urgent alert for 1-star reviews.",
    icon: Star,
    schedule: "Every 2 hours",
    lastResult: "2 reviews replied · 0 urgent",
    defaultOn: true,
    color: "bg-teal-500",
  },
  {
    id: "weekly-report",
    title: "Weekly Revenue Report",
    description: "Every Monday delivers your full week analysis — best seller, growth rate, and top 3 actions for this week.",
    icon: BarChart3,
    schedule: "Every Monday 7 AM",
    lastResult: "Report saved · emailed to you",
    defaultOn: false,
    color: "bg-emerald-500",
    note: "Connect Google Sheets to enable",
  },
  {
    id: "reorder-reminders",
    title: "Customer Re-order Reminders",
    description: "Tracks customers who regularly buy. Sends them a heads-up when their favourite item gets restocked.",
    icon: ShoppingBag,
    schedule: "When new stock added",
    lastResult: "Coming soon",
    defaultOn: false,
    color: "bg-blue-500",
    comingSoon: true,
  },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(
    boutiqueAutomations.map(a => ({ ...a, enabled: a.defaultOn }))
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, enabled: !auto.enabled }
        : auto
    ));
  };

  const activeCount = automations.filter(a => a.enabled && !a.comingSoon).length;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Your Overnight AI Team</h1>
          <p className="text-muted-foreground mt-1">
            These run automatically while you sleep. Wake up to a business that runs itself.
          </p>
        </div>
        <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700">
          <Wand2 className="h-5 w-5" />
          Create Custom
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Play className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold">48h</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Sun className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customers Back</p>
                <p className="text-2xl font-bold">68</p>
              </div>
              <div className="p-2 bg-pink-50 rounded-lg">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts Created</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Instagram className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automations Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {automations.map((automation) => {
          const Icon = automation.icon;
          return (
            <Card key={automation.id} className={`hover:shadow-md transition-shadow ${automation.comingSoon ? 'opacity-75' : ''}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${automation.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{automation.title}</h3>
                        {automation.comingSoon && (
                          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                            Coming soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{automation.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>📅 {automation.schedule}</span>
                      </div>
                      <div className="mt-2 text-xs">
                        <span className="text-emerald-600 font-medium">✓ {automation.lastResult}</span>
                      </div>
                      {automation.note && (
                        <p className="text-xs text-amber-600 mt-2">{automation.note}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!automation.comingSoon && (
                      <Switch 
                        checked={automation.enabled}
                        onCheckedChange={() => toggleAutomation(automation.id)}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
