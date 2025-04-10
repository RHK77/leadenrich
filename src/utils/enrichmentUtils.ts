
import { supabase } from "@/integrations/supabase/client";
import { CompanyData, EnrichedCompany } from "@/types/upload";
import { toast } from "sonner";

export const enrichCompany = async (companyData: CompanyData): Promise<EnrichedCompany> => {
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

export const createBasicSampleData = (): EnrichedCompany => {
  return {
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
};
