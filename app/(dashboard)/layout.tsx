import AppSidebar from "@/components/shared/app-sidebar"
import Header from "@/components/shared/header"
import InitializeApp from "@/components/shared/initialize-app"
import { SidebarProvider } from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <InitializeApp>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex relative w-full flex-col flex-1 min-w-0">
            <Header />
            <main className="h-full w-full flex-1 bg-surface-5">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </InitializeApp>
  )
}

export default DashboardLayout
