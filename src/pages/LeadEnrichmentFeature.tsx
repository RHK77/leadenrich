
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const LeadEnrichmentFeature = () => {
  return (
    <FeatureDetail
      title="Lead Enrichment"
      icon="🔍"
      description="Our Lead Enrichment feature transforms basic contact information into comprehensive business intelligence. When you upload your lead data, our AI automatically searches for and appends detailed company information, market insights, social presence, and business context that would take hours to research manually. This enriched data allows for more targeted and personalized outreach."
      benefits={[
        "Save hours of manual research time with automated enrichment",
        "Discover hidden insights about your prospects' business challenges",
        "Identify key decision-makers and their roles within organizations",
        "Understand company technology stacks to better position your solution",
        "Learn about recent company news and developments for timely outreach",
        "Gain competitive intelligence to refine your sales approach"
      ]}
      useCases={[
        {
          title: "Sales Prospecting",
          description: "Quickly enrich cold leads with detailed company information to prioritize the most promising opportunities"
        },
        {
          title: "Account-Based Marketing",
          description: "Build comprehensive profiles of target accounts to create highly personalized marketing campaigns"
        },
        {
          title: "Market Research",
          description: "Gather industry-specific intelligence on companies within your target market segments"
        },
        {
          title: "Competitive Analysis",
          description: "Understand your prospects' current solutions and identify opportunities to position your offerings"
        },
        {
          title: "Content Marketing",
          description: "Develop relevant content based on the specific challenges facing your target companies"
        },
        {
          title: "Sales Intelligence",
          description: "Equip your sales team with detailed insights before initial conversations with prospects"
        }
      ]}
      testimonial={{
        quote: "The lead enrichment feature saved our sales team at least 5 hours per week of manual research. The quality of the enriched data is impressive and has significantly improved our conversion rates.",
        author: "Sarah Johnson",
        company: "VP of Sales, TechSolutions Inc."
      }}
    />
  );
};

export default LeadEnrichmentFeature;
