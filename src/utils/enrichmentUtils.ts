
import { supabase } from "@/integrations/supabase/client";
import { CompanyData, EnrichedCompany } from "@/types/upload";
import { toast } from "sonner";

export const enrichCompany = async (companyData: CompanyData): Promise<EnrichedCompany> => {
  try {
    const { data, error } = await supabase.functions.invoke('enrich-leads', {
      body: {
        companyName: companyData.company_name,
        website: companyData.website || "",
        additionalInfo: `${companyData.industry || "Hemp"} ${companyData.location || ""} ${companyData.size || ""}`,
        industry: "Hemp"
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
    company_name: "Hemp Innovations",
    website: "hempinnovations.com",
    industry: "Hemp",
    size: "50-100",
    location: "Colorado, USA",
    status: "completed",
    enrichment: {
      description: "Hemp Innovations specializes in sustainable hemp cultivation and premium CBD product manufacturing.",
      productsServices: ["CBD Oil", "Hemp Textiles", "Hemp-based Construction Materials", "Organic Hemp Seeds"],
      industryChallenges: ["Regulatory compliance", "Banking restrictions", "Public misconceptions", "Supply chain issues"],
      recentNews: "Recently received organic certification for their entire hemp seed line.",
      painPoints: ["Interstate commerce restrictions", "Lab testing costs", "Marketing limitations"],
      hempSpecific: {
        cultivationMethods: ["Organic", "Regenerative", "No-till"],
        certifications: ["USDA Organic", "Non-GMO Project Verified", "Good Manufacturing Practices"],
        thcContent: "<0.3% THC",
        cbdContent: "Full spectrum CBD products with 15-25% concentration",
        productsOffered: ["CBD oils", "Topicals", "Hemp fiber", "Hemp seeds", "Construction materials"],
        extractionMethods: ["CO2 extraction", "Ethanol extraction"],
        sustainabilityPractices: ["Solar-powered processing", "Water recycling", "Biodegradable packaging"],
        stateCompliance: "Fully compliant with Colorado state regulations"
      }
    },
    email: `Subject: Sustainable Hemp Solutions for Your Growing Operation

Dear Hemp Innovations Team,

I noticed your recent organic certification achievement for your hemp seed line - congratulations! As fellow participants in the hemp industry, we understand the challenges of maintaining high-quality standards while navigating complex regulations.

Your focus on sustainable cultivation methods aligns perfectly with our services that help hemp businesses streamline compliance processes while reducing overhead costs. Many of our clients have found our solutions particularly helpful with interstate commerce documentation and automated testing compliance.

Would you be open to a 15-minute conversation this week to discuss how we might support your impressive growth in the Colorado market?

Best regards,
[Your Name]
[Your Company]
[Contact Information]`
  };
};
