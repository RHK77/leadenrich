
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const AIEmailFeature = () => {
  return (
    <FeatureDetail
      title="Hemp Industry AI Email Generation"
      icon="✉️"
      description="Our Hemp Industry AI Email Generation feature leverages advanced artificial intelligence to create highly personalized outreach emails tailored to each hemp prospect. Using the enriched data from your leads, the system crafts compelling messages that address specific hemp industry pain points like regulatory compliance, banking restrictions, extraction efficiency, and quality control. Each email references relevant details about cultivation methods, certifications, and product offerings, dramatically increasing response rates from hemp businesses."
      benefits={[
        "Generate dozens of hemp-industry personalized emails in minutes instead of hours",
        "Create outreach that references specific compliance challenges and certification needs",
        "Improve email response rates with relevant, hemp-specific content",
        "Address unique hemp industry concerns like banking access, interstate commerce, and testing",
        "Test different approaches with AI-generated variations tailored to hemp businesses",
        "Reference appropriate industry terminology around cultivation, extraction, and product types"
      ]}
      useCases={[
        {
          title: "Hemp Processor Outreach",
          description: "Generate personalized initial emails that address specific extraction methods and efficiency concerns"
        },
        {
          title: "Compliance Solution Marketing",
          description: "Create contextual emails that highlight how your solutions address specific state compliance requirements"
        },
        {
          title: "Hemp Testing Lab Partnerships",
          description: "Craft personalized messages to different hemp companies based on their testing needs and product types"
        },
        {
          title: "Industry Event Invitations",
          description: "Generate compelling hemp conference or webinar invitations that explain relevance to each prospect's specific situation"
        },
        {
          title: "Hemp Equipment Sales",
          description: "Create targeted announcements that emphasize how equipment features solve specific hemp cultivation or processing challenges"
        },
        {
          title: "Sustainability Messaging",
          description: "Develop personalized messages that connect your sustainable solutions with each hemp company's existing practices"
        }
      ]}
      testimonial={{
        quote: "The AI-generated emails are remarkably knowledgeable about hemp industry specifics - they reference cultivation methods, extract types, and compliance challenges that resonate with our prospects. Our response rates have increased by 42% since implementing this feature.",
        author: "Sarah Wilson",
        company: "Marketing Director, Hemp Industry Association"
      }}
    />
  );
};

export default AIEmailFeature;
