
import { useState } from 'react';
import { toast } from 'sonner';
import { CompanyData, EnrichedCompany, UploadResults } from '@/types/upload';
import { enrichCompany, createBasicSampleData } from '@/utils/enrichmentUtils';
import { processFileContent } from '@/utils/fileProcessingUtils';

interface UseFileProcessorProps {
  onProcessComplete: (results: UploadResults) => void;
}

export const useFileProcessor = ({ 
  onProcessComplete
}: UseFileProcessorProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const processFileData = async (file: File): Promise<void> => {
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const fileContent = e.target?.result;
          if (!fileContent) {
            throw new Error("Failed to read file");
          }
          
          const companiesData = processFileContent(String(fileContent));
          await processCompaniesData(companiesData);
          
        } catch (error) {
          console.error("Error processing file:", error);
          toast.error(error instanceof Error ? error.message : "Failed to process file. Please check the format.");
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file");
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error("Error in processFileData:", error);
      toast.error("An error occurred while processing your file");
      setIsLoading(false);
    }
  };

  const processCompaniesData = async (companiesData: CompanyData[]): Promise<void> => {
    try {
      const enrichedResults: EnrichedCompany[] = [];
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
              industry: company.industry || "Hemp",
              size: company.size || "",
              location: company.location || "",
              status: "partial",
              enrichment: {
                description: `${company.company_name} is a company in the hemp industry.`,
                productsServices: ["Hemp products"],
                industryChallenges: ["Regulatory compliance", "Banking restrictions"],
                recentNews: "No recent news available",
                painPoints: ["Regulatory uncertainty"],
                hempSpecific: {
                  stateCompliance: "Unknown compliance status",
                  thcContent: "<0.3% THC (presumed for compliance)",
                  productsOffered: ["Hemp products"]
                }
              },
              email: `Subject: Hemp Industry Solutions - Connecting with ${company.company_name}\n\nDear ${company.company_name} Team,\n\nAs fellow professionals in the hemp industry, I understand the challenges of navigating the current regulatory landscape while trying to grow a successful business.\n\nI'd love to learn more about your specific operations and discuss how our solutions might help address some of the common challenges in the industry, particularly around compliance and scaling production.\n\nWould you be open to a brief conversation this week?\n\nBest regards,\n[Your Name]\n[Your Company]\n[Contact Information]`
            };
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        enrichedResults.push(...batchResults);
        
        toast.info(`Processed ${Math.min((i + batchSize), companiesData.length)} of ${companiesData.length} companies`);
      }
      
      onProcessComplete(enrichedResults);
      toast.success(`Successfully enriched ${enrichedResults.length} companies!`);
    } catch (error) {
      console.error("Error processing companies data:", error);
      toast.error("Failed to process company data");
    } finally {
      setIsLoading(false);
    }
  };

  const processSampleData = async (): Promise<void> => {
    setIsLoading(true);
    toast.info("Getting sample hemp industry data...");
    
    try {
      const sampleData = await enrichCompany({ 
        company_name: "Colorado Hemp Solutions",
        website: "coloradohempsolutions.com",
        industry: "Hemp"
      });
      
      onProcessComplete([sampleData]);
      toast.success("Sample hemp data processed!");
    } catch (error) {
      console.error("Error processing sample data:", error);
      toast.error("Failed to process sample data with AI. Falling back to basic sample.");
      
      const basicSample = createBasicSampleData();
      
      onProcessComplete([basicSample]);
    } finally {
      setIsLoading(false);
    }
  };

  const processExternalData = async (source: string, url: string): Promise<void> => {
    setIsLoading(true);
    toast.info(`Processing ${source} data...`);
    
    try {
      const sampleCompany = {
        company_name: source,
        website: url.includes("notion") ? "notion.so/hemp-database" : "airtable.com/hemp-catalog",
        industry: "Hemp"
      };
      
      const enrichedData = await enrichCompany(sampleCompany);
      
      onProcessComplete([enrichedData]);
      toast.success(`Successfully processed ${source} data!`);
    } catch (error) {
      console.error(`Error processing ${source} URL:`, error);
      toast.error(`Failed to process ${source} data. Please check the URL and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    processFileData,
    processSampleData,
    processExternalData
  };
};
