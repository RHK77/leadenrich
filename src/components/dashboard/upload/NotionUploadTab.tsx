
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUpload } from "@/contexts/UploadContext";

const NotionUploadTab = () => {
  const { notionUrl, setNotionUrl, isLoading, processData } = useUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notionUrl) {
      toast.error("Please enter a Notion database URL");
      return;
    }
    
    await processData();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="notionUrl">Notion Database URL</Label>
        <Input 
          id="notionUrl" 
          type="url" 
          placeholder="https://notion.so/workspace/..."
          value={notionUrl}
          onChange={(e) => setNotionUrl(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        Connect to your Notion database containing company information.
      </p>
      
      <div className="flex items-center gap-2 mt-4">
        <Button type="submit" disabled={!notionUrl || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Connect to Notion"
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

export default NotionUploadTab;
