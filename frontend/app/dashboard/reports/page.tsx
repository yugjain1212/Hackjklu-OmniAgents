"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  Calendar,
  Star,
  Clock,
  Filter,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  goal: string;
  date: string;
  confidence: number;
  status: "completed" | "failed";
  notionUrl?: string;
  tags: string[];
}

const mockReports: Report[] = [
  {
    id: "rpt-001",
    title: "Fintech Startup Analysis - India 2026",
    goal: "Should I launch a fintech startup in India in 2026?",
    date: "2026-03-13",
    confidence: 9.2,
    status: "completed",
    notionUrl: "https://notion.so/...",
    tags: ["fintech", "market-analysis", "recommendation"],
  },
  {
    id: "rpt-002",
    title: "EV Market Trends Analysis",
    goal: "Analyze EV market trends for 2026",
    date: "2026-03-12",
    confidence: 8.7,
    status: "completed",
    notionUrl: "https://notion.so/...",
    tags: ["ev", "market-trends", "automotive"],
  },
  {
    id: "rpt-003",
    title: "Competitor Pricing Strategy Research",
    goal: "Research competitor pricing strategies",
    date: "2026-03-11",
    confidence: 8.5,
    status: "completed",
    tags: ["competitors", "pricing", "strategy"],
  },
  {
    id: "rpt-004",
    title: "AI Tool Market Opportunity",
    goal: "Is there opportunity in AI productivity tools?",
    date: "2026-03-10",
    confidence: 8.9,
    status: "completed",
    notionUrl: "https://notion.so/...",
    tags: ["ai", "productivity", "market-opportunity"],
  },
  {
    id: "rpt-005",
    title: "Healthcare SaaS Market Entry",
    goal: "Should we enter healthcare SaaS market?",
    date: "2026-03-09",
    confidence: 7.8,
    status: "completed",
    tags: ["healthcare", "saas", "market-entry"],
  },
];

function ReportCard({ report }: { report: Report }) {
  return (
    <Card className="group hover:border-foreground/20 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{report.id}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {report.date}
              </span>
            </div>
            
            <h3 className="font-medium mb-1 group-hover:text-foreground/80 transition-colors">
              {report.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 truncate">
              {report.goal}
            </p>
            
            <div className="flex items-center gap-2 flex-wrap">
              {report.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-medium">{report.confidence}</span>
              <span className="text-xs text-muted-foreground">/10</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              {report.notionUrl && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={report.notionUrl} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const filteredReports = mockReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your generated reports
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>{mockReports.length} reports</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "24", icon: FileText },
          { label: "Avg Confidence", value: "8.6", icon: Star },
          { label: "This Week", value: "5", icon: Calendar },
          { label: "Notion Synced", value: "18", icon: ExternalLink },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-display">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-1">No reports found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or create a new task
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
