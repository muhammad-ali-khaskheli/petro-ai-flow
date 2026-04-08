
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Gauge, Server, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newData = generateRandomData();
      setPrevProduction(data.dailyProduction);
      setData(newData);
      setLoading(false);
    };

    fetchData();
    
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

  const productionChange = prevProduction === 0 
    ? "+0.0%" 
    : `${((data.dailyProduction - prevProduction) / prevProduction * 100).toFixed(1)}%`;
  
  const isPositiveChange = productionChange.includes("+") || !productionChange.startsWith("-");

  const cards = [
    {
      title: "Daily Production",
      icon: Droplet,
      value: `${data.dailyProduction.toLocaleString()} bbl/d`,
      sub: (
        <span className={`text-xs flex items-center gap-1 ${isPositiveChange ? 'text-green-600' : 'text-destructive'}`}>
          <TrendingUp className={`h-3 w-3 ${isPositiveChange ? '' : 'rotate-180'}`} />
          {productionChange} from last reading
        </span>
      ),
    },
    {
      title: "Average Pressure",
      icon: Gauge,
      value: `${data.pressureReading} psi`,
      sub: <span className="text-xs text-muted-foreground">{data.pressureReading > 3250 ? 'Above optimal range' : 'Optimal range'}</span>,
    },
    {
      title: "Equipment Health",
      icon: Server,
      value: `${data.equipmentHealth}%`,
      sub: <span className="text-xs text-muted-foreground">{data.issuesCount} {data.issuesCount === 1 ? 'item needs' : 'items need'} attention</span>,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-8 w-28 bg-muted animate-pulse rounded" />
            ) : (
              <>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.sub}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
