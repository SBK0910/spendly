import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ExpensePieChart />
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
