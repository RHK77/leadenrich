
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const ExportOptionsFeature = () => {
  return (
    <FeatureDetail
      title="Export Options"
      icon="💾"
      description="Our flexible Export Options allow you to seamlessly integrate enriched leads and generated emails into your existing workflow. Download your data in multiple formats including CSV, Excel, JSON, and PDF, or send it directly to integrated platforms like CRMs, email marketing tools, and more. This flexibility ensures that the valuable data you generate can be immediately put to use in whatever systems your team already employs, without complicated manual transfers or reformatting."
      benefits={[
        "Download enriched data in multiple formats (CSV, Excel, JSON, PDF)",
        "Export generated emails directly to your email marketing platform",
        "Integrate enriched lead data with your CRM system",
        "Create custom export templates for specific data needs",
        "Schedule automated exports to keep external systems updated",
        "Maintain data structure and relationships during export"
      ]}
      useCases={[
        {
          title: "CRM Integration",
          description: "Export enriched lead data directly to popular CRM systems to enhance your sales database"
        },
        {
          title: "Email Campaign Setup",
          description: "Transfer generated emails to email marketing platforms for immediate campaign deployment"
        },
        {
          title: "Reporting & Analysis",
          description: "Export structured data for deeper analysis in business intelligence tools"
        },
        {
          title: "Team Collaboration",
          description: "Share enriched lead information with team members in their preferred format"
        },
        {
          title: "Process Automation",
          description: "Set up scheduled exports to automate your lead processing workflow"
        },
        {
          title: "Data Backup",
          description: "Create regular backups of your enriched data for security and compliance purposes"
        }
      ]}
      testimonial={{
        quote: "The ability to export directly to our CRM has streamlined our entire process. What used to take hours of manual data entry now happens at the click of a button. Game-changer!",
        author: "Emma Wilson",
        company: "Operations Lead, SalesDrive"
      }}
    />
  );
};

export default ExportOptionsFeature;
