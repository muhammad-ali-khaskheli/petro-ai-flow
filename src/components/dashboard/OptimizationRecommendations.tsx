
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
};

const recommendations: Recommendation[] = [
  {
    id: "rec1",
    title: "Adjust Choke Settings on Well North-B17",
    description: "Reducing choke size by 15% can increase production efficiency by an estimated 7% based on pressure and flow rate analysis.",
    impact: "high",
    confidence: 92
  },
  {
    id: "rec2",
    title: "Maintenance Scheduling for West-D23",
    description: "Schedule preventative maintenance within the next 48 hours to address declining efficiency metrics.",
    impact: "high",
    confidence: 88
  },
  {
    id: "rec3",
    title: "Optimize Pump Parameters on Gulf-A42",
    description: "Current pump frequency is 5% below optimal. Increasing to 52Hz can improve production by an estimated 3%.",
    impact: "medium",
    confidence: 84
  }
];

export default function OptimizationRecommendations() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>AI Optimization Recommendations</CardTitle>
        <CardDescription>Smart suggestions to improve production</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{rec.title}</h3>
                <ImpactBadge impact={rec.impact} />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">AI Confidence: {rec.confidence}%</span>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ImpactBadge({ impact }: { impact: Recommendation["impact"] }) {
  if (impact === "high") {
    return <Badge className="bg-petroleum-600">High Impact</Badge>;
  }
  if (impact === "medium") {
    return <Badge variant="outline" className="border-petroleum-500 text-petroleum-500">Medium Impact</Badge>;
  }
  return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">Low Impact</Badge>;
}
