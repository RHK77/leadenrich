
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

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
    
    // Simulate processing
    setTimeout(() => {
      // Mock results for demonstration
      const mockResults = [
        {
          company_name: "Acme Corp",
          website: "acme.com",
          industry: "Manufacturing",
          size: "500-1000",
          location: "New York, USA",
          status: "completed",
          enrichment: {
            description: "Acme Corporation manufactures a wide range of products including innovative gadgets and equipment for various industries.",
            productsServices: ["Industrial equipment", "Safety products", "Consumer gadgets"],
            industryChallenges: ["Supply chain disruptions", "Raw material costs", "Environmental regulations"],
            recentNews: "Recently expanded their East Coast operations with a new manufacturing facility.",
            painPoints: ["Inventory management", "Legacy systems integration", "Customer acquisition costs"]
          },
          email: `Subject: Streamlining Manufacturing Processes at Acme Corp

Dear Acme Corp Team,

I hope this email finds you well. I've been following Acme's recent expansion on the East Coast and was impressed by your commitment to growth despite the current supply chain challenges in the manufacturing sector.

With your range of industrial equipment and safety products, I believe we have solutions that could help address some of your inventory management challenges while reducing operational costs.

Would you be available for a 15-minute call this week to discuss how our services have helped similar manufacturers improve efficiency by 23% on average?

Looking forward to connecting,

[Your Name]
[Your Company]
[Contact Information]`
        },
        {
          company_name: "TechSolutions Inc",
          website: "techsolutions.com",
          industry: "Software",
          size: "100-500",
          location: "San Francisco, USA",
          status: "completed",
          enrichment: {
            description: "TechSolutions develops software solutions for business process automation and data analytics.",
            productsServices: ["CRM software", "Data analytics platform", "Automation tools"],
            industryChallenges: ["Rapid technological change", "Talent acquisition", "Cybersecurity threats"],
            recentNews: "Recently launched a new AI-powered analytics platform.",
            painPoints: ["High customer acquisition costs", "Technical debt", "Integration with legacy systems"]
          },
          email: `Subject: Enhancing Your AI Analytics Capabilities

Dear TechSolutions Team,

Congratulations on the recent launch of your AI-powered analytics platform! As the software industry continues to evolve rapidly, staying ahead with innovative solutions is crucial.

I noticed that TechSolutions has been making significant strides in data analytics and automation tools. Our platform might complement your offerings by providing enhanced integration capabilities that address the common challenge of connecting with legacy systems.

Would you be open to a brief discussion about how we might collaborate to solve some of the technical debt and integration challenges your customers face?

Best regards,

[Your Name]
[Your Company]
[Contact Information]`
        }
      ];
      
      setIsLoading(false);
      decrementLeadCount();
      onProcessComplete(mockResults);
      toast.success("Processing complete!");
    }, 3000);
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
