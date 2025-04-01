
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import PricingPlans from "./pages/PricingPlans";
import Features from "./pages/Features";

// Feature detail pages
import LeadEnrichmentFeature from "./pages/LeadEnrichmentFeature";
import AIEmailFeature from "./pages/AIEmailFeature";
import DataSourcesFeature from "./pages/DataSourcesFeature";
import DashboardFeature from "./pages/DashboardFeature";
import FreeTrialFeature from "./pages/FreeTrialFeature";
import ExportOptionsFeature from "./pages/ExportOptionsFeature";

const queryClient = new QueryClient();

// Routes that need authentication
const ProtectedRoutes = () => {
  return <Outlet />;
};

// Routes that need AuthContext but don't require authentication
const AuthRoutes = () => {
  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth routes (Login, Signup) */}
            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<PricingPlans />} />
            
            {/* Feature detail pages */}
            <Route path="/feature/lead-enrichment" element={<LeadEnrichmentFeature />} />
            <Route path="/feature/ai-email" element={<AIEmailFeature />} />
            <Route path="/feature/data-sources" element={<DataSourcesFeature />} />
            <Route path="/feature/dashboard" element={<DashboardFeature />} />
            <Route path="/feature/free-trial" element={<FreeTrialFeature />} />
            <Route path="/feature/export-options" element={<ExportOptionsFeature />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
