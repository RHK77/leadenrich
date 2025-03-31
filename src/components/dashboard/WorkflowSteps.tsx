
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Upload CSV Data",
    description: "Upload your company data CSV file",
  },
  {
    number: 2,
    title: "Data Processing",
    description: "System reads and validates the data",
  },
  {
    number: 3,
    title: "AI Enrichment",
    description: "OpenAI enriches the company information",
  },
  {
    number: 4,
    title: "Email Generation",
    description: "Personalized B2B emails are created",
  },
  {
    number: 5,
    title: "Results",
    description: "Download enriched data and emails",
  },
];

const WorkflowSteps = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Workflow Process</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-2">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.description}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkflowSteps;
