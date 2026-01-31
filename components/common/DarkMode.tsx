'use client';

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function DarkMode() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
            }}
            size="icon-sm"
            className="rounded-full cursor-pointer"
        >
            <Moon className="size-4 dark:hidden" />
            <Sun className="size-4 hidden dark:inline" />
        </Button>
    );
}