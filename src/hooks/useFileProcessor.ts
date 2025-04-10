
import { useState } from 'react';
import { toast } from 'sonner';
import { CompanyData, EnrichedCompany, UploadResults } from '@/types/upload';
import { enrichCompany, createBasicSampleData } from '@/utils/enrichmentUtils';
import { processFileContent } from '@/utils/fileProcessingUtils';

interface UseFileProcessorProps {
  decrementLeadCount: () => void;
  onProcessComplete: (results: UploadResults) => void;
}

export const useFileProcessor = ({ 
  decrementLeadCount, 
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
      console.error("Error processing companies data:", error);
      toast.error("Failed to process company data");
    } finally {
      setIsLoading(false);
    }
  };

  const processSampleData = async (): Promise<void> => {
    setIsLoading(true);
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
      
      const basicSample = createBasicSampleData();
      
      decrementLeadCount();
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
        website: source === "Notion, Inc" ? "notion.so" : "airtable.com"
      };
      
      const enrichedData = await enrichCompany(sampleCompany);
      
      decrementLeadCount();
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
