
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const FreeTrialFeature = () => {
  return (
    <FeatureDetail
      title="Free Trial"
      icon="🎁"
      description="Our Free Trial gives you complete access to the platform's capabilities with 10 lead enrichments and email generations at no cost. Experience the full power of our AI-driven lead enrichment and personalized email generation before making a commitment. We believe in our product's value so much that we let you try it with real leads from your business. There's no risk, no credit card required, and no obligations - just pure value to help you improve your B2B outreach."
      benefits={[
        "Experience the full platform capabilities with 10 free lead enrichments",
        "No credit card required to start your trial",
        "Generate actual personalized emails for your real prospects",
        "Evaluate the quality of enriched data with your own lead information",
        "Access all features and integrations during the trial period",
        "Seamlessly upgrade to a paid plan when you're ready without losing your data"
      ]}
      useCases={[
        {
          title: "Risk-Free Evaluation",
          description: "Test the platform with your actual lead data to see the quality of enrichment before committing"
        },
        {
          title: "Proof of Concept",
          description: "Generate concrete examples to demonstrate value to stakeholders within your organization"
        },
        {
          title: "Team Training",
          description: "Use the trial period to familiarize your team with the platform's capabilities and workflows"
        },
        {
          title: "Workflow Integration",
          description: "Evaluate how the platform fits into your existing sales and marketing processes"
        },
        {
          title: "Quality Assessment",
          description: "Compare the AI-generated content with your current manual processes to measure improvement"
        },
        {
          title: "ROI Calculation",
          description: "Calculate potential time savings and conversion improvements based on trial results"
        }
      ]}
      testimonial={{
        quote: "We were skeptical at first, but the free trial convinced us. The quality of the enriched data and personalized emails exceeded our expectations, and we upgraded to the Pro plan within three days.",
        author: "David Rodriguez",
        company: "Sales Director, Enterprise Solutions"
      }}
    />
  );
};

export default FreeTrialFeature;
