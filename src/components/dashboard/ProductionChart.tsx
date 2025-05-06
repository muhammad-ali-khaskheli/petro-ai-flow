
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { date: "2023-09-01", production: 7500, target: 8000 },
  { date: "2023-09-02", production: 7600, target: 8000 },
  { date: "2023-09-03", production: 7800, target: 8000 },
  { date: "2023-09-04", production: 7950, target: 8000 },
  { date: "2023-09-05", production: 8100, target: 8000 },
  { date: "2023-09-06", production: 8300, target: 8000 },
  { date: "2023-09-07", production: 8450, target: 8000 },
  { date: "2023-09-08", production: 8600, target: 8000 },
  { date: "2023-09-09", production: 8450, target: 8000 },
  { date: "2023-09-10", production: 8500, target: 8000 },
  { date: "2023-09-11", production: 8650, target: 8000 },
];

export default function ProductionChart() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Production Trend</CardTitle>
        <CardDescription>Daily production over time (bbl/d)</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis domain={[7000, 9000]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="production" 
              stroke="#0ea5e9" 
              fillOpacity={1} 
              fill="url(#colorProduction)" 
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#94a3b8" 
              strokeDasharray="5 5"
              fill="none" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
