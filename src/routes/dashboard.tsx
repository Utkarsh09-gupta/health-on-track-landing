import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RedirectToHome,
});

function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/" });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">Moving to Unified Experience...</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Health On Track has been unified onto the root URL. Redirecting to home...
        </p>
      </div>
    </div>
  );
}
