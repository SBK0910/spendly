import Link from "next/link";
import User from "./User";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card">
            <div className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">
                            $
                        </div>
                        <h1 className="text-lg font-semibold tracking-tight">Spendly</h1>
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    <User />
                </div>
            </div>
        </header>
    )
}