
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProductionOverview from "@/components/dashboard/ProductionOverview";
import WellPerformance from "@/components/dashboard/WellPerformance";
import ProductionChart from "@/components/dashboard/ProductionChart";
import OptimizationRecommendations from "@/components/dashboard/OptimizationRecommendations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCcw, Brain } from "lucide-react";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    toast({
      title: "AI Analysis Started",
      description: "Running deep analysis on production data...",
      duration: 2000,
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "AI Analysis Complete",
        description: "New optimization recommendations generated",
        duration: 3000,
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Production Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time overview of all field operations</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={runAIAnalysis} 
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary/90"
            >
              <Brain className="mr-2 h-4 w-4" />
              {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
            </Button>
            <Button variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>

        <ProductionOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProductionChart />
          <OptimizationRecommendations />
        </div>
        
        <WellPerformance />
      </div>
    </Layout>
  );
};

export default Index;
