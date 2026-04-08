
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    companyName: "PetroAI Flow Corp",
    refreshInterval: "30",
    units: "imperial",
    notifications: true,
    emailAlerts: true,
    criticalAlerts: true,
    autoRefresh: true,
    darkMode: false,
    aiModel: "advanced",
    aiAutoRun: false,
    declineModel: "exponential",
  });

  const update = (key: string, value: any) => setSettings(prev => ({ ...prev, [key]: value }));

  const save = () => {
    toast({ title: "Settings Saved", description: "Your preferences have been updated successfully." });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input value={settings.companyName} onChange={e => update("companyName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Data Refresh Interval (seconds)</Label>
                  <Select value={settings.refreshInterval} onValueChange={v => update("refreshInterval", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Unit System</Label>
                  <Select value={settings.units} onValueChange={v => update("units", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (bbl, psi, °F)</SelectItem>
                      <SelectItem value="metric">Metric (m³, kPa, °C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto-refresh Dashboard</Label>
                  <Switch checked={settings.autoRefresh} onCheckedChange={v => update("autoRefresh", v)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive in-app notifications</p>
                  </div>
                  <Switch checked={settings.notifications} onCheckedChange={v => update("notifications", v)} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-xs text-muted-foreground">Daily summary and alerts via email</p>
                  </div>
                  <Switch checked={settings.emailAlerts} onCheckedChange={v => update("emailAlerts", v)} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Critical Equipment Alerts</Label>
                    <p className="text-xs text-muted-foreground">Immediate alerts for critical failures</p>
                  </div>
                  <Switch checked={settings.criticalAlerts} onCheckedChange={v => update("criticalAlerts", v)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Engine Configuration</CardTitle>
                <CardDescription>Configure AI analysis and optimization parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>AI Analysis Model</Label>
                  <Select value={settings.aiModel} onValueChange={v => update("aiModel", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic — Fast predictions</SelectItem>
                      <SelectItem value="advanced">Advanced — Deep analysis</SelectItem>
                      <SelectItem value="ensemble">Ensemble — Multi-model consensus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Decline Curve Model</Label>
                  <Select value={settings.declineModel} onValueChange={v => update("declineModel", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exponential">Exponential Decline</SelectItem>
                      <SelectItem value="hyperbolic">Hyperbolic Decline</SelectItem>
                      <SelectItem value="harmonic">Harmonic Decline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-run AI Analysis</Label>
                    <p className="text-xs text-muted-foreground">Automatically analyze data on each refresh</p>
                  </div>
                  <Switch checked={settings.aiAutoRun} onCheckedChange={v => update("aiAutoRun", v)} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={save} className="bg-primary hover:bg-primary/90">Save Settings</Button>
        </div>
      </div>
    </Layout>
  );
}
