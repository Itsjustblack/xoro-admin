import AppSidebar from "@/components/shared/app-sidebar";
import Header from "@/components/shared/header";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex relative w-full flex-col">
          <Header />
          <main className="bg-surface-5 h-full w-full">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
