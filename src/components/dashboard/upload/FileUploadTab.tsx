
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUpload } from "@/contexts/UploadContext";

const FileUploadTab = () => {
  const { selectedFile, setSelectedFile, isLoading, processData } = useUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = [
        "text/csv", 
        "application/vnd.ms-excel", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      
      if (!validTypes.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        toast.error("Please upload a CSV or Excel file");
        return;
      }
      setSelectedFile(file);
      toast.success("File selected: " + file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    await processData();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csvFile">CSV or Excel File</Label>
        <Input 
          id="csvFile" 
          type="file" 
          accept=".csv,.xlsx,.xls" 
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
          onClick={processData}
          disabled={isLoading}
        >
          Use Sample Data
        </Button>
      </div>
    </form>
  );
};

export default FileUploadTab;
