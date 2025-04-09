
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ApiClient } from "@/utils/apiClient";

type UploadResults = any[];

interface UploadContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  notionUrl: string;
  setNotionUrl: (url: string) => void;
  airtableUrl: string;
  setAirtableUrl: (url: string) => void;
  processData: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ 
  children, 
  onProcessComplete 
}: { 
  children: ReactNode;
  onProcessComplete: (results: UploadResults) => void;
}) => {
  const { checkLeadLimit, decrementLeadCount } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notionUrl, setNotionUrl] = useState("");
  const [airtableUrl, setAirtableUrl] = useState("");

  const processData = async () => {
    if (!checkLeadLimit()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // If using sample data (no file selected)
      if (!selectedFile) {
        // Get sample data from API
        const mockResults = [
          {
            company_name: "Sample Corp",
            website: "samplecorp.com",
            industry: "Technology",
            size: "100-500",
            location: "San Francisco, USA",
            status: "completed",
            enrichment: {
              description: "Sample Corp provides innovative technology solutions.",
              productsServices: ["Cloud services", "Software development", "Consulting"],
              industryChallenges: ["Rapid technological change", "Talent acquisition"],
              recentNews: "Recently launched a new cloud platform.",
              painPoints: ["Customer retention", "Market competition"]
            },
            email: `Subject: Enhancing Your Cloud Platform Services

Dear Sample Corp Team,

I noticed your recent cloud platform launch and wanted to connect about how our solutions might help with customer retention challenges in the competitive tech market.

Would you be available for a 15-minute call this week?

Best regards,
[Your Name]`
          }
        ];
        
        decrementLeadCount();
        onProcessComplete(mockResults);
        toast.success("Sample data loaded!");
        return;
      }
      
      // Process actual file upload
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Use the API client to send the request
      const apiKey = ApiClient.getApiKey();
      if (!apiKey) {
        toast.error("API key not set. Please set your API key first.");
        setIsLoading(false);
        return;
      }
      
      // Read the file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const fileContent = e.target?.result;
          if (!fileContent) {
            throw new Error("Failed to read file");
          }
          
          // Parse CSV/Excel file content (simplified for now)
          const lines = String(fileContent).split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          
          // Extract company data from file
          const results = [];
          for (let i = 1; i < Math.min(lines.length, 10); i++) {
            if (!lines[i].trim()) continue;
            
            const values = lines[i].split(',').map(v => v.trim());
            const company: Record<string, string> = {};
            
            headers.forEach((header, index) => {
              if (values[index]) {
                company[header] = values[index];
              }
            });
            
            // Ensure we have a company name at minimum
            if (company.company_name || company.name || company.organization) {
              const companyName = company.company_name || company.name || company.organization;
              
              // Create enrichment data based on actual company info
              results.push({
                company_name: companyName,
                website: company.website || company.url || `${companyName.toLowerCase().replace(/\s/g, '')}.com`,
                industry: company.industry || company.sector || "Unknown",
                size: company.size || company.employees || "Unknown",
                location: company.location || company.address || "Unknown",
                status: "completed",
                enrichment: {
                  description: `${companyName} is a company operating in the ${company.industry || "unknown"} industry.`,
                  productsServices: [company.products || company.services || "Various products/services"],
                  industryChallenges: ["Market competition", "Customer acquisition"],
                  recentNews: company.news || "No recent news available.",
                  painPoints: ["Efficiency", "Growth", "Customer retention"]
                },
                email: generateEmail(companyName, company.industry || "unknown")
              });
            }
          }
          
          if (results.length === 0) {
            throw new Error("No valid company data found in file");
          }
          
          decrementLeadCount();
          onProcessComplete(results);
          toast.success(`Processed ${results.length} companies from your data!`);
        } catch (error) {
          console.error("Error processing file:", error);
          toast.error("Failed to process file. Please check the format.");
        } finally {
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file");
        setIsLoading(false);
      };
      
      // Start reading the file as text
      reader.readAsText(selectedFile);
      
    } catch (error) {
      console.error("Error in processData:", error);
      toast.error("An error occurred while processing your data");
      setIsLoading(false);
    }
  };
  
  // Helper function to generate email templates
  const generateEmail = (companyName: string, industry: string): string => {
    return `Subject: Helping ${companyName} Address Challenges in the ${industry} Industry

Dear ${companyName} Team,

I've been researching companies in the ${industry} industry and was particularly impressed by ${companyName}'s approach to the market.

Given the current challenges in your industry, I believe our solutions could help you improve efficiency and customer retention while supporting your growth goals.

Would you be open to a brief discussion about how we've helped similar companies in the ${industry} space?

Best regards,
[Your Name]
[Your Company]
[Contact Information]`;
  };

  return (
    <UploadContext.Provider 
      value={{ 
        isLoading, 
        setIsLoading,
        selectedFile, 
        setSelectedFile,
        notionUrl,
        setNotionUrl,
        airtableUrl,
        setAirtableUrl,
        processData
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  
  return context;
};
