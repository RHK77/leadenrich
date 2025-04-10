
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Download, MessageSquare, Building, Globe, MapPin, Users, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Result = {
  company_name: string;
  website: string;
  industry: string;
  size: string;
  location: string;
  status: string;
  enrichment: {
    description: string;
    productsServices: string[];
    industryChallenges: string[];
    recentNews: string;
    painPoints: string[];
  };
  email: string;
};

type ResultsDisplayProps = {
  results: Result[];
};

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "b2b_lead_enrichment_results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Results downloaded successfully");
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI-Enriched Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enrichment">
          <TabsList className="mb-4">
            <TabsTrigger value="enrichment">Company Enrichment</TabsTrigger>
            <TabsTrigger value="emails">Generated Emails</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrichment" className="space-y-4">
            {results.map((result, index) => (
              <div
                key={`enrichment-${index}`}
                className="border rounded-md overflow-hidden shadow-sm"
              >
                <div
                  className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
                  onClick={() => toggleItem(`enrichment-${index}`)}
                >
                  <div className="font-medium flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    {result.company_name}
                    {result.industry && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {result.industry}
                      </Badge>
                    )}
                  </div>
                  {expandedItems[`enrichment-${index}`] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedItems[`enrichment-${index}`] && (
                  <div className="p-4 text-sm">
                    <div className="space-y-4">
                      {/* Company Quick Facts */}
                      <div className="flex flex-wrap gap-3 mb-2 text-xs text-muted-foreground">
                        {result.website && (
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {result.website}
                            </a>
                          </div>
                        )}
                        {result.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {result.location}
                          </div>
                        )}
                        {result.size && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {result.size}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-1">Description</h4>
                        <p>{result.enrichment.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-1">Products & Services</h4>
                        <ul className="list-disc pl-5">
                          {result.enrichment.productsServices.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-1">Industry Challenges</h4>
                        <ul className="list-disc pl-5">
                          {result.enrichment.industryChallenges.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {result.enrichment.recentNews && result.enrichment.recentNews !== "No recent news available" && (
                        <div>
                          <h4 className="font-semibold mb-1">Recent News</h4>
                          <p>{result.enrichment.recentNews}</p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="font-semibold mb-1">Pain Points</h4>
                        <ul className="list-disc pl-5">
                          {result.enrichment.painPoints.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="emails" className="space-y-4">
            {results.map((result, index) => (
              <div
                key={`email-${index}`}
                className="border rounded-md overflow-hidden shadow-sm"
              >
                <div
                  className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer"
                  onClick={() => toggleItem(`email-${index}`)}
                >
                  <div className="font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Email for: {result.company_name}
                  </div>
                  {expandedItems[`email-${index}`] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedItems[`email-${index}`] && (
                  <div className="p-4 text-sm bg-white">
                    <pre className="whitespace-pre-wrap font-sans">{result.email}</pre>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(result.email);
                          toast.success("Email copied to clipboard");
                        }}
                      >
                        Copy Email
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download All Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
