import ExpensePieChart from "@/components/Dashboard/ExpensePieChart";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Welcome to your spending dashboard</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* First Half - Pie Chart */}
                    <ExpensePieChart />
                    {/* Second Half - Recent Transactions */}
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
