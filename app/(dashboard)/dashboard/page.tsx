import DashboardContent from "@/components/dashboard/dashboard-content"
import { getDashboardPageData } from "@/components/dashboard/dashboard-data"

const DashboardPage = async () => {
  const { dashboardAnalytics, revenueAnalytics } = await getDashboardPageData()

  return (
    <DashboardContent
      dashboardAnalytics={dashboardAnalytics}
      revenueAnalytics={revenueAnalytics}
    />
  )
}

export default DashboardPage
