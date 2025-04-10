import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WorkflowDiagram from "@/components/dashboard/WorkflowDiagram";
import WorkflowSteps from "@/components/dashboard/WorkflowSteps";
import FileUpload from "@/components/dashboard/FileUpload";
import ResultsDisplay from "@/components/dashboard/ResultsDisplay";
import ProfileSettings from "@/components/ProfileSettings";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in - only once, not in a loop
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(isLoggedIn);
    
    if (!isLoggedIn) {
      toast.error("Please log in to access the dashboard");
      navigate("/login");
    }
  }, [navigate]); // Only run once when component mounts
  
  const handleProcessComplete = (processedResults: any[]) => {
    setResults(processedResults);
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Upload your CSV data and generate personalized B2B emails
        </p>
        
        <Tabs defaultValue="workflow">
          <TabsList className="mb-6">
            <TabsTrigger value="workflow">Lead Enrichment</TabsTrigger>
            <TabsTrigger value="profile">Your Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workflow">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <WorkflowDiagram />
              </div>
              <div>
                <WorkflowSteps />
              </div>
            </div>
            
            <div className="mb-8">
              <FileUpload onProcessComplete={handleProcessComplete} />
            </div>
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">Processing your data with AI...</p>
              </div>
            )}
            
            {results.length > 0 && (
              <div>
                <ResultsDisplay results={results} />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <div className="max-w-md mx-auto">
              <ProfileSettings />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
