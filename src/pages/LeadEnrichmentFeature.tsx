
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const LeadEnrichmentFeature = () => {
  return (
    <FeatureDetail
      title="Hemp Industry Lead Enrichment"
      icon="🌿"
      description="Our Hemp Industry Lead Enrichment feature transforms basic contact information into comprehensive business intelligence tailored specifically for hemp companies. When you upload your lead data, our AI automatically researches and appends detailed company information, cultivation methods, certifications, products offered, extraction methods, and compliance status - information that would take hours to research manually. This enriched data enables highly targeted and personalized outreach to hemp industry prospects."
      benefits={[
        "Save hours of manual research time with automated hemp-specific enrichment",
        "Discover detailed insights about cultivation methods and product offerings",
        "Identify key compliance status and certifications within the hemp industry",
        "Understand extraction methods and technical specifications of products",
        "Learn about recent company news and developments for timely outreach",
        "Gain competitive intelligence to refine your hemp industry sales approach"
      ]}
      useCases={[
        {
          title: "Hemp Supplier Prospecting",
          description: "Quickly enrich hemp grower and processor leads with detailed information to prioritize the most promising partnership opportunities"
        },
        {
          title: "Hemp Industry Market Research",
          description: "Gather industry-specific intelligence on hemp companies within your target market segments"
        },
        {
          title: "Regulatory Compliance Analysis",
          description: "Understand which hemp companies meet specific state compliance standards and certifications"
        },
        {
          title: "Product Development Intelligence",
          description: "Research competitor hemp product offerings to identify market gaps and opportunities"
        },
        {
          title: "Hemp Supply Chain Optimization",
          description: "Identify potential suppliers and partners based on their specific cultivation and processing capabilities"
        },
        {
          title: "Industry Networking",
          description: "Prepare for hemp industry events with detailed background on potential contacts"
        }
      ]}
      testimonial={{
        quote: "The hemp-specific enrichment data provided insights we wouldn't have discovered through standard research. Understanding our prospects' extraction methods and certifications before our first call has dramatically improved our conversion rates.",
        author: "Michael Johnson",
        company: "Colorado Hemp Solutions"
      }}
    />
  );
};

export default LeadEnrichmentFeature;
