import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import Header from "@/components/common/Header";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="max-w-7xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ExpensePieChart />
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
