import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, FileText, CheckCircle, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { toast } from "sonner";
import ApiKeyStatus from "./upload/ApiKeyStatus";
import { useAuth } from "@/contexts/AuthContext";

type ResultsDisplayProps = {
  results: any[];
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState("results");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const { user } = useAuth();

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadTextFile = (text: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Enrichment Results
        </CardTitle>
        <CardDescription>
          Review the enriched data and generated emails for each company
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="space-y-4">
            {results && results.length > 0 ? (
              <ScrollArea className="rounded-md border p-4 h-[500px] w-full">
                <div className="divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <div key={index} className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">{result.company_name}</h3>
                          <p className="text-sm text-muted-foreground">{result.website}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">{result.status}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => toggleRow(index)}>
                            {expandedRow === index ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {expandedRow === index && (
                        <div className="mt-4 space-y-4">
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="text-md font-semibold">Enrichment Data</h4>
                            <p className="text-sm">
                              <strong>Description:</strong> {result.enrichment.description}
                            </p>
                            <p className="text-sm">
                              <strong>Products/Services:</strong> {result.enrichment.productsServices.join(", ")}
                            </p>
                            <p className="text-sm">
                              <strong>Industry Challenges:</strong> {result.enrichment.industryChallenges.join(", ")}
                            </p>
                            <p className="text-sm">
                              <strong>Recent News:</strong> {result.enrichment.recentNews}
                            </p>
                            <p className="text-sm">
                              <strong>Pain Points:</strong> {result.enrichment.painPoints.join(", ")}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <h4 className="text-md font-semibold flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              Generated Email
                            </h4>
                            <p className="text-sm whitespace-pre-line">{result.email}</p>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => copyToClipboard(result.email)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Email
                              </Button>
                              <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => downloadTextFile(result.email, `${result.company_name.replace(/\s+/g, '_')}_email.txt`)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Email
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-6">
                <h4 className="text-lg font-semibold">No results yet</h4>
                <p className="text-sm text-muted-foreground">Upload your company data to see enriched results.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings">
            <p>Here you can configure your profile settings.</p>
            <ApiKeyStatus />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
