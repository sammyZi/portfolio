import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-maze">
      <div className="text-center bg-card p-12 rounded-3xl border-4 border-primary shadow-xl">
        <h1 className="text-8xl font-heading font-bold mb-4 text-primary animate-pulse">404</h1>
        <p className="text-2xl font-mono text-card-foreground mb-8">Game Over! Page not found.</p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading font-bold rounded-xl">
          <a href="/">
            Insert Coin to Restart
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
