
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Database, RefreshCcw, Wifi, WifiOff, Clock } from "lucide-react";

type DataSource = {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  recordCount: number;
  refreshRate: string;
  enabled: boolean;
};

const initialSources: DataSource[] = [
  { id: "ds1", name: "SCADA System", type: "Real-time Sensors", status: "connected", lastSync: "2 min ago", recordCount: 1245000, refreshRate: "5s", enabled: true },
  { id: "ds2", name: "Production Database", type: "SQL Database", status: "connected", lastSync: "5 min ago", recordCount: 890000, refreshRate: "1m", enabled: true },
  { id: "ds3", name: "Weather API", type: "REST API", status: "connected", lastSync: "15 min ago", recordCount: 32000, refreshRate: "30m", enabled: true },
  { id: "ds4", name: "Equipment IoT Hub", type: "IoT Gateway", status: "error", lastSync: "2 hours ago", recordCount: 567000, refreshRate: "10s", enabled: true },
  { id: "ds5", name: "Geological Survey DB", type: "External Database", status: "disconnected", lastSync: "1 day ago", recordCount: 45000, refreshRate: "Daily", enabled: false },
  { id: "ds6", name: "Maintenance Logs", type: "Document Store", status: "connected", lastSync: "30 min ago", recordCount: 12500, refreshRate: "1h", enabled: true },
];

export default function DataSources() {
  const [sources, setSources] = useState<DataSource[]>(initialSources);
  const { toast } = useToast();

  const toggleSource = (id: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === id) {
        const newEnabled = !s.enabled;
        toast({
          title: newEnabled ? "Data Source Enabled" : "Data Source Disabled",
          description: `${s.name} has been ${newEnabled ? "enabled" : "disabled"}`,
        });
        return { ...s, enabled: newEnabled, status: newEnabled ? "connected" : "disconnected" };
      }
      return s;
    }));
  };

  const refreshSource = (id: string) => {
    const source = sources.find(s => s.id === id);
    toast({
      title: "Syncing Data Source",
      description: `Refreshing ${source?.name}...`,
    });
    setTimeout(() => {
      setSources(prev => prev.map(s => s.id === id ? { ...s, lastSync: "Just now", status: "connected" } : s));
      toast({
        title: "Sync Complete",
        description: `${source?.name} data refreshed successfully`,
      });
    }, 1500);
  };

  const connected = sources.filter(s => s.status === "connected").length;
  const totalRecords = sources.reduce((sum, s) => sum + s.recordCount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Data Sources</h1>
          <Button variant="outline" onClick={() => {
            sources.filter(s => s.enabled).forEach(s => refreshSource(s.id));
          }}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Connected Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{connected} / {sources.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalRecords / 1000000).toFixed(1)}M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Error Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{sources.filter(s => s.status === "error").length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Source Configuration</CardTitle>
            <CardDescription>Manage connections to production data feeds</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead className="text-right">Records</TableHead>
                  <TableHead>Refresh Rate</TableHead>
                  <TableHead>Enabled</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{source.type}</TableCell>
                    <TableCell>
                      <SourceStatusBadge status={source.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {source.lastSync}
                    </TableCell>
                    <TableCell className="text-right">{source.recordCount.toLocaleString()}</TableCell>
                    <TableCell>{source.refreshRate}</TableCell>
                    <TableCell>
                      <Switch checked={source.enabled} onCheckedChange={() => toggleSource(source.id)} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => refreshSource(source.id)} disabled={!source.enabled}>
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function SourceStatusBadge({ status }: { status: DataSource["status"] }) {
  if (status === "connected") return <Badge className="bg-green-600"><Wifi className="h-3 w-3 mr-1" />Connected</Badge>;
  if (status === "error") return <Badge variant="destructive">Error</Badge>;
  return <Badge variant="outline" className="text-muted-foreground"><WifiOff className="h-3 w-3 mr-1" />Disconnected</Badge>;
}
