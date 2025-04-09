
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileIcon } from "lucide-react";
import { useApiKey } from "@/contexts/ApiKeyContext";
import ApiKeyForm from "./ApiKeyForm";
import UploadTabs from "./upload/UploadTabs";
import ApiKeyStatus from "./upload/ApiKeyStatus";
import { UploadProvider } from "@/contexts/UploadContext";

type FileUploadProps = {
  onProcessComplete: (results: any[]) => void;
};

const FileUpload = ({ onProcessComplete }: FileUploadProps) => {
  const { hasApiKey } = useApiKey();

  if (!hasApiKey) {
    return <ApiKeyForm />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileIcon className="h-5 w-5" />
          Upload Your Company Data
        </CardTitle>
        <CardDescription>
          Upload your company target list using any of these methods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UploadProvider onProcessComplete={onProcessComplete}>
          <UploadTabs />
          <ApiKeyStatus />
        </UploadProvider>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
