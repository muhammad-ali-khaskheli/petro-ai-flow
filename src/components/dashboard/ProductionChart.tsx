
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const data = [
  { date: "Sep 01", production: 7500, target: 8000 },
  { date: "Sep 02", production: 7600, target: 8000 },
  { date: "Sep 03", production: 7800, target: 8000 },
  { date: "Sep 04", production: 7950, target: 8000 },
  { date: "Sep 05", production: 8100, target: 8000 },
  { date: "Sep 06", production: 8300, target: 8000 },
  { date: "Sep 07", production: 8450, target: 8000 },
  { date: "Sep 08", production: 8600, target: 8000 },
  { date: "Sep 09", production: 8450, target: 8000 },
  { date: "Sep 10", production: 8500, target: 8000 },
  { date: "Sep 11", production: 8650, target: 8000 },
];

export default function ProductionChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Production Trend</CardTitle>
        <CardDescription>Daily oil production vs target (bbl/d)</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200, 100%, 35%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(200, 100%, 35%)" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[7000, 9000]} tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 85%)" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: "8px", 
                border: "1px solid hsl(210, 20%, 85%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)" 
              }} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="production" 
              stroke="hsl(200, 100%, 35%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorProduction)" 
              name="Actual Production"
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="hsl(215, 20%, 60%)" 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none" 
              name="Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
