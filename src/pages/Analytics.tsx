
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", oil: 7800, gas: 12000, water: 2100 },
  { month: "Feb", oil: 8100, gas: 12500, water: 2300 },
  { month: "Mar", oil: 8400, gas: 13200, water: 2000 },
  { month: "Apr", oil: 8200, gas: 12800, water: 2500 },
  { month: "May", oil: 8700, gas: 13500, water: 1900 },
  { month: "Jun", oil: 8500, gas: 13000, water: 2200 },
  { month: "Jul", oil: 8900, gas: 14000, water: 2100 },
  { month: "Aug", oil: 9100, gas: 14200, water: 2400 },
  { month: "Sep", oil: 8800, gas: 13800, water: 2300 },
  { month: "Oct", oil: 9200, gas: 14500, water: 2000 },
  { month: "Nov", oil: 9000, gas: 14100, water: 2600 },
  { month: "Dec", oil: 9400, gas: 14800, water: 1800 },
];

const wellProductionData = [
  { name: "Gulf-A42", production: 1250 },
  { name: "North-B17", production: 980 },
  { name: "East-C09", production: 1420 },
  { name: "West-D23", production: 750 },
  { name: "Central-E11", production: 1100 },
  { name: "South-F08", production: 1680 },
];

const costBreakdown = [
  { name: "Operations", value: 35, color: "hsl(200, 100%, 35%)" },
  { name: "Maintenance", value: 25, color: "hsl(195, 70%, 40%)" },
  { name: "Labor", value: 20, color: "hsl(200, 30%, 50%)" },
  { name: "Equipment", value: 12, color: "hsl(200, 25%, 65%)" },
  { name: "Other", value: 8, color: "hsl(215, 15%, 75%)" },
];

const declineCurve = Array.from({ length: 24 }, (_, i) => ({
  month: i + 1,
  actual: Math.round(10000 * Math.exp(-0.03 * i) + (Math.random() - 0.5) * 300),
  predicted: Math.round(10000 * Math.exp(-0.03 * i)),
}));

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("12m");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Production Analytics</h1>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="production">
          <TabsList>
            <TabsTrigger value="production">Production Trends</TabsTrigger>
            <TabsTrigger value="wells">Well Comparison</TabsTrigger>
            <TabsTrigger value="decline">Decline Analysis</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oil, Gas & Water Production</CardTitle>
                <CardDescription>Monthly production volumes across all wells</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="oil" stackId="1" stroke="hsl(200, 100%, 35%)" fill="hsl(200, 100%, 35%)" fillOpacity={0.6} name="Oil (bbl/d)" />
                    <Area type="monotone" dataKey="gas" stackId="2" stroke="hsl(195, 70%, 40%)" fill="hsl(195, 70%, 40%)" fillOpacity={0.4} name="Gas (Mscf/d)" />
                    <Area type="monotone" dataKey="water" stackId="3" stroke="hsl(215, 20%, 60%)" fill="hsl(215, 20%, 60%)" fillOpacity={0.3} name="Water (bbl/d)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wells" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Well Production Comparison</CardTitle>
                <CardDescription>Daily production rates by well</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={wellProductionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="production" fill="hsl(200, 100%, 35%)" radius={[4, 4, 0, 0]} name="Production (bbl/d)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Decline Curve Analysis</CardTitle>
                <CardDescription>Actual vs predicted production decline over 24 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={declineCurve}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: "Month", position: "bottom" }} />
                    <YAxis label={{ value: "Production (bbl/d)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" stroke="hsl(200, 100%, 35%)" strokeWidth={2} dot={{ r: 2 }} name="Actual" />
                    <Line type="monotone" dataKey="predicted" stroke="hsl(0, 80%, 50%)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Operating Cost Breakdown</CardTitle>
                <CardDescription>Distribution of operational expenses</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie data={costBreakdown} cx="50%" cy="50%" outerRadius={150} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                      {costBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
