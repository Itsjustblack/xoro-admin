import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <section className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Loader2 className="size-20 animate-spin text-text-secondary" />
    </section>
  );
}
