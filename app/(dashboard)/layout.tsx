import { getCurrentUser } from "@/lib/api/v1/auth/actions";
import AppSidebar from "@/components/shared/app-sidebar";
import Header from "@/components/shared/header";
import InitializeApp from "@/components/shared/initialize-app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  let currentUser;

  try {
    currentUser = await getCurrentUser();
  } catch {
    redirect("/login");
  }

  if (!currentUser.merchants.length) {
    redirect("/merchant");
  }

  return (
    <InitializeApp user={currentUser}>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex relative w-full flex-col flex-1 min-w-0">
            <Header />
            <main className="bg-surface-5 h-full w-full">{children}</main>
          </div>
        </SidebarProvider>
      </div>
    </InitializeApp>
  );
};

export default DashboardLayout;
