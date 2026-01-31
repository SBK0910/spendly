export default function Footer() {
    return (
        <footer className="py-8">
            <div className="text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Spendly. All rights reserved.
            </div>
        </footer>
    );
}