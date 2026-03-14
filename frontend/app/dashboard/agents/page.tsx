"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Brain,
  Search,
  BarChart3,
  PenTool,
  Shield,
  Play,
  RefreshCw,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Eye,
  FileText,
  Copy,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Agent definitions
const agents = [
  {
    id: "planner",
    name: "Planner",
    role: "Task Decomposition",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "researcher",
    name: "Researcher",
    role: "Information Gathering",
    icon: Search,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "analyst",
    name: "Analyst",
    role: "Data Analysis",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "marketing",
    name: "Marketing",
    role: "Strategy & Content",
    icon: Zap,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "writer",
    name: "Writer",
    role: "Content Generation",
    icon: PenTool,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "critic",
    name: "Critic",
    role: "Quality Assurance",
    icon: Shield,
    color: "from-amber-500 to-yellow-500",
  },
];

// Agent outputs
const agentOutputs: Record<string, { title: string; content: string }> = {
  planner: {
    title: "Execution Plan",
    content: `## Task Breakdown

**Goal:** Analyze customer behavior and suggest improvements

### Assigned Tasks:
1. **Researcher** - Gather customer data and market trends
2. **Analyst** - Process data and identify patterns
3. **Marketing** - Develop improvement strategies
4. **Writer** - Compile final report
5. **Critic** - Quality review

### Estimated Time: 45 seconds
### Priority: High`,
  },
  researcher: {
    title: "Research Findings",
    content: `## Data Collected

### Customer Metrics:
- Total Customers: 2,847
- Active (30 days): 1,234 (43%)
- At-risk: 412 (14%)
- Churned: 892 (31%)

### Market Insights:
- Industry growth rate: 12% YoY
- Top competitor: 15% market share
- Average order value: ₹1,847`,
  },
  analyst: {
    title: "Analysis Report",
    content: `## Key Findings

### Customer Segmentation:
| Segment | Count | Revenue |
|---------|-------|---------|
| VIP | 234 | ₹4.2L |
| Regular | 856 | ₹2.8L |
| Occasional | 756 | ₹1.1L |

### Trends:
- Peak hours: 7-9 PM IST
- Best day: Sunday (28%)
- Cart abandonment: 67%`,
  },
  marketing: {
    title: "Strategy Proposal",
    content: `## Recommended Actions

### Immediate (Week 1):
1. Launch WhatsApp cart recovery
2. Create Sunday flash sale
3. Post evening stories (7-8 PM)

### Expected Impact:
- 15% increase in retention
- 23% boost in evening sales
- ₹45,000 additional monthly revenue`,
  },
  writer: {
    title: "Final Report",
    content: `# Customer Analysis Report

## Executive Summary
Analysis of 2,847 customers reveals opportunity in retention. Key focus: cart recovery, Sunday promotions.

## Key Metrics
- Active Rate: 43%
- Churn Rate: 31%
- Avg Order Value: ₹1,847

## Priority Actions
1. Implement WhatsApp cart recovery
2. Launch Sunday flash sales

## Projected Impact
Revenue increase: ₹45,000/month

*Confidence Score: 9.2/10*`,
  },
  critic: {
    title: "Quality Review",
    content: `## Quality Assessment

### Scores:
| Criteria | Score |
|----------|-------|
| Accuracy | 9.5/10 |
| Relevance | 9.0/10 |
| Actionability | 9.5/10 |
| Clarity | 9.0/10 |

### Overall: 9.2/10 ✓

### Status: APPROVED`,
  },
};

// Agent thoughts
const agentThoughts: Record<string, string[]> = {
  planner: ["Analyzing goal...", "Breaking down tasks...", "Creating plan...", "Assigning agents..."],
  researcher: ["Searching data...", "Found 15 sources...", "Extracting info...", "Compiling findings..."],
  analyst: ["Processing patterns...", "Calculating metrics...", "Identifying trends...", "Generating insights..."],
  marketing: ["Analyzing competitors...", "Creating strategy...", "Building timeline...", "Finalizing plan..."],
  writer: ["Structuring report...", "Drafting sections...", "Adding details...", "Polishing output..."],
  critic: ["Reviewing quality...", "Checking accuracy...", "Scoring output...", "Approving final..."],
};

interface AgentState {
  status: "idle" | "working" | "completed";
  progress: number;
  currentThought: string;
  output?: string;
  confidence?: number;
}

export default function AgentsPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>(() => {
    const states: Record<string, AgentState> = {};
    agents.forEach(agent => {
      states[agent.id] = { status: "idle", progress: 0, currentThought: "Ready" };
    });
    return states;
  });
  const [activityLog, setActivityLog] = useState<{ time: string; agent: string; message: string }[]>([]);
  const [expandedOutput, setExpandedOutput] = useState<string | null>(null);
  const [showFinalReport, setShowFinalReport] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    setShowFinalReport(false);
    setActivityLog([]);
    
    const newStates: Record<string, AgentState> = {};
    agents.forEach(agent => {
      newStates[agent.id] = { status: "idle", progress: 0, currentThought: "Waiting..." };
    });
    setAgentStates(newStates);

    const workflow = [
      { agentId: "planner", delay: 0, duration: 1500 },
      { agentId: "researcher", delay: 300, duration: 2000 },
      { agentId: "analyst", delay: 600, duration: 1800 },
      { agentId: "marketing", delay: 900, duration: 1500 },
      { agentId: "writer", delay: 1500, duration: 1800 },
      { agentId: "critic", delay: 2200, duration: 1500 },
    ];

    workflow.forEach(({ agentId, delay, duration }) => {
      setTimeout(() => {
        setAgentStates(prev => ({
          ...prev,
          [agentId]: { ...prev[agentId], status: "working", currentThought: agentThoughts[agentId][0] }
        }));

        const thoughts = agentThoughts[agentId];
        thoughts.forEach((thought, i) => {
          setTimeout(() => {
            setAgentStates(prev => ({
              ...prev,
              [agentId]: { ...prev[agentId], progress: ((i + 1) / thoughts.length) * 100, currentThought: thought }
            }));
            setActivityLog(prev => [{
              time: new Date().toLocaleTimeString(),
              agent: agents.find(a => a.id === agentId)?.name || "",
              message: thought
            }, ...prev]);
          }, (duration / thoughts.length) * (i + 1));
        });

        setTimeout(() => {
          setAgentStates(prev => ({
            ...prev,
            [agentId]: {
              ...prev[agentId],
              status: "completed",
              progress: 100,
              currentThought: "Completed",
              output: agentOutputs[agentId].content,
              confidence: agentId === "critic" ? 9.2 : undefined,
            }
          }));
        }, duration);
      }, delay);
    });

    setTimeout(() => {
      setIsRunning(false);
      setShowFinalReport(true);
    }, 4500);
  };

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Agent Monitor</h1>
            <p className="text-zinc-500 mt-1">Watch your AI team work and see their outputs</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              <span className={`w-2 h-2 rounded-full mr-2 ${isRunning ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`} />
              {isRunning ? "Running" : "Ready"}
            </Badge>
            <Button onClick={startSimulation} disabled={isRunning} className="bg-zinc-900 hover:bg-zinc-800">
              {isRunning ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Processing...</> : <><Play className="w-4 h-4 mr-2" />Run Demo</>}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="agents" className="space-y-6">
            <TabsList className="bg-zinc-100">
              <TabsTrigger value="agents" className="data-[state=active]:bg-white">Agent Activity</TabsTrigger>
              <TabsTrigger value="outputs" className="data-[state=active]:bg-white">Outputs & Results</TabsTrigger>
            </TabsList>

            {/* Agent Activity Tab */}
            <TabsContent value="agents" className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-zinc-900">Active Agents</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {agents.map((agent) => {
                    const Icon = agent.icon;
                    const state = agentStates[agent.id];
                    return (
                      <Card key={agent.id} className={`border-0 shadow-sm ${state.status === "working" ? "ring-2 ring-violet-500/50" : state.status === "completed" ? "ring-2 ring-emerald-500/50" : ""}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center ${state.status === "working" ? "animate-pulse" : ""}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-zinc-900">{agent.name}</h3>
                                <Badge variant="secondary" className={`text-xs ${state.status === "working" ? "bg-violet-100 text-violet-700" : state.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100"}`}>
                                  {state.status === "working" ? <><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Working</> : state.status === "completed" ? <><CheckCircle2 className="w-3 h-3 mr-1" />Done</> : <><Clock className="w-3 h-3 mr-1" />Idle</>}
                                </Badge>
                              </div>
                              <p className="text-xs text-zinc-500">{agent.role}</p>
                              {state.status === "working" && <Progress value={state.progress} className="h-1 mt-2" />}
                              <div className={`mt-2 p-2 rounded text-xs ${state.status === "working" ? "bg-violet-50 text-violet-700" : state.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-zinc-50 text-zinc-500"}`}>
                                <div className="flex items-center gap-1.5">
                                  {state.status === "working" ? <Brain className="w-3 h-3 animate-pulse" /> : state.status === "completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                  {state.currentThought}
                                </div>
                              </div>
                              {agent.id === "critic" && state.confidence && (
                                <p className="text-xs text-emerald-600 mt-2 font-medium">Score: {state.confidence}/10</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Card className="border-0 shadow-sm h-fit">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Eye className="w-4 h-4 text-zinc-400" />Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {activityLog.length === 0 ? (
                      <div className="text-center py-8">
                        <Zap className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                        <p className="text-sm text-zinc-500">No activity yet</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {activityLog.map((log, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 rounded bg-zinc-50 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-zinc-900">{log.agent}</span>
                                <span className="text-zinc-400">{log.time}</span>
                              </div>
                              <p className="text-zinc-600">{log.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Outputs Tab */}
            <TabsContent value="outputs" className="space-y-6">
              {showFinalReport && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Final Report Ready</h3>
                          <p className="text-xs text-zinc-400">Generated by Writer • Verified by Critic</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => navigator.clipboard.writeText(agentOutputs.writer.content)}>
                          <Copy className="w-4 h-4 mr-1" />Copy
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Download className="w-4 h-4 mr-1" />Download
                        </Button>
                      </div>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4 font-mono text-xs text-zinc-300 whitespace-pre-wrap max-h-[250px] overflow-y-auto">
                      {agentOutputs.writer.content}
                    </div>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-700 text-xs text-zinc-400">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" />Quality: <span className="text-emerald-400">9.2/10</span></span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Completed in 4.5s</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <h2 className="text-lg font-semibold text-zinc-900">Agent Outputs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => {
                  const Icon = agent.icon;
                  const state = agentStates[agent.id];
                  const isExpanded = expandedOutput === agent.id;
                  const output = agentOutputs[agent.id];

                  return (
                    <Card key={agent.id} className={`border-0 shadow-sm ${state.status === "completed" ? "ring-1 ring-emerald-200" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => state.status === "completed" && setExpandedOutput(isExpanded ? null : agent.id)}>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-zinc-900">{output.title}</p>
                              <p className="text-xs text-zinc-500">by {agent.name}</p>
                            </div>
                          </div>
                          {state.status === "completed" && (
                            isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />
                          )}
                          {state.status === "working" && <RefreshCw className="w-4 h-4 text-violet-500 animate-spin" />}
                          {state.status === "idle" && <Clock className="w-4 h-4 text-zinc-300" />}
                        </div>
                        {isExpanded && state.output && (
                          <div className="mt-3 pt-3 border-t border-zinc-100">
                            <div className="bg-zinc-50 rounded p-2 text-xs font-mono text-zinc-700 whitespace-pre-wrap max-h-[150px] overflow-y-auto">
                              {state.output}
                            </div>
                            <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
                              <span>{agent.id === "critic" ? `Score: ${state.confidence}/10` : "Generated"}</span>
                              <Button variant="ghost" size="sm" className="h-6 text-[10px]" onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(state.output || ""); }}>
                                <Copy className="w-2.5 h-2.5 mr-1" />Copy
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
