
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WelcomeHero from "@/components/WelcomeHero";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [hasNavigated, setHasNavigated] = useState(false);

  console.log("Index component - user:", user, "loading:", loading);

  useEffect(() => {
    console.log("Index useEffect - user:", user, "loading:", loading, "hasNavigated:", hasNavigated);
    
    if (!loading && user && !hasNavigated) {
      console.log("Redirecting to dashboard");
      setHasNavigated(true);
      navigate("/dashboard");
    }
  }, [user, loading, navigate, hasNavigated]);

  // Force show content after a timeout to prevent infinite white screen
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Force timeout - showing content");
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  if (loading) {
    console.log("Index - showing loading screen");
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Loading...</p>
          <p className="text-xs text-muted-foreground mt-2">
            If this takes too long, there might be a configuration issue.
          </p>
        </div>
      </div>
    );
  }

  console.log("Index - showing WelcomeHero");
  return <WelcomeHero />;
};

export default Index;
