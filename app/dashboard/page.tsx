import CreateTransaction from "@/components/Dashboard/CreateTransaction";
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
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Spending Overview</h2>

                        {/* Pie Chart Placeholder */}
                        <div className="bg-card border rounded-lg p-6 h-80 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-48 h-48 rounded-full border-2 border-dashed border-muted-foreground/30 mx-auto mb-4"></div>
                                <p className="text-muted-foreground">Pie Chart - Expenses by Category</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Half - Recent Transactions */}
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
}
