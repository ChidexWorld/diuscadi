import Header from "@/components/admin/Header";
import ManagementSection from "@/components/admin/ManagementItem";
import QuickActionsSection from "@/components/admin/QuickActionsSection";
import QuickStatsSection from "@/components/admin/QuickStatsSection";
import RecentActivitySection from "@/components/admin/RecentActivitySection";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        <Header />
        <QuickStatsSection />
        <ManagementSection />
        <QuickActionsSection />
        <RecentActivitySection />
      </div>
    </div>
  );
}
