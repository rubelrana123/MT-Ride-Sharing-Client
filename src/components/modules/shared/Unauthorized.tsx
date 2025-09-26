// src/pages/UnauthorizedPage.tsx
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold font-ride-title">Access Denied</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        You do not have the necessary permissions to view this page. Please
        contact an administrator if you believe this is an error.
      </p>
      <div className="flex items-center gap-3">
          <Button asChild className="mt-6">
            <Link to="/">Go to Homepage</Link>
          </Button>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/">Contact Support</Link>
          </Button>
      </div>
    </div>
  );
}