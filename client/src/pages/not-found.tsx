import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 border-none shadow-xl bg-card">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold font-display text-gray-900">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground font-sans">
              It seems you've ventured too far. This page doesn't exist.
            </p>

            <div className="mt-8">
              <Link href="/" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2">
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
