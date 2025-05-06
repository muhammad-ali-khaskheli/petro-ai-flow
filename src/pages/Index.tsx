
import Layout from "@/components/Layout";
import ProductionOverview from "@/components/dashboard/ProductionOverview";
import WellPerformance from "@/components/dashboard/WellPerformance";
import ProductionChart from "@/components/dashboard/ProductionChart";
import OptimizationRecommendations from "@/components/dashboard/OptimizationRecommendations";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
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
