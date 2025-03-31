
import React from "react";
import FeatureDetail from "@/components/FeatureDetail";

const DashboardFeature = () => {
  return (
    <FeatureDetail
      title="Interactive Dashboard"
      icon="📈"
      description="Our Interactive Dashboard provides a comprehensive overview of your lead enrichment and email generation activities. Track key metrics, monitor progress, and gain valuable insights through intuitive visualizations. The responsive design ensures you can access your data from any device, while real-time updates keep you informed of the latest developments. The dashboard serves as your command center for managing and optimizing your B2B outreach efforts."
      benefits={[
        "Track lead enrichment progress and completion rates at a glance",
        "Monitor email performance metrics including opens, replies, and conversions",
        "Identify trends and patterns in prospect engagement over time",
        "Receive insights and recommendations to improve your outreach strategy",
        "Customize dashboard views to focus on metrics that matter most to you",
        "Access your data from any device with responsive design"
      ]}
      useCases={[
        {
          title: "Performance Tracking",
          description: "Monitor key metrics and KPIs related to your lead enrichment and email outreach campaigns"
        },
        {
          title: "Campaign Analysis",
          description: "Analyze the performance of different messaging approaches across various prospect segments"
        },
        {
          title: "Resource Allocation",
          description: "Identify which lead sources and campaigns yield the best results to optimize resource allocation"
        },
        {
          title: "Team Reporting",
          description: "Generate comprehensive reports to share performance data with stakeholders and team members"
        },
        {
          title: "Process Optimization",
          description: "Identify bottlenecks in your lead processing workflow and make data-driven improvements"
        },
        {
          title: "ROI Calculation",
          description: "Calculate the return on investment for your lead enrichment and outreach activities"
        }
      ]}
      testimonial={{
        quote: "The dashboard gives me a bird's-eye view of our entire lead enrichment process. I can quickly see which campaigns are performing best and make adjustments in real-time.",
        author: "Jennifer Thompson",
        company: "CMO, InsightTech"
      }}
    />
  );
};

export default DashboardFeature;
