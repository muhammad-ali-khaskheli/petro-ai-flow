
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Droplet, Plus, Eye, TrendingUp, TrendingDown } from "lucide-react";

type Well = {
  id: string;
  name: string;
  location: string;
  type: string;
  depth: number;
  production: number;
  efficiency: number;
  status: "active" | "maintenance" | "shut-in";
  lastInspection: string;
  waterCut: number;
  gasOilRatio: number;
};

const initialWells: Well[] = [
  { id: "w1", name: "Gulf-A42", location: "Block 7, Gulf Region", type: "Vertical", depth: 3200, production: 1250, efficiency: 96, status: "active", lastInspection: "2026-03-15", waterCut: 12, gasOilRatio: 450 },
  { id: "w2", name: "North-B17", location: "Block 3, Northern Basin", type: "Horizontal", depth: 4100, production: 980, efficiency: 88, status: "maintenance", lastInspection: "2026-02-28", waterCut: 22, gasOilRatio: 380 },
  { id: "w3", name: "East-C09", location: "Block 12, Eastern Field", type: "Deviated", depth: 2800, production: 1420, efficiency: 97, status: "active", lastInspection: "2026-04-01", waterCut: 8, gasOilRatio: 520 },
  { id: "w4", name: "West-D23", location: "Block 5, Western Zone", type: "Vertical", depth: 3600, production: 750, efficiency: 72, status: "shut-in", lastInspection: "2026-01-20", waterCut: 35, gasOilRatio: 290 },
  { id: "w5", name: "Central-E11", location: "Block 9, Central Area", type: "Horizontal", depth: 3900, production: 1100, efficiency: 92, status: "active", lastInspection: "2026-03-22", waterCut: 15, gasOilRatio: 470 },
  { id: "w6", name: "South-F08", location: "Block 2, Southern Basin", type: "Multilateral", depth: 4500, production: 1680, efficiency: 94, status: "active", lastInspection: "2026-03-30", waterCut: 10, gasOilRatio: 510 },
];

export default function Wells() {
  const [wells, setWells] = useState<Well[]>(initialWells);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const filteredWells = filterStatus === "all" ? wells : wells.filter(w => w.status === filterStatus);

  const totalProduction = wells.filter(w => w.status === "active").reduce((sum, w) => sum + w.production, 0);
  const avgEfficiency = Math.round(wells.reduce((sum, w) => sum + w.efficiency, 0) / wells.length);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Well Management</h1>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wells</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="shut-in">Shut-in</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Wells</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wells.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Wells</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{wells.filter(w => w.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProduction.toLocaleString()} bbl/d</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEfficiency}%</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Well Inventory</CardTitle>
            <CardDescription>Manage and monitor all production wells</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Well Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Depth (ft)</TableHead>
                  <TableHead className="text-right">Production (bbl/d)</TableHead>
                  <TableHead className="text-right">Efficiency</TableHead>
                  <TableHead className="text-right">Water Cut</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWells.map((well) => (
                  <TableRow key={well.id}>
                    <TableCell className="font-medium">{well.name}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{well.location}</TableCell>
                    <TableCell>{well.type}</TableCell>
                    <TableCell className="text-right">{well.depth.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{well.production.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={well.efficiency >= 90 ? "text-green-600" : well.efficiency >= 80 ? "text-amber-600" : "text-red-600"}>
                        {well.efficiency}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{well.waterCut}%</TableCell>
                    <TableCell>
                      <WellStatusBadge status={well.status} />
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedWell(well)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{well.name} - Well Details</DialogTitle>
                            <DialogDescription>{well.location}</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                              <Label className="text-muted-foreground text-xs">Well Type</Label>
                              <p className="font-medium">{well.type}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Depth</Label>
                              <p className="font-medium">{well.depth.toLocaleString()} ft</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Daily Production</Label>
                              <p className="font-medium">{well.production.toLocaleString()} bbl/d</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Efficiency</Label>
                              <p className="font-medium">{well.efficiency}%</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Water Cut</Label>
                              <p className="font-medium">{well.waterCut}%</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Gas-Oil Ratio</Label>
                              <p className="font-medium">{well.gasOilRatio} scf/bbl</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Last Inspection</Label>
                              <p className="font-medium">{well.lastInspection}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground text-xs">Status</Label>
                              <p><WellStatusBadge status={well.status} /></p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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

function WellStatusBadge({ status }: { status: Well["status"] }) {
  if (status === "active") return <Badge className="bg-green-600">Active</Badge>;
  if (status === "maintenance") return <Badge variant="outline" className="text-amber-500 border-amber-500">Maintenance</Badge>;
  return <Badge variant="destructive">Shut-in</Badge>;
}
