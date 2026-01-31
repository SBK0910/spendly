import ContinueWithGoogle from "@/components/common/ContinueWithGoogle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center space-y-1">
                        <CardTitle className="text-lg md:text-xl">Welcome Back</CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                            Sign in to manage your expenses and track your spending
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 flex flex-col items-center">
                        <ContinueWithGoogle />
                        <div className="text-center text-xs text-muted-foreground">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
