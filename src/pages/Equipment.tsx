
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Server, Wrench, AlertTriangle, CheckCircle, Eye } from "lucide-react";

type Equipment = {
  id: string;
  name: string;
  type: string;
  well: string;
  health: number;
  hoursRun: number;
  nextMaintenance: string;
  status: "operational" | "warning" | "critical" | "offline";
  lastService: string;
  notes: string;
};

const initialEquipment: Equipment[] = [
  { id: "eq1", name: "ESP-4200A", type: "Electric Submersible Pump", well: "Gulf-A42", health: 95, hoursRun: 4200, nextMaintenance: "2026-05-15", status: "operational", lastService: "2026-02-10", notes: "Running smoothly, slight vibration noted" },
  { id: "eq2", name: "SRP-1800B", type: "Sucker Rod Pump", well: "North-B17", health: 72, hoursRun: 8100, nextMaintenance: "2026-04-20", status: "warning", lastService: "2025-12-05", notes: "Rod string showing wear, replacement scheduled" },
  { id: "eq3", name: "PCP-3100C", type: "Progressive Cavity Pump", well: "East-C09", health: 98, hoursRun: 2100, nextMaintenance: "2026-06-01", status: "operational", lastService: "2026-03-15", notes: "Newly installed, performing above expectations" },
  { id: "eq4", name: "GL-2500D", type: "Gas Lift Valve", well: "West-D23", health: 45, hoursRun: 12000, nextMaintenance: "Overdue", status: "critical", lastService: "2025-08-20", notes: "Valve malfunction detected, immediate attention required" },
  { id: "eq5", name: "SEP-5000E", type: "Separator", well: "Central-E11", health: 88, hoursRun: 6500, nextMaintenance: "2026-05-01", status: "operational", lastService: "2026-01-25", notes: "Operating within normal parameters" },
  { id: "eq6", name: "COMP-7200F", type: "Compressor", well: "South-F08", health: 65, hoursRun: 9800, nextMaintenance: "2026-04-10", status: "warning", lastService: "2025-11-18", notes: "Bearing temperature elevated, monitoring closely" },
  { id: "eq7", name: "HTR-1500G", type: "Heater Treater", well: "Gulf-A42", health: 92, hoursRun: 3600, nextMaintenance: "2026-05-20", status: "operational", lastService: "2026-02-28", notes: "Emulsion treating efficiently" },
  { id: "eq8", name: "XMAS-800H", type: "Christmas Tree", well: "East-C09", health: 30, hoursRun: 15000, nextMaintenance: "Overdue", status: "offline", lastService: "2025-06-15", notes: "Shut down for complete overhaul" },
];

export default function EquipmentPage() {
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const { toast } = useToast();

  const operational = equipment.filter(e => e.status === "operational").length;
  const avgHealth = Math.round(equipment.reduce((s, e) => s + e.health, 0) / equipment.length);
  const critical = equipment.filter(e => e.status === "critical" || e.status === "offline").length;

  const scheduleService = (eq: Equipment) => {
    toast({
      title: "Service Scheduled",
      description: `Maintenance work order created for ${eq.name}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Equipment Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Equipment</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{equipment.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Operational</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{operational}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg Health</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{avgHealth}%</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Critical / Offline</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-destructive">{critical}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Equipment Inventory</CardTitle>
            <CardDescription>Monitor and manage field equipment health</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Well</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead className="text-right">Hours Run</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((eq) => (
                  <TableRow key={eq.id}>
                    <TableCell className="font-medium">{eq.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{eq.type}</TableCell>
                    <TableCell>{eq.well}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={eq.health} className="h-2 flex-1" />
                        <span className="text-xs w-8">{eq.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{eq.hoursRun.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={eq.nextMaintenance === "Overdue" ? "text-destructive font-medium" : ""}>
                        {eq.nextMaintenance}
                      </span>
                    </TableCell>
                    <TableCell><EqStatusBadge status={eq.status} /></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{eq.name}</DialogTitle>
                              <DialogDescription>{eq.type} — {eq.well}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-4">
                              <div className="flex justify-between"><span className="text-muted-foreground">Health</span><span className="font-medium">{eq.health}%</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Hours Run</span><span className="font-medium">{eq.hoursRun.toLocaleString()}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Last Service</span><span className="font-medium">{eq.lastService}</span></div>
                              <div className="flex justify-between"><span className="text-muted-foreground">Next Maintenance</span><span className="font-medium">{eq.nextMaintenance}</span></div>
                              <div>
                                <span className="text-muted-foreground text-sm">Notes</span>
                                <p className="mt-1 text-sm">{eq.notes}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" onClick={() => scheduleService(eq)}>
                          <Wrench className="h-4 w-4" />
                        </Button>
                      </div>
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

function EqStatusBadge({ status }: { status: Equipment["status"] }) {
  if (status === "operational") return <Badge className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Operational</Badge>;
  if (status === "warning") return <Badge variant="outline" className="text-amber-500 border-amber-500"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
  if (status === "critical") return <Badge variant="destructive">Critical</Badge>;
  return <Badge variant="secondary">Offline</Badge>;
}
