
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
