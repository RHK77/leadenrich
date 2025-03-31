
import { Card, CardContent } from "@/components/ui/card";

const WorkflowDiagram = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* CSV Upload */}
          <g>
            <circle cx="100" cy="125" r="30" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="100" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">CSV</text>
          </g>
          {/* Arrow */}
          <path d="M 135 125 L 185 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="185,120 195,125 185,130" fill="#93c5fd" />
          {/* Read Data */}
          <g>
            <rect x="195" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="235" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Read Data</text>
          </g>
          {/* Arrow */}
          <path d="M 275 125 L 325 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="325,120 335,125 325,130" fill="#93c5fd" />
          {/* Process */}
          <g>
            <rect x="335" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="375" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Process</text>
          </g>
          {/* Arrow */}
          <path d="M 415 125 L 465 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="465,120 475,125 465,130" fill="#93c5fd" />
          {/* AI Agent (OpenAI o3 mini) */}
          <g>
            <rect x="475" y="95" width="90" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="520" y="120" fontSize="10" textAnchor="middle" dominantBaseline="middle">OpenAI</text>
            <text x="520" y="135" fontSize="10" textAnchor="middle" dominantBaseline="middle">o3 mini</text>
          </g>
          {/* Arrow */}
          <path d="M 565 125 L 615 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="615,120 625,125 615,130" fill="#93c5fd" />
          {/* Generate Emails */}
          <g>
            <rect x="625" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="665" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Generate</text>
          </g>
          {/* Chat (Optional) */}
          <g>
            <circle cx="520" cy="220" r="30" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
            <text x="520" y="220" fontSize="10" textAnchor="middle" dominantBaseline="middle">Chat</text>
          </g>
          {/* Arrow from AI Agent to Chat */}
          <path d="M 520 155 L 520 190" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="515,190 520,190 525,190" fill="#93c5fd" />
        </svg>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;
