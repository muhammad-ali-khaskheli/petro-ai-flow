
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Gauge, Server, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample data with variations to simulate real-time updates
const generateRandomData = () => {
  return {
    dailyProduction: Math.floor(8500 + Math.random() * 300),
    pressureReading: Math.floor(3200 + Math.random() * 100),
    equipmentHealth: Math.floor(90 + Math.random() * 8),
    issuesCount: Math.floor(1 + Math.random() * 5)
  };
};

export default function ProductionOverview() {
  const [data, setData] = useState(generateRandomData());
  const [loading, setLoading] = useState(true);
  const [prevProduction, setPrevProduction] = useState(0);
  const { toast } = useToast();

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newData = generateRandomData();
      setPrevProduction(data.dailyProduction);
      setData(newData);
      setLoading(false);
    };

    fetchData();
    
    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchData();
      toast({
        title: "Data refreshed",
        description: "Production metrics updated with latest values",
        duration: 3000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  // Calculate production change percentage
  const productionChange = prevProduction === 0 
    ? "+0.0%" 
    : `${((data.dailyProduction - prevProduction) / prevProduction * 100).toFixed(1)}%`;
  
  const isPositiveChange = productionChange.includes("+");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
          <Droplet className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-28 bg-muted animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{data.dailyProduction.toLocaleString()} bbl/d</div>
              <p className={`text-xs flex items-center gap-1 ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`h-3 w-3 ${isPositiveChange ? '' : 'rotate-180'}`} />
                {productionChange} from last reading
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Average Pressure</CardTitle>
          <Gauge className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-28 bg-muted animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{data.pressureReading} psi</div>
              <p className="text-xs text-muted-foreground">
                {data.pressureReading > 3250 ? 'Above optimal range' : 'Optimal range'}
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Equipment Health</CardTitle>
          <Server className="h-4 w-4 text-petroleum-600" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-28 bg-muted animate-pulse rounded"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{data.equipmentHealth}%</div>
              <p className="text-xs text-muted-foreground">
                {data.issuesCount} {data.issuesCount === 1 ? 'item needs' : 'items need'} attention
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
