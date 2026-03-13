"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Brain,
  Search,
  BarChart3,
  PenTool,
  Shield,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

// Mock job data
interface Job {
  id: string;
  goal: string;
  status: "running" | "completed" | "failed" | "paused";
  progress: number;
  currentAgent: string;
  startTime: string;
  estimatedTime: string;
  events: JobEvent[];
}

interface JobEvent {
  id: string;
  agent: string;
  type: "start" | "complete" | "reject" | "approve";
  message: string;
  confidence?: number;
  timestamp: string;
}

const mockJobs: Job[] = [
  {
    id: "job-001",
    goal: "Should I launch a fintech startup in India in 2026?",
    status: "running",
    progress: 60,
    currentAgent: "Analyst",
    startTime: "2 min ago",
    estimatedTime: "~30s remaining",
    events: [
      { id: "1", agent: "Planner", type: "complete", message: "Broke goal into 4 subtasks", confidence: 9.1, timestamp: "2:00 PM" },
      { id: "2", agent: "Researcher", type: "complete", message: "Found 12 sources with market data", confidence: 8.5, timestamp: "2:01 PM" },
      { id: "3", agent: "Analyst", type: "start", message: "Processing research findings...", timestamp: "2:02 PM" },
    ],
  },
  {
    id: "job-002",
    goal: "Analyze EV market trends for 2026",
    status: "completed",
    progress: 100,
    currentAgent: "Writer",
    startTime: "15 min ago",
    estimatedTime: "Completed",
    events: [
      { id: "1", agent: "Planner", type: "complete", message: "Broke goal into 3 subtasks", confidence: 8.8, timestamp: "1:45 PM" },
      { id: "2", agent: "Researcher", type: "complete", message: "Found 8 sources", confidence: 8.2, timestamp: "1:46 PM" },
      { id: "3", agent: "Analyst", type: "complete", message: "Extracted 6 key insights", confidence: 8.7, timestamp: "1:48 PM" },
      { id: "4", agent: "Writer", type: "complete", message: "Generated report", confidence: 9.0, timestamp: "1:50 PM" },
      { id: "5", agent: "Critic", type: "approve", message: "Approved with score 9.0/10", confidence: 9.0, timestamp: "1:51 PM" },
    ],
  },
];

const agentIcons: Record<string, React.ElementType> = {
  Planner: Brain,
  Researcher: Search,
  Analyst: BarChart3,
  Writer: PenTool,
  Critic: Shield,
};

function JobCard({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    running: "bg-blue-500",
    completed: "bg-green-500",
    failed: "bg-red-500",
    paused: "bg-amber-500",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium truncate">{job.goal}</h3>
                <Badge className={statusColors[job.status]}>
                  {job.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>ID: {job.id}</span>
                <span>•</span>
                <span>Started {job.startTime}</span>
                <span>•</span>
                <span>{job.estimatedTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {job.status === "running" && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
              {job.status === "completed" && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{job.progress}%</span>
            </div>
            <Progress value={job.progress} className="h-2" />
          </div>

          {/* Current Agent */}
          {job.status === "running" && (
            <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-foreground/5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                {(() => {
                  const Icon = agentIcons[job.currentAgent] || Brain;
                  return <Icon className="w-4 h-4 text-blue-500" />;
                })()}
              </div>
              <div>
                <p className="text-sm font-medium">{job.currentAgent} is working...</p>
                <p className="text-xs text-muted-foreground">Processing your request</p>
              </div>
            </div>
          )}
        </div>

        {/* Events */}
        <div className="border-t border-foreground/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-3 flex items-center justify-between text-sm hover:bg-foreground/5 transition-colors"
          >
            <span className="text-muted-foreground">
              {isExpanded ? "Hide" : "Show"} agent activity ({job.events.length} events)
            </span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          </button>
          
          {isExpanded && (
            <ScrollArea className="h-64">
              <div className="p-6 space-y-3">
                {job.events.map((event) => {
                  const Icon = agentIcons[event.agent] || Brain;
                  const isComplete = event.type === "complete" || event.type === "approve";
                  
                  return (
                    <div key={event.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isComplete ? "bg-green-500/10" : "bg-blue-500/10"}`}>
                        <Icon className={`w-4 h-4 ${isComplete ? "text-green-500" : "text-blue-500"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{event.agent}</span>
                          {event.confidence && (
                            <Badge variant="secondary" className="text-xs">
                              {event.confidence}/10
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground ml-auto">{event.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display tracking-tight">Active Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Monitor running tasks and view history
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Running", value: "1", icon: Play, color: "text-blue-500" },
          { label: "Completed", value: "23", icon: CheckCircle2, color: "text-green-500" },
          { label: "Failed", value: "0", icon: AlertCircle, color: "text-red-500" },
          { label: "Total", value: "24", icon: Clock, color: "text-muted-foreground" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-display">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
