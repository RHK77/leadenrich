
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUpload } from "@/contexts/UploadContext";

const AirtableUploadTab = () => {
  const { airtableUrl, setAirtableUrl, isLoading, processData } = useUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!airtableUrl) {
      toast.error("Please enter an Airtable base URL");
      return;
    }
    
    await processData();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="airtableUrl">Airtable Base URL</Label>
        <Input 
          id="airtableUrl" 
          type="url" 
          placeholder="https://airtable.com/..."
          value={airtableUrl}
          onChange={(e) => setAirtableUrl(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        Connect to your Airtable base containing company information.
      </p>
      
      <div className="flex items-center gap-2 mt-4">
        <Button type="submit" disabled={!airtableUrl || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Connect to Airtable"
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={processData}
          disabled={isLoading}
        >
          Use Sample Data
        </Button>
      </div>
    </form>
  );
};

export default AirtableUploadTab;
