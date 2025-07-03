
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import RegistryView from "./pages/RegistryView";
import CreateRegistryStep1 from "./pages/CreateRegistryStep1";
import CreateRegistryStep2 from "./pages/CreateRegistryStep2";
import CreateRegistryStep3 from "./pages/CreateRegistryStep3";
import GuestLanding from "./pages/GuestLanding";
import GuestBrowse from "./pages/GuestBrowse";
import GuestThankYou from "./pages/GuestThankYou";
import GuestPreview from "./components/GuestPreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
        <p className="text-body mb-4">Please refresh the page to try again.</p>
        <pre className="text-xs text-muted-foreground bg-muted p-2 rounded">
          {error.message}
        </pre>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/registry/:registryId" element={<RegistryView />} />
              <Route path="/create-registry" element={<CreateRegistryStep1 />} />
              <Route path="/create-registry/step2" element={<CreateRegistryStep2 />} />
              <Route path="/create-registry/step3" element={<CreateRegistryStep3 />} />
              <Route path="/guest/:registryId" element={<GuestLanding />} />
              <Route path="/guest/:registryId/browse" element={<GuestBrowse />} />
              <Route path="/guest/:registryId/thank-you" element={<GuestThankYou />} />
              <Route path="/demo" element={<GuestPreview />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
