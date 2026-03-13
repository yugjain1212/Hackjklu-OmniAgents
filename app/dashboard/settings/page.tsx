"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Key,
  Bell,
  Shield,
  Database,
  Globe,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

function ApiKeyInput({
  label,
  description,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {isSaved && (
          <Badge variant="secondary" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Saved
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type={showKey ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    groqApiKey: "",
    serperApiKey: "",
    notionApiKey: "",
    notionPageId: "",
    confidenceThreshold: "7",
    maxRetries: "3",
    emailNotifications: true,
    slackNotifications: false,
    autoSaveToNotion: true,
    theme: "system",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your API keys and preferences
        </p>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            <CardTitle>API Keys</CardTitle>
          </div>
          <CardDescription>
            Configure API keys for LLM, search, and integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ApiKeyInput
            label="Groq API Key"
            description="Used for LLM inference. Get yours at groq.com"
            value={settings.groqApiKey}
            onChange={(value) => setSettings({ ...settings, groqApiKey: value })}
            placeholder="gsk_..."
          />
          
          <Separator />
          
          <ApiKeyInput
            label="Serper API Key"
            description="Used for web search. Get yours at serper.dev"
            value={settings.serperApiKey}
            onChange={(value) => setSettings({ ...settings, serperApiKey: value })}
            placeholder="..."
          />
          
          <Separator />
          
          <ApiKeyInput
            label="Notion API Key"
            description="Used to save reports to Notion"
            value={settings.notionApiKey}
            onChange={(value) => setSettings({ ...settings, notionApiKey: value })}
            placeholder="secret_..."
          />
          
          <div className="space-y-2">
            <Label>Notion Page ID</Label>
            <p className="text-xs text-muted-foreground">
              The page where reports will be saved
            </p>
            <Input
              value={settings.notionPageId}
              onChange={(e) => setSettings({ ...settings, notionPageId: e.target.value })}
              placeholder="..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Agent Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <CardTitle>Agent Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure agent behavior and quality thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Confidence Threshold</Label>
              <p className="text-xs text-muted-foreground">
                Minimum score for Critic approval (1-10)
              </p>
              <Select
                value={settings.confidenceThreshold}
                onValueChange={(value) => setSettings({ ...settings, confidenceThreshold: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 6, 7, 8, 9].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}.0
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Max Retries</Label>
              <p className="text-xs text-muted-foreground">
                Maximum retry attempts per agent
              </p>
              <Select
                value={settings.maxRetries}
                onValueChange={(value) => setSettings({ ...settings, maxRetries: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Configure how you want to be notified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Receive email when tasks complete
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailNotifications: checked })
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Slack Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Send notifications to Slack webhook
              </p>
            </div>
            <Switch
              checked={settings.slackNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, slackNotifications: checked })
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-save to Notion</Label>
              <p className="text-xs text-muted-foreground">
                Automatically save reports to Notion
              </p>
            </div>
            <Switch
              checked={settings.autoSaveToNotion}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoSaveToNotion: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            <CardTitle>System Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Groq API", status: "Connected", latency: "120ms" },
              { name: "Serper API", status: "Connected", latency: "245ms" },
              { name: "Notion API", status: "Not configured", latency: "-" },
              { name: "ChromaDB", status: "Running", latency: "15ms" },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${service.status === "Connected" || service.status === "Running" ? "bg-green-500" : "bg-amber-500"}`} />
                  <span className="text-sm">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={service.status === "Connected" || service.status === "Running" ? "secondary" : "outline"} className="text-xs">
                    {service.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {service.latency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
