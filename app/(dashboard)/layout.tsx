import AppSidebar from "@/components/shared/app-sidebar"
import Header from "@/components/shared/header"
import InitializeApp from "@/components/shared/initialize-app"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/api/v1/auth/actions"
import { redirect } from "next/navigation"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  let currentUser

  try {
    currentUser = await getCurrentUser()
  } catch {
    redirect("/login")
  }

  if (!currentUser.merchants.length) {
    redirect("/merchant")
  }

  return (
    <InitializeApp user={currentUser}>
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
