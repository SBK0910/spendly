import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import RecentExpenses from "@/components/dashboard/RecentExpenses";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background mt-20">
            <div className="max-w-7xl mx-auto px-8 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ExpensePieChart />
                    <RecentExpenses />
                </div>
            </div>
        </div>
    );
}
