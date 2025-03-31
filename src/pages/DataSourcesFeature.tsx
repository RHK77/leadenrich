
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const DataSourcesFeature = () => {
  return (
    <FeatureDetail
      title="Multiple Data Sources"
      icon="📊"
      description="Our platform seamlessly integrates with a variety of data sources, allowing you to import lead information from wherever you store it. Whether you're working with CSV files, Excel spreadsheets, Notion databases, or Airtable, our system can connect to and extract the data you need. This flexibility eliminates the need for manual data entry and ensures you can leverage lead information from any tool in your existing workflow."
      benefits={[
        "Import leads directly from the tools you already use",
        "Eliminate time-consuming manual data entry and formatting",
        "Keep your data synchronized across multiple platforms",
        "Maintain data accuracy with automated field mapping",
        "Integrate with popular CRM systems for seamless workflows",
        "Centralize lead data from disparate sources for comprehensive analysis"
      ]}
      useCases={[
        {
          title: "CSV & Excel Import",
          description: "Easily upload spreadsheet files with your lead data for immediate processing and enrichment"
        },
        {
          title: "Notion Integration",
          description: "Connect your Notion databases to maintain updated lead information across both platforms"
        },
        {
          title: "Airtable Sync",
          description: "Import structured lead data from Airtable bases and return enriched information"
        },
        {
          title: "CRM Integration",
          description: "Connect with popular CRM systems to enrich existing lead records automatically"
        },
        {
          title: "Data Transformation",
          description: "Convert data between different formats to ensure compatibility with your tech stack"
        },
        {
          title: "Scheduled Imports",
          description: "Set up recurring data imports to keep your lead information fresh and up-to-date"
        }
      ]}
      testimonial={{
        quote: "Being able to connect our Notion database directly to the platform has been a game-changer. We no longer have to export and import files, and the data stays in sync automatically.",
        author: "Alex Rivera",
        company: "Operations Manager, Streamline Solutions"
      }}
    />
  );
};

export default DataSourcesFeature;
