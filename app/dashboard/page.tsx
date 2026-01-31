import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background mt-20">
            <div className="max-w-7xl mx-auto px-8 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ExpensePieChart />
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
