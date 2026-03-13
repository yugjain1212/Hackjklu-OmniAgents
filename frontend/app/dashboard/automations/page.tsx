"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingBag,
  Package,
  Users,
  Megaphone,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Zap,
  Play,
  Pause,
  Settings,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Instagram,
  Mail,
  Sparkles,
  Wand2,
  Bot,
  Brain,
  Lightbulb,
  Target,
  MessageCircle,
  Calendar,
  Repeat,
  MoreHorizontal,
  ChevronRight,
  Loader2,
} from "lucide-react";

// 8 Pre-built Automation templates from api.md
const automationTemplates = [
  {
    id: "order-management",
    name: "Order Management",
    description: "Auto-send order confirmations, shipping updates & review requests",
    icon: ShoppingBag,
    category: "Orders",
    color: "bg-blue-500",
    prompt: "When a new order comes in, send confirmation email and WhatsApp message. When order ships, send tracking update. After delivery, request a review.",
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    description: "Daily stock checks with low stock alerts & auto-reorder emails",
    icon: Package,
    category: "Inventory",
    color: "bg-purple-500",
    prompt: "Check inventory daily at 6 AM. If stock is below 10, send WhatsApp alert to owner. If below 3, send reorder email to supplier.",
  },
  {
    id: "customer-reengagement",
    name: "Customer Re-engagement",
    description: "Win back inactive customers with personalized discount offers",
    icon: Users,
    category: "Marketing",
    color: "bg-pink-500",
    prompt: "Every Sunday, find customers inactive for 30+ days. Send personalized comeback offers: 15% off for 30-60 days, 20% for 60-90 days, 25% for 90+ days.",
  },
  {
    id: "social-media-content",
    name: "Social Media Content",
    description: "Generate & schedule 7 posts per week with trending hashtags",
    icon: Instagram,
    category: "Social Media",
    color: "bg-indigo-500",
    prompt: "Every Monday at 8 AM, generate 7 Instagram posts for the week. Include hooks, captions, CTAs, and trending hashtags. Research competitor posts for inspiration.",
  },
  {
    id: "review-management",
    name: "Review Management",
    description: "Auto-respond to Google reviews with AI-generated replies",
    icon: MessageSquare,
    category: "Reputation",
    color: "bg-cyan-500",
    prompt: "Check Google reviews every 2 hours. For 5-star reviews, send thank you. For 3-4 stars, send empathetic response. Alert owner for 1-2 star reviews.",
  },
  {
    id: "sales-analytics",
    name: "Sales Analytics & Reporting",
    description: "Weekly business reports with insights, best sellers & trends",
    icon: BarChart3,
    category: "Analytics",
    color: "bg-emerald-500",
    prompt: "Every Monday at 7 AM, generate weekly sales report. Include revenue, orders, best sellers, slow movers. Send summary on WhatsApp and full report via email.",
  },
  {
    id: "ad-intelligence",
    name: "Ad Campaign Intelligence",
    description: "Monitor competitor ads & optimize your campaigns",
    icon: TrendingUp,
    category: "Advertising",
    color: "bg-orange-500",
    prompt: "Daily at 9 AM, check competitor ads and your ad performance. If CTR is below 1% or ROAS below 2, suggest improvements and create new ad copy ideas.",
  },
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Auto-answer common questions via Instagram DMs & WhatsApp",
    icon: MessageCircle,
    category: "Support",
    color: "bg-teal-500",
    prompt: "Every 30 minutes, check Instagram DMs and WhatsApp. Auto-respond to FAQs like size chart, delivery time, return policy. Forward complex issues to human.",
  },
];

// Example prompts for custom automation
const examplePrompts = [
  "Send a welcome message to new customers with a 10% discount code",
  "Alert me when a product gets 5 new reviews in a day",
  "Create a weekly competitor price comparison report",
  "Automatically thank customers who share our posts on Instagram",
  "Send birthday discounts to customers 1 week before their birthday",
  "Notify me when inventory value drops below ₹50,000",
];

// Active automations (user's created automations)
interface UserAutomation {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused";
  lastRun: string;
  nextRun: string;
  runs: number;
  success: number;
  createdAt: string;
}

const mockUserAutomations: UserAutomation[] = [
  {
    id: "auto-1",
    name: "Order Confirmation Flow",
    description: "Send email + WhatsApp on new orders",
    status: "active",
    lastRun: "2 min ago",
    nextRun: "On next order",
    runs: 156,
    success: 156,
    createdAt: "2026-03-01",
  },
  {
    id: "auto-2",
    name: "Weekly Sales Report",
    description: "Monday morning analytics summary",
    status: "active",
    lastRun: "Mon, 7:00 AM",
    nextRun: "Next Mon, 7:00 AM",
    runs: 4,
    success: 4,
    createdAt: "2026-03-05",
  },
];

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState("my-automations");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [userAutomations, setUserAutomations] = useState(mockUserAutomations);

  const handleCreateFromTemplate = (templateId: string) => {
    const template = automationTemplates.find(t => t.id === templateId);
    if (template) {
      setCustomPrompt(template.prompt);
      setSelectedTemplate(templateId);
      setShowCreateDialog(true);
    }
  };

  const handleCreateCustom = () => {
    setSelectedTemplate(null);
    setCustomPrompt("");
    setShowCreateDialog(true);
  };

  const handleSubmitAutomation = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAutomation: UserAutomation = {
      id: `auto-${Date.now()}`,
      name: selectedTemplate 
        ? automationTemplates.find(t => t.id === selectedTemplate)?.name + " (Custom)"
        : "Custom Automation",
      description: customPrompt.slice(0, 100) + "...",
      status: "active",
      lastRun: "Never",
      nextRun: "Pending",
      runs: 0,
      success: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    setUserAutomations([newAutomation, ...userAutomations]);
    setIsCreating(false);
    setShowCreateDialog(false);
    setCustomPrompt("");
    setActiveTab("my-automations");
  };

  const toggleAutomation = (id: string) => {
    setUserAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === "active" ? "paused" : "active" }
        : auto
    ));
  };

  const activeCount = userAutomations.filter(a => a.status === "active").length;
  const totalRuns = userAutomations.reduce((sum, a) => sum + a.runs, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Automations</h1>
          <p className="text-muted-foreground mt-1">
            Create AI-powered automations or use pre-built templates
          </p>
        </div>
        <Button onClick={handleCreateCustom} size="lg" className="gap-2">
          <Wand2 className="h-5 w-5" />
          Create Custom Automation
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
                <p className="text-sm text-muted-foreground">Total Runs</p>
                <p className="text-2xl font-bold">{totalRuns.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                <p className="text-2xl font-bold">{automationTemplates.length}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
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
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="my-automations">My Automations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* My Automations Tab */}
        <TabsContent value="my-automations" className="space-y-6">
          {userAutomations.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No automations yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create your first automation by describing what you want the AI agents to do, 
                or choose from our pre-built templates.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setActiveTab("templates")}>
                  Browse Templates
                </Button>
                <Button onClick={handleCreateCustom}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {userAutomations.map((automation) => (
                <Card key={automation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          automation.status === "active" ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-muted"
                        }`}>
                          <Bot className={`w-6 h-6 ${automation.status === "active" ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{automation.name}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{automation.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Last run: {automation.lastRun}</span>
                            <span>•</span>
                            <span>Next: {automation.nextRun}</span>
                            <span>•</span>
                            <span>{automation.runs} runs</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={automation.status === "active" ? "default" : "secondary"}>
                          {automation.status === "active" ? "Active" : "Paused"}
                        </Badge>
                        <Switch 
                          checked={automation.status === "active"}
                          onCheckedChange={() => toggleAutomation(automation.id)}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Run now</DropdownMenuItem>
                            <DropdownMenuItem>View logs</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {automationTemplates.map((template) => {
              const Icon = template.icon;
              
              return (
                <Card key={template.id} className="group hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${template.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Pre-built workflow</p>
                      <Button 
                        size="sm" 
                        onClick={() => handleCreateFromTemplate(template.id)}
                        className="gap-1"
                      >
                        Use Template
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Automation Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              {selectedTemplate ? "Customize Template" : "Create Custom Automation"}
            </DialogTitle>
            <DialogDescription>
              {selectedTemplate 
                ? "Review and customize the pre-built automation workflow"
                : "Describe what you want the AI agents to automate for your business"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Selected Template Info */}
            {selectedTemplate && (
              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  {(() => {
                    const template = automationTemplates.find(t => t.id === selectedTemplate);
                    const Icon = template?.icon || Bot;
                    return (
                      <>
                        <div className={`w-10 h-10 rounded-lg ${template?.color} flex items-center justify-center text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{template?.name}</p>
                          <p className="text-sm text-muted-foreground">{template?.category}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Describe what you want to automate
              </label>
              <Textarea
                placeholder={selectedTemplate 
                  ? "Customize the automation instructions..."
                  : "Example: Every morning at 8 AM, check my inventory and send me a WhatsApp message with items running low. If any product has less than 5 units, also email my supplier with a reorder request."
                }
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be specific about triggers (when), actions (what), and channels (email, WhatsApp, etc.)
              </p>
            </div>

            {/* Example Prompts */}
            {!selectedTemplate && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Need inspiration? Try these:
                </label>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setCustomPrompt(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Agents Preview */}
            <div className="space-y-3">
              <label className="text-sm font-medium">AI Agents that will work on this:</label>
              <div className="flex flex-wrap gap-2">
                {["Planner", "Researcher", "Analyst", "Marketing", "Writer", "Critic"].map((agent) => (
                  <div key={agent} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs">
                    <Brain className="h-3.5 w-3.5 text-primary" />
                    {agent}
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Frequency</label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time (on event)</SelectItem>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time (IST)</label>
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitAutomation} 
              disabled={!customPrompt.trim() || isCreating}
              className="gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
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
