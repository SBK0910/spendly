import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="min-h-screen bg-background flex flex-col">
			<main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
				<div className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
							Track Your Spending
							<span className="text-primary block">with Ease</span>
						</h2>
						<p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Monitor your expenses, visualize spending patterns, and take control of your finances with Spendly.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
						<Button asChild size="lg">
							<Link href="/dashboard" className="gap-2">
								Go to Dashboard
								<ArrowRight className="w-4 h-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="#features">
								Learn More
							</Link>
						</Button>
					</div>
				</div>

				{/* Features Preview */}
				<div id="features" className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 rounded-lg border bg-card">
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
							<span className="text-lg">📊</span>
						</div>
						<h3 className="font-semibold text-lg mb-2">Visual Analytics</h3>
						<p className="text-sm text-muted-foreground">See your spending distribution with interactive charts</p>
					</div>

					<div className="p-6 rounded-lg border bg-card">
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
							<span className="text-lg">📝</span>
						</div>
						<h3 className="font-semibold text-lg mb-2">Track Transactions</h3>
						<p className="text-sm text-muted-foreground">Log and organize all your recent transactions</p>
					</div>

					<div className="p-6 rounded-lg border bg-card">
						<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
							<span className="text-lg">🎯</span>
						</div>
						<h3 className="font-semibold text-lg mb-2">Budget Control</h3>
						<p className="text-sm text-muted-foreground">Stay on top of your spending categories</p>
					</div>
				</div>
			</main>
		</div>
	);
}
