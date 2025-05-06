
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OilBarrel, Gauge, Server } from "lucide-react";

export default function ProductionOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
          <OilBarrel className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8,654 bbl/d</div>
          <p className="text-xs text-muted-foreground">+2.5% from yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Average Pressure</CardTitle>
          <Gauge className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,250 psi</div>
          <p className="text-xs text-muted-foreground">Optimal range</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Equipment Health</CardTitle>
          <Server className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">94%</div>
          <p className="text-xs text-muted-foreground">3 items need attention</p>
        </CardContent>
      </Card>
    </div>
  );
}
