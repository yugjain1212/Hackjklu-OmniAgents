"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentPipeline } from "@/components/agent/agent-pipeline";
import { ActivityFeed } from "@/components/agent/activity-feed";
import {
  ArrowRight,
  Upload,
  Sparkles,
  Brain,
  Search,
  BarChart3,
  PenTool,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Send,
  Paperclip,
  Bot,
  User,
  ChevronRight,
  ExternalLink,
  Megaphone,
  TrendingUp,
  Store,
  MapPin,
  Target,
  IndianRupee,
} from "lucide-react";

// Message types for chat interface
type MessageType = "user" | "agent" | "system" | "report";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  agent?: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: number;
    insights?: number;
    notionUrl?: string;
  };
}

// Agent visualization component
function AgentStep({
  icon: Icon,
  name,
  role,
  status,
  confidence,
  message,
}: {
  icon: React.ElementType;
  name: string;
  role: string;
  status: "waiting" | "active" | "complete" | "retrying";
  confidence?: number;
  message?: string;
}) {
  const statusConfig = {
    waiting: { color: "text-muted-foreground", bg: "bg-muted", icon: Clock },
    active: { color: "text-blue-500", bg: "bg-blue-500/10", icon: Sparkles },
    complete: { color: "text-green-500", bg: "bg-green-500/10", icon: CheckCircle2 },
    retrying: { color: "text-amber-500", bg: "bg-amber-500/10", icon: AlertCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`flex gap-3 p-3 rounded-lg border transition-all duration-300 ${status === "active" ? "border-blue-500/30 bg-blue-500/5" : "border-foreground/10"}`}>
      <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">{name}</h4>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            <StatusIcon className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{role}</p>
        {message && <p className="text-xs mt-1.5 text-muted-foreground">{message}</p>}
        {confidence && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-[10px] mb-0.5">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium">{confidence}/10</span>
            </div>
            <Progress value={confidence * 10} className="h-1" />
          </div>
        )}
      </div>
    </div>
  );
}

// Chat message component
function ChatMessage({ message }: { message: Message }) {
  if (message.type === "user") {
    return (
      <div className="flex gap-3 justify-end">
        <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
          <p className="text-sm">{message.content}</p>
          <span className="text-[10px] opacity-60 mt-1 block">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  if (message.type === "report") {
    return (
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 max-w-[80%]">
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Report Generated</h4>
                  <p className="text-xs text-muted-foreground mt-1">{message.content}</p>
                  {message.metadata && (
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <span className="text-muted-foreground">
                        Confidence: <span className="text-green-500 font-medium">{message.metadata.confidence}/10</span>
                      </span>
                      <span className="text-muted-foreground">
                        Sources: <span className="font-medium">{message.metadata.sources}</span>
                      </span>
                    </div>
                  )}
                </div>
                <Button size="sm" variant="outline" className="rounded-full text-xs h-8">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
          <span className="text-[10px] text-muted-foreground mt-1 block">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    );
  }

  if (message.type === "agent") {
    const agentColors: Record<string, string> = {
      Planner: "from-violet-500 to-purple-500",
      Researcher: "from-blue-500 to-cyan-500",
      Analyst: "from-amber-500 to-orange-500",
      "Marketing Analyst": "from-fuchsia-500 to-pink-500",
      Writer: "from-emerald-500 to-teal-500",
      Critic: "from-rose-500 to-red-500",
    };

    return (
      <div className="flex gap-3">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${agentColors[message.agent || "Planner"]} flex items-center justify-center shrink-0`}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 max-w-[80%]">
          <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium">{message.agent}</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Agent
              </Badge>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
        {message.content}
      </span>
    </div>
  );
}

// Business profile type
interface BusinessProfile {
  name: string;
  industry: string;
  revenue: string;
  city: string;
  goal: string;
}

export default function NewTaskPage() {
  const [input, setInput] = useState("");
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: "Riya's Boutique",
    industry: "clothing",
    revenue: "3-5L",
    city: "Pune",
    goal: "grow_sales",
  });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: "Welcome! I'm your AI business assistant. Describe your goal and I'll analyze competitors, find marketing gaps, and create a growth plan for your business.",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [criticRejected, setCriticRejected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    setShowSidebar(true);

    // Simulate agent pipeline with chat messages - 6 agents
    const agentSteps = [
      { agent: "Planner", message: `Analyzing your business: ${businessProfile.name} (${businessProfile.industry}) in ${businessProfile.city}...`, delay: 1000 },
      { agent: "Planner", message: "Created 5 subtasks: Competitor Analysis, Market Research, Marketing Intelligence, Content Strategy, and Growth Plan.", delay: 2000 },
      { agent: "Researcher", message: "Searching for competitor data and market trends in Indian D2C clothing space...", delay: 1500 },
      { agent: "Researcher", message: "Found 14 sources: competitor websites, market reports, pricing data, and customer reviews.", delay: 2500 },
      { agent: "Analyst", message: "Analyzing revenue gap from ₹3L to ₹10L/month and identifying bottlenecks...", delay: 1500 },
      { agent: "Analyst", message: "Key bottleneck identified: Low customer retention (18%). Best performing: Festive wear (42% margin).", delay: 2500 },
      { agent: "Marketing Analyst", message: "Analyzing competitor marketing strategies and ad campaigns...", delay: 1500 },
      { agent: "Marketing Analyst", message: "Gap found: No competitor targets working professionals with premium ethnic wear. Opportunity identified!", delay: 2500 },
      { agent: "Writer", message: "Creating your growth plan with Instagram content, WhatsApp messages, and email drafts...", delay: 1500 },
      { agent: "Writer", message: "Generated: 7 Instagram posts, 3 WhatsApp broadcasts, 1 email newsletter, and month-by-month action plan.", delay: 2500 },
      { agent: "Critic", message: "Reviewing all outputs for accuracy and Indian market appropriateness...", delay: 1500 },
    ];
    
    // Add critic rejection simulation (30% chance)
    const shouldReject = Math.random() < 0.3;

    for (let i = 0; i < agentSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, agentSteps[i].delay));
      
      const agentMessage: Message = {
        id: `agent-${Date.now()}-${i}`,
        type: "agent",
        agent: agentSteps[i].agent,
        content: agentSteps[i].message,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
    }

    // Simulate critic rejection and retry
    if (shouldReject) {
      setCriticRejected(true);
      const rejectMessage: Message = {
        id: `critic-reject-${Date.now()}`,
        type: "agent",
        agent: "Critic",
        content: "REJECTED - Score: 5.5/10. Issues found: Missing competitor pricing data for premium segment. Send back to: Marketing Analyst",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, rejectMessage]);
      
      // Retry Marketing Analyst
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const retryMessage: Message = {
        id: `retry-${Date.now()}`,
        type: "agent",
        agent: "Marketing Analyst",
        content: "Retrying... Found detailed pricing for 5 premium competitors. Range: ₹2,500-₹8,000 per outfit.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, retryMessage]);
      
      // Critic approves after retry
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const approveMessage: Message = {
        id: `critic-approve-${Date.now()}`,
        type: "agent",
        agent: "Critic",
        content: "APPROVED - Score: 9.2/10. Quality check passed. All data verified. Authorizing: Notion save + content delivery.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, approveMessage]);
      setCriticRejected(false);
    } else {
      // Direct approval
      const approveMessage: Message = {
        id: `critic-approve-${Date.now()}`,
        type: "agent",
        agent: "Critic",
        content: "APPROVED - Score: 9.2/10. Quality check passed. All data verified. Authorizing: Notion save + content delivery.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, approveMessage]);
    }

    // Final report message with Indian context
    const reportMessage: Message = {
      id: `report-${Date.now()}`,
      type: "report",
      content: `Your complete business growth plan is ready! Includes: Competitor analysis for ${businessProfile.city} market, marketing gap identification, 7 Instagram posts, 3 WhatsApp messages, 1 email newsletter, and month-by-month plan to reach ₹10L/month.`,
      timestamp: new Date(),
      metadata: {
        confidence: 9.2,
        sources: 14,
        insights: 8,
        notionUrl: "https://notion.so/...",
      },
    };

    setMessages((prev) => [...prev, reportMessage]);
    setIsProcessing(false);
    setCurrentStep(-1);
  };

  const getAgentStatus = (step: number, current: number): "waiting" | "active" | "complete" | "retrying" => {
    if (current > step) return "complete";
    if (current === step) return "active";
    return "waiting";
  };

  const agents = [
    { icon: Brain, name: "Planner", role: "Business Project Manager", status: getAgentStatus(0, Math.floor(currentStep / 2)) },
    { icon: Search, name: "Researcher", role: "Business Intelligence", status: getAgentStatus(1, Math.floor(currentStep / 2)) },
    { icon: BarChart3, name: "Analyst", role: "Business Data Scientist", status: getAgentStatus(2, Math.floor(currentStep / 2)) },
    { icon: Megaphone, name: "Marketing Analyst", role: "Competitive Intelligence", status: getAgentStatus(3, Math.floor(currentStep / 2)) },
    { icon: PenTool, name: "Writer", role: "Content Creator", status: getAgentStatus(4, Math.floor(currentStep / 2)) },
    { icon: Shield, name: "Critic", role: "Quality Controller", status: getAgentStatus(5, Math.floor(currentStep / 2)) },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] -mx-6 -mt-6 flex">
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col ${showSidebar ? "border-r" : ""}`}>
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-display tracking-tight">New Task</h1>
              <p className="text-xs text-muted-foreground">Chat with your AI business assistant</p>
            </div>
            {/* Business Profile Badge */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => setShowProfileForm(!showProfileForm)}
            >
              <Store className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium">{businessProfile.name}</span>
              <Badge variant="secondary" className="text-[10px] px-1.5">
                <IndianRupee className="w-3 h-3 mr-0.5" />
                {businessProfile.revenue}/month
              </Badge>
            </div>
          </div>
          {showSidebar && (
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? "Hide Pipeline" : "Show Pipeline"}
            </Button>
          )}
        </div>

        {/* Business Profile Form (Collapsible) */}
        {showProfileForm && (
          <div className="px-6 py-4 border-b bg-muted/30">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Business Profile
                </h3>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowProfileForm(false)}>
                  Done
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Business Name</label>
                  <input
                    type="text"
                    value={businessProfile.name}
                    onChange={(e) => setBusinessProfile({...businessProfile, name: e.target.value})}
                    className="w-full mt-1 px-2 py-1.5 text-sm bg-background border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Industry</label>
                  <select
                    value={businessProfile.industry}
                    onChange={(e) => setBusinessProfile({...businessProfile, industry: e.target.value})}
                    className="w-full mt-1 px-2 py-1.5 text-sm bg-background border rounded-md"
                  >
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="salon">Salon</option>
                    <option value="tech">Tech</option>
                    <option value="services">Services</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly Revenue</label>
                  <select
                    value={businessProfile.revenue}
                    onChange={(e) => setBusinessProfile({...businessProfile, revenue: e.target.value})}
                    className="w-full mt-1 px-2 py-1.5 text-sm bg-background border rounded-md"
                  >
                    <option value="0-1L">₹0 - 1L</option>
                    <option value="1-5L">₹1 - 5L</option>
                    <option value="5-10L">₹5 - 10L</option>
                    <option value="10L+">₹10L+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    value={businessProfile.city}
                    onChange={(e) => setBusinessProfile({...businessProfile, city: e.target.value})}
                    className="w-full mt-1 px-2 py-1.5 text-sm bg-background border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="py-6 space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="px-6 py-4 border-t">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative">
              <Textarea
                placeholder="Describe your goal... (e.g., Should I launch a fintech startup in India in 2026?)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[80px] pr-24 resize-none rounded-xl"
                disabled={isProcessing}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  disabled={isProcessing}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isProcessing}
                  className="h-8 rounded-lg bg-foreground hover:bg-foreground/90 text-background"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Press Enter to send • Attach files for additional context
            </p>
          </form>
        </div>
      </div>

      {/* Sidebar - Agent Pipeline */}
      {showSidebar && (
        <div className="w-80 flex flex-col border-l bg-muted/30">
          <div className="px-4 py-4 border-b">
            <h2 className="font-medium text-sm">Agent Pipeline</h2>
            <p className="text-xs text-muted-foreground">
              {isProcessing ? "Processing your request..." : "Ready to start"}
            </p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentStep key={agent.name} {...agent} />
              ))}
            </div>
          </ScrollArea>

          {/* Critic Rejection Alert */}
          {criticRejected && (
            <div className="p-3 mx-4 mt-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-amber-600">Quality Check Failed</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Score: 5.5/10 - Retrying...</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="p-4 border-t space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={isProcessing ? "default" : "secondary"} className="text-[10px]">
                {isProcessing ? "Running" : "Idle"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Est. Time</span>
              <span className="font-medium">~60 seconds</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium text-green-500">9.2/10</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Business</span>
              <span className="font-medium">{businessProfile.name}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Revenue</span>
              <span className="font-medium flex items-center">
                <IndianRupee className="w-3 h-3 mr-0.5" />
                {businessProfile.revenue}/month
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
