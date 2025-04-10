
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';

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

  const enrichCompany = async (companyData: {
    company_name: string;
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
  }) => {
    try {
      const { data, error } = await supabase.functions.invoke('enrich-leads', {
        body: {
          companyName: companyData.company_name,
          website: companyData.website || "",
          additionalInfo: `${companyData.industry || ""} ${companyData.location || ""} ${companyData.size || ""}`
        }
      });

      if (error) {
        console.error("Error calling enrich-leads function:", error);
        throw new Error(`Enrichment failed: ${error.message}`);
      }

      console.log("Enrichment data received:", data);
      return data;
    } catch (error) {
      console.error("Error in enrichCompany:", error);
      throw error;
    }
  };

  const processData = async () => {
    if (!checkLeadLimit()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (!selectedFile && !notionUrl && !airtableUrl) {
        toast.info("Getting sample data from OpenAI...");
        
        try {
          const sampleData = await enrichCompany({ 
            company_name: "Microsoft",
            website: "microsoft.com"
          });
          
          decrementLeadCount();
          onProcessComplete([sampleData]);
          toast.success("Sample data processed with AI!");
        } catch (error) {
          console.error("Error processing sample data:", error);
          toast.error("Failed to process sample data with AI. Falling back to basic sample.");
          
          const basicSample = {
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
          };
          
          decrementLeadCount();
          onProcessComplete([basicSample]);
        }
        
        return;
      }
      
      if (selectedFile) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          try {
            const fileContent = e.target?.result;
            if (!fileContent) {
              throw new Error("Failed to read file");
            }
            
            console.log("File content type:", typeof fileContent);
            console.log("File content preview:", String(fileContent).substring(0, 200));

            const lines = String(fileContent).split(/\r?\n/);
            console.log(`Found ${lines.length} lines in the file`);
            
            if (lines.length < 2) {
              throw new Error("File contains insufficient data (needs header row + at least one data row)");
            }
            
            let delimiter = ',';
            if (lines[0].includes(';')) {
              delimiter = ';';
            }
            
            const headers = lines[0].split(delimiter).map(h => h.trim().toLowerCase());
            console.log("Detected headers:", headers);
            
            const companiesData = [];
            let validCompaniesFound = false;
            
            for (let i = 1; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) continue;
              
              const values = line.split(delimiter).map(v => v.trim());
              if (values.length < 2) continue;
              
              const company: Record<string, string> = {};
              
              headers.forEach((header, index) => {
                if (values[index]) {
                  company[header] = values[index];
                }
              });
              
              let companyName = '';
              const possibleNameFields = ['company_name', 'company', 'name', 'organization', 'business', 'corp', 'corporation'];
              
              for (const field of possibleNameFields) {
                if (company[field]) {
                  companyName = company[field];
                  break;
                }
              }
              
              if (!companyName) {
                const firstNonEmptyKey = Object.keys(company).find(key => company[key] && company[key].length > 1);
                if (firstNonEmptyKey) {
                  companyName = company[firstNonEmptyKey];
                  console.log(`Using ${firstNonEmptyKey} as company name:`, companyName);
                }
              }
              
              if (companyName) {
                validCompaniesFound = true;
                
                const website = company.website || company.url || company.site || "";
                const industry = company.industry || company.sector || company.vertical || "";
                const size = company.size || company.employees || company.employee_count || "";
                const location = company.location || company.address || company.city || "";
                
                companiesData.push({
                  company_name: companyName,
                  website,
                  industry,
                  size,
                  location
                });
              }
            }
            
            if (!validCompaniesFound) {
              console.log("No companies found. Headers:", headers);
              console.log("Sample data row:", lines.length > 1 ? lines[1] : "No data rows");
              throw new Error("No valid company data found in file. Please ensure your file has headers and company information.");
            }

            const enrichedResults = [];
            const batchSize = 3;
            
            for (let i = 0; i < companiesData.length; i += batchSize) {
              const batch = companiesData.slice(i, i + batchSize);
              
              const batchPromises = batch.map(async (company) => {
                try {
                  toast.info(`Researching: ${company.company_name}`);
                  return await enrichCompany(company);
                } catch (error) {
                  console.error(`Error enriching ${company.company_name}:`, error);
                  return {
                    company_name: company.company_name,
                    website: company.website || "",
                    industry: company.industry || "",
                    size: company.size || "",
                    location: company.location || "",
                    status: "partial",
                    enrichment: {
                      description: `${company.company_name} is a company that may operate in the ${company.industry || 'business'} sector.`,
                      productsServices: ["Products/services information unavailable"],
                      industryChallenges: ["Industry challenges information unavailable"],
                      recentNews: "No recent news available",
                      painPoints: ["Specific pain points information unavailable"]
                    },
                    email: `Subject: Introduction and Potential Collaboration\n\nDear ${company.company_name} Team,\n\nI recently came across your company and was interested in learning more about your work. I believe there might be opportunities for us to collaborate on solutions that could benefit your business.\n\nWould you be available for a brief conversation to explore potential synergies between our organizations?\n\nBest regards,\n[Your Name]\n[Your Company]\n[Contact Information]`
                  };
                }
              });
              
              const batchResults = await Promise.all(batchPromises);
              enrichedResults.push(...batchResults);
              
              toast.info(`Processed ${Math.min((i + batchSize), companiesData.length)} of ${companiesData.length} companies`);
            }
            
            decrementLeadCount();
            onProcessComplete(enrichedResults);
            toast.success(`Successfully enriched ${enrichedResults.length} companies!`);
            
          } catch (error) {
            console.error("Error processing file:", error);
            toast.error(error instanceof Error ? error.message : "Failed to process file. Please check the format.");
          } finally {
            setIsLoading(false);
          }
        };
        
        reader.onerror = () => {
          toast.error("Failed to read file");
          setIsLoading(false);
        };
        
        reader.readAsText(selectedFile);
        
      } else if (notionUrl) {
        toast.info("Processing Notion database...");
        
        try {
          const sampleCompany = {
            company_name: "Notion, Inc",
            website: "notion.so"
          };
          
          const enrichedData = await enrichCompany(sampleCompany);
          
          decrementLeadCount();
          onProcessComplete([enrichedData]);
          toast.success("Successfully processed Notion data!");
          
        } catch (error) {
          console.error("Error processing Notion URL:", error);
          toast.error("Failed to process Notion database. Please check the URL and try again.");
          setIsLoading(false);
        }
        
      } else if (airtableUrl) {
        toast.info("Processing Airtable base...");
        
        try {
          const sampleCompany = {
            company_name: "Airtable",
            website: "airtable.com"
          };
          
          const enrichedData = await enrichCompany(sampleCompany);
          
          decrementLeadCount();
          onProcessComplete([enrichedData]);
          toast.success("Successfully processed Airtable data!");
          
        } catch (error) {
          console.error("Error processing Airtable URL:", error);
          toast.error("Failed to process Airtable base. Please check the URL and try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        toast.error("No data source selected");
      }
      
    } catch (error) {
      console.error("Error in processData:", error);
      toast.error("An error occurred while processing your data");
      setIsLoading(false);
    }
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
