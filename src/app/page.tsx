import {
  getWorldDashboardMetrics,
  fetchWorldBankRegionalData,
  fetchUzbekistanDynamicProfile,
} from "@/lib/world-bank";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

// Dynamic server-side rendering with 24h ISR caching
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch real World Bank demographic indicators, regional data & Uzbekistan profile on the server
  const [dashboardData, regionalData, uzbekistanProfile] = await Promise.all([
    getWorldDashboardMetrics(),
    fetchWorldBankRegionalData(),
    fetchUzbekistanDynamicProfile(),
  ]);

  return (
    <DashboardContent
      dashboardData={dashboardData}
      regionalData={regionalData}
      uzbekistanProfile={uzbekistanProfile}
    />
  );
}
