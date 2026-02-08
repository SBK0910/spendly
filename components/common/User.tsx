"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";

export default function User() {
    const { theme, setTheme } = useTheme();
    const { signOut, isSignedIn } = useClerk();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src="https://avatar.vercel.sh/spendly" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="p-0">
                    <Button
                        variant="ghost"
                        size="xs"
                        className="w-full h-8 cursor-pointer justify-between"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        Dark Mode
                        <span className="inline-flex items-center">
                            <Moon className="size-4 dark:hidden" />
                            <Sun className="size-4 hidden dark:inline" />
                        </span>
                    </Button>
                </DropdownMenuItem>
                {isSignedIn && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                            <Button variant="ghost" size="xs" className="w-full h-8 cursor-pointer justify-between" onClick={() => signOut({
                                redirectUrl: '/',
                            })}>
                                Log Out
                                <LogOut />
                            </Button>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}