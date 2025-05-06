
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Well = {
  id: string;
  name: string;
  production: number;
  efficiency: number;
  status: "optimal" | "warning" | "critical";
};

const wells: Well[] = [
  { id: "w1", name: "Gulf-A42", production: 1250, efficiency: 96, status: "optimal" },
  { id: "w2", name: "North-B17", production: 980, efficiency: 88, status: "warning" },
  { id: "w3", name: "East-C09", production: 1420, efficiency: 97, status: "optimal" },
  { id: "w4", name: "West-D23", production: 750, efficiency: 72, status: "critical" },
  { id: "w5", name: "Central-E11", production: 1100, efficiency: 92, status: "optimal" },
];

export default function WellPerformance() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Well Performance</CardTitle>
        <CardDescription>Current production metrics for all wells</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Well</TableHead>
              <TableHead className="text-right">Production (bbl/d)</TableHead>
              <TableHead className="text-right">Efficiency</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wells.map((well) => (
              <TableRow key={well.id}>
                <TableCell className="font-medium">{well.name}</TableCell>
                <TableCell className="text-right">{well.production}</TableCell>
                <TableCell className="text-right">{well.efficiency}%</TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={well.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: Well["status"] }) {
  if (status === "optimal") {
    return <Badge className="bg-green-500">Optimal</Badge>;
  }
  if (status === "warning") {
    return <Badge variant="outline" className="text-amber-500 border-amber-500">Warning</Badge>;
  }
  return <Badge variant="destructive">Critical</Badge>;
}
