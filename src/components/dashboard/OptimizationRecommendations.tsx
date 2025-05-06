
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Check, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
  applied: boolean;
  detailsVisible: boolean;
  details: string;
};

const initialRecommendations: Recommendation[] = [
  {
    id: "rec1",
    title: "Adjust Choke Settings on Well North-B17",
    description: "Reducing choke size by 15% can increase production efficiency by an estimated 7% based on pressure and flow rate analysis.",
    impact: "high",
    confidence: 92,
    applied: false,
    detailsVisible: false,
    details: "Flow simulations indicate that the current choke setting is causing unnecessary pressure drops. ML models trained on similar well profiles predict a 7-9% improvement in efficiency with a more optimal choke size. Historical data from similar corrections supports this conclusion with 92% confidence."
  },
  {
    id: "rec2",
    title: "Maintenance Scheduling for West-D23",
    description: "Schedule preventative maintenance within the next 48 hours to address declining efficiency metrics.",
    impact: "high",
    confidence: 88,
    applied: false,
    detailsVisible: false,
    details: "Vibration analysis and temperature trending shows early signs of pump degradation. Our predictive maintenance algorithm has identified a pattern consistent with bearing wear. Immediate maintenance can prevent an estimated 4-day shutdown that would occur if failure happens unexpectedly."
  },
  {
    id: "rec3",
    title: "Optimize Pump Parameters on Gulf-A42",
    description: "Current pump frequency is 5% below optimal. Increasing to 52Hz can improve production by an estimated 3%.",
    impact: "medium",
    confidence: 84,
    applied: false,
    detailsVisible: false,
    details: "Comparative analysis of operating parameters across similar wells shows underutilization of pump capacity. Energy efficiency models indicate this can be achieved without significant increase in power consumption. Testing on similar wells yielded 2.8-3.2% production improvements."
  }
];

export default function OptimizationRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const { toast } = useToast();

  const handleApply = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, applied: true } : rec
      )
    );
    
    toast({
      title: "Recommendation Applied",
      description: "The optimization has been successfully applied",
      duration: 3000,
    });
  };
  
  const toggleDetails = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, detailsVisible: !rec.detailsVisible } : rec
      )
    );
  };

  const getNewRecommendation = () => {
    const newRec: Recommendation = {
      id: `rec${Date.now()}`,
      title: "Adjust Water Injection Rate on East-C09",
      description: "Increasing water injection by 5% could improve reservoir pressure and boost production by an estimated 4%.",
      impact: "medium",
      confidence: 78,
      applied: false,
      detailsVisible: false,
      details: "Reservoir simulation models indicate that the current water-oil ratio is below optimal levels. Historical production data from this reservoir shows improved recovery with increased water injection rates. Implementation should be monitored closely for the first 72 hours to verify response."
    };
    
    setRecommendations(prev => [...prev, newRec]);
    
    toast({
      title: "New Recommendation",
      description: "AI has generated a new optimization opportunity",
      duration: 3000,
    });
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-petroleum-600" />
            AI Optimization Recommendations
          </CardTitle>
          <CardDescription>Smart suggestions to improve production</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={getNewRecommendation}
          className="mt-0"
        >
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
          {recommendations.map((rec) => (
            <div key={rec.id} className={`border rounded-md p-4 transition-colors ${rec.applied ? 'bg-muted/50' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium flex items-center">
                  {rec.applied && <Check className="h-4 w-4 text-green-500 mr-1.5" />}
                  {rec.title}
                </h3>
                <ImpactBadge impact={rec.impact} />
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              
              {rec.detailsVisible && (
                <div className="my-3 text-sm border-l-2 border-petroleum-300 pl-3 py-1 bg-muted/50 rounded-r-sm">
                  {rec.details}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground">AI Confidence: {rec.confidence}%</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-1.5 ml-2" 
                    onClick={() => toggleDetails(rec.id)}
                  >
                    {rec.detailsVisible ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  variant={rec.applied ? "outline" : "default"}
                  disabled={rec.applied}
                  className={rec.applied ? "cursor-default" : ""}
                  onClick={() => !rec.applied && handleApply(rec.id)}
                >
                  {rec.applied ? "Applied" : "Apply"}
                </Button>
              </div>
            </div>
          ))}

          {recommendations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No recommendations available</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={getNewRecommendation}
              >
                Generate Recommendations
              </Button>
            </div>
          )}
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
