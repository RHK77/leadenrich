
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  ChevronDown, ChevronUp, Download, MessageSquare, Building, 
  Globe, MapPin, Users, Tag, Copy, Send, Edit, RefreshCcw 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  id?: string;
};

type ResultsDisplayProps = {
  results: Result[];
};

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [isRegenerating, setIsRegenerating] = useState<Record<string, boolean>>({});
  const [editableEmail, setEditableEmail] = useState<Record<string, string>>({});

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

  const handleEmailCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const handleEmailSend = (email: string, company: string) => {
    const subject = email.split('\n')[0].replace('Subject: ', '');
    const body = email.split('\n').slice(1).join('\n');
    
    // Replace placeholder with user's info
    const processedBody = body
      .replace('[Your Name]', user?.fullName || user?.name || '')
      .replace('[Your Company]', user?.companyName || user?.company || '')
      .replace('[Contact Information]', user?.contactInfo || '');
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(processedBody)}`;
    window.open(mailtoUrl);
  };

  const handleEmailEdit = (index: string, initialEmail: string) => {
    if (!editableEmail[index]) {
      setEditableEmail({
        ...editableEmail,
        [index]: initialEmail
      });
    }
  };

  const handleEmailRegenerate = async (index: number, companyData: Result) => {
    const emailId = `email-${index}`;
    setIsRegenerating({
      ...isRegenerating,
      [emailId]: true
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('enrich-leads', {
        body: {
          companyName: companyData.company_name,
          website: companyData.website || "",
          additionalInfo: `${companyData.industry || ""} ${companyData.location || ""} ${companyData.size || ""}`,
          regenerateEmailOnly: true,
          enrichmentData: companyData.enrichment
        }
      });

      if (error) throw error;
      
      // Update only the email content
      results[index].email = data.email;
      
      // Reset the editable email if it exists
      if (editableEmail[emailId]) {
        setEditableEmail({
          ...editableEmail,
          [emailId]: data.email
        });
      }
      
      toast.success("Email regenerated successfully");
    } catch (error) {
      console.error("Error regenerating email:", error);
      toast.error("Failed to regenerate email");
    } finally {
      setIsRegenerating({
        ...isRegenerating,
        [emailId]: false
      });
    }
  };

  const saveEditedEmail = (index: string) => {
    const resultIndex = parseInt(index.split('-')[1]);
    if (results[resultIndex] && editableEmail[index]) {
      results[resultIndex].email = editableEmail[index];
      toast.success("Email saved");
    }
  };

  const processEmailWithUserInfo = (email: string) => {
    if (!user) return email;
    
    return email
      .replace('[Your Name]', user.fullName || user.name || '[Your Name]')
      .replace('[Your Company]', user.companyName || user.company || '[Your Company]')
      .replace('[Contact Information]', user.contactInfo || '[Contact Information]');
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
                    {editableEmail[`email-${index}`] ? (
                      <div className="mb-4">
                        <textarea
                          value={editableEmail[`email-${index}`]}
                          onChange={(e) => setEditableEmail({
                            ...editableEmail,
                            [`email-${index}`]: e.target.value
                          })}
                          className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditableEmail({
                                ...editableEmail,
                                [`email-${index}`]: undefined
                              });
                            }}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => saveEditedEmail(`email-${index}`)}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap font-sans">{processEmailWithUserInfo(result.email)}</pre>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailCopy(processEmailWithUserInfo(result.email))}
                        className="flex items-center"
                      >
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailSend(result.email, result.company_name)}
                        className="flex items-center"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" />
                        Send
                      </Button>
                      <Button
                        variant={editableEmail[`email-${index}`] ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleEmailEdit(`email-${index}`, result.email)}
                        className="flex items-center"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isRegenerating[`email-${index}`]}
                        onClick={() => handleEmailRegenerate(index, result)}
                        className="flex items-center"
                      >
                        <RefreshCcw className={`h-3.5 w-3.5 mr-1 ${isRegenerating[`email-${index}`] ? "animate-spin" : ""}`} />
                        {isRegenerating[`email-${index}`] ? "Regenerating..." : "Regenerate"}
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
