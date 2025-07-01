
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import WelcomeHero from "@/components/WelcomeHero";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  console.log("Index component - user:", user, "loading:", loading);

  useEffect(() => {
    console.log("Index useEffect - user:", user, "loading:", loading);
    if (!loading && user) {
      console.log("Redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    console.log("Index - showing loading screen");
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-body">Loading...</p>
        </div>
      </div>
    );
  }

  console.log("Index - showing WelcomeHero");
  return <WelcomeHero />;
};

export default Index;
