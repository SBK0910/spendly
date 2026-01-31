import { User } from "lucide-react";
import DarkMode from "./DarkMode";

export default function Header() {
    return (
        <header className="border-b bg-card/50 backdrop-blur supports-backdrop-filter:bg-card/50">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-base">
                        $
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight">Spendly</h1>
                </div>

                <div className="flex items-center gap-2">
                    {/* Dark Mode Toggle */}
                    <DarkMode />
                    {/* Avatar */}
                    <button className="w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-colors flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                    </button>
                </div>
            </div>
        </header>
    )
}