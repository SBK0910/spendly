import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="min-h-screen bg-background flex flex-col mt-5">
			<main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
				<div className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
							Track Your Spending
							<span className="text-primary block">with Ease</span>
						</h2>
						<p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Monitor your expenses, visualize spending patterns, and take control of your finances with Spendly.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
						<Button asChild className="w-full sm:w-48">
							<Link href="/dashboard" className="gap-2 text-sm">
								Go to Dashboard
								<ArrowRight className="w-4 h-4" />
							</Link>
						</Button>
						<Button asChild variant="outline" className="w-full sm:w-48">
							<Link href="#features" className="text-sm">
								Learn More
							</Link>
						</Button>
					</div>
				</div>

				{/* Features Preview */}
				<div id="features" className="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
				<Card className="flex flex-col items-center text-center">
					<CardContent className="pt-6 space-y-4">
						<div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
							<span className="text-3xl">📊</span>
						</div>
						<div className="space-y-2">
						<h3 className="font-semibold text-lg">Visual Analytics</h3>
						<p className="text-sm text-muted-foreground">See your spending distribution with interactive charts</p>
						</div>
					</CardContent>
				</Card>

				<Card className="flex flex-col items-center text-center">
					<CardContent className="pt-6 space-y-4">
						<div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
							<span className="text-3xl">📝</span>
						</div>
						<div className="space-y-2">
						<h3 className="font-semibold text-lg">Track Expenses</h3>
						<p className="text-sm text-muted-foreground">Log and organize all your recent expenses</p>
						</div>
					</CardContent>
				</Card>

				<Card className="flex flex-col items-center text-center">
					<CardContent className="pt-6 space-y-4">
						<div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
							<span className="text-3xl">🎯</span>
						</div>
						<div className="space-y-2">
						<h3 className="font-semibold text-lg">Budget Control</h3>
						<p className="text-sm text-muted-foreground">Stay on top of your spending categories</p>
						</div>
					</CardContent>
				</Card>
				</div>
			</main>
		</div>
	);
}
