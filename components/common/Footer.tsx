export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 py-4 bg-background">
            <div className="text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Spendly. All rights reserved.
            </div>
        </footer>
    );
}