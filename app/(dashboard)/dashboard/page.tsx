import {
  getDashboardAnalytics,
  getRevenueAnalytics,
} from "@/lib/api/v1/analytics/queries";
import { getCurrentUser } from "@/lib/api/v1/auth/actions";
import { Mode, Period } from "@/lib/types";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { cookies } from "next/headers";

const isMode = (value?: string): value is Mode =>
  value === "test" || value === "live";

const isPeriod = (value?: string): value is Period =>
  value === "today" ||
  value === "week" ||
  value === "month" ||
  value === "year" ||
  value === "quarter" ||
  value === "all_time";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const currentUser = await getCurrentUser();
  const selectedMerchantId = cookieStore.get("current_merchant_id")?.value;
  const selectedMode = cookieStore.get("dashboard_mode")?.value;
  const selectedPeriod = cookieStore.get("dashboard_period")?.value;

  const merchant =
    currentUser.merchants.find((item) => item.id === selectedMerchantId) ??
    currentUser.merchants.find((item) => item.is_active) ??
    currentUser.merchants[0];

  const mode = isMode(selectedMode) ? selectedMode : "test";
  const period = isPeriod(selectedPeriod) ? selectedPeriod : undefined;

  const dashboardAnalytics = merchant?.id
    ? await getDashboardAnalytics(merchant.id, mode, period)
    : null;

  const revenueAnalytics = merchant?.id
    ? await getRevenueAnalytics(merchant.id, mode)
    : null;

  return (
    <DashboardContent
      dashboardAnalytics={dashboardAnalytics}
      revenueAnalytics={revenueAnalytics}
    />
  );
};

export default DashboardPage;
