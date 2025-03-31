
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const AIEmailFeature = () => {
  return (
    <FeatureDetail
      title="AI Email Generation"
      icon="✉️"
      description="Our AI Email Generation feature leverages advanced artificial intelligence to create highly personalized outreach emails tailored to each prospect. Using the enriched data from your leads, the system crafts compelling messages that address specific pain points, reference relevant industry challenges, and position your solution in the most effective way possible. Each email feels like it was written specifically for the recipient, dramatically increasing response rates."
      benefits={[
        "Generate dozens of personalized emails in minutes instead of hours",
        "Create outreach that references specific company challenges and needs",
        "Improve email response rates with relevant, personalized content",
        "Maintain consistent messaging while personalizing at scale",
        "Test different approaches with AI-generated variations",
        "Eliminate writer's block with intelligent suggestions and templates"
      ]}
      useCases={[
        {
          title: "Cold Outreach",
          description: "Generate personalized initial emails that stand out in crowded inboxes by addressing specific business challenges"
        },
        {
          title: "Follow-up Sequences",
          description: "Create contextual follow-up emails that build on previous interactions and provide additional value"
        },
        {
          title: "Account Expansions",
          description: "Craft personalized messages to different stakeholders within existing customer organizations"
        },
        {
          title: "Event Invitations",
          description: "Generate compelling invitations that explain why your event is relevant to each prospect's specific situation"
        },
        {
          title: "Product Announcements",
          description: "Create targeted announcements that emphasize features most relevant to each recipient's needs"
        },
        {
          title: "Reengagement Campaigns",
          description: "Develop personalized messages that reconnect with dormant leads based on their current situation"
        }
      ]}
      testimonial={{
        quote: "The AI-generated emails are remarkably good - they sound natural and reference specific aspects of our prospects' businesses. We've seen our response rates increase by 37% since implementing this feature.",
        author: "Michael Chen",
        company: "Marketing Director, GrowthWorks"
      }}
    />
  );
};

export default AIEmailFeature;
