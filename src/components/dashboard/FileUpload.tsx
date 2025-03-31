
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileIcon, Loader2 } from "lucide-react";

type FileUploadProps = {
  onProcessComplete: (results: any[]) => void;
};

const FileUpload = ({ onProcessComplete }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }
      setSelectedFile(file);
      toast.success("File selected: " + file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a CSV file first");
      return;
    }

    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      // Mock results for demonstration
      const mockResults = [
        {
          company_name: "Acme Corp",
          website: "acme.com",
          industry: "Manufacturing",
          size: "500-1000",
          location: "New York, USA",
          status: "completed",
          enrichment: {
            description: "Acme Corporation manufactures a wide range of products including innovative gadgets and equipment for various industries.",
            productsServices: ["Industrial equipment", "Safety products", "Consumer gadgets"],
            industryChallenges: ["Supply chain disruptions", "Raw material costs", "Environmental regulations"],
            recentNews: "Recently expanded their East Coast operations with a new manufacturing facility.",
            painPoints: ["Inventory management", "Legacy systems integration", "Customer acquisition costs"]
          },
          email: `Subject: Streamlining Manufacturing Processes at Acme Corp

Dear Acme Corp Team,

I hope this email finds you well. I've been following Acme's recent expansion on the East Coast and was impressed by your commitment to growth despite the current supply chain challenges in the manufacturing sector.

With your range of industrial equipment and safety products, I believe we have solutions that could help address some of your inventory management challenges while reducing operational costs.

Would you be available for a 15-minute call this week to discuss how our services have helped similar manufacturers improve efficiency by 23% on average?

Looking forward to connecting,

[Your Name]
[Your Company]
[Contact Information]`
        },
        {
          company_name: "TechSolutions Inc",
          website: "techsolutions.com",
          industry: "Software",
          size: "100-500",
          location: "San Francisco, USA",
          status: "completed",
          enrichment: {
            description: "TechSolutions develops software solutions for business process automation and data analytics.",
            productsServices: ["CRM software", "Data analytics platform", "Automation tools"],
            industryChallenges: ["Rapid technological change", "Talent acquisition", "Cybersecurity threats"],
            recentNews: "Recently launched a new AI-powered analytics platform.",
            painPoints: ["High customer acquisition costs", "Technical debt", "Integration with legacy systems"]
          },
          email: `Subject: Enhancing Your AI Analytics Capabilities

Dear TechSolutions Team,

Congratulations on the recent launch of your AI-powered analytics platform! As the software industry continues to evolve rapidly, staying ahead with innovative solutions is crucial.

I noticed that TechSolutions has been making significant strides in data analytics and automation tools. Our platform might complement your offerings by providing enhanced integration capabilities that address the common challenge of connecting with legacy systems.

Would you be open to a brief discussion about how we might collaborate to solve some of the technical debt and integration challenges your customers face?

Best regards,

[Your Name]
[Your Company]
[Contact Information]`
        }
      ];
      
      setIsLoading(false);
      onProcessComplete(mockResults);
      toast.success("Processing complete!");
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileIcon className="h-5 w-5" />
          Upload Your Company Data
        </CardTitle>
        <CardDescription>
          Upload a CSV file with your company target list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csvFile">CSV File</Label>
            <Input 
              id="csvFile" 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>
          
          {selectedFile && (
            <div className="text-sm text-muted-foreground mt-2">
              Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-4">
            <Button type="submit" disabled={!selectedFile || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Data"
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                // For demo purposes, let's trigger the processing directly
                handleSubmit(new Event('submit') as any);
              }}
              disabled={isLoading}
            >
              Use Sample Data
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-4">
            Using test API key: <code className="bg-muted p-1 rounded text-xs">sk-test-1234567890</code>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
