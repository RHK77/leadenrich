
import { useAuth } from "@/contexts/AuthContext";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { ApiClient } from "@/utils/apiClient";
import { Key } from "lucide-react";

const ApiKeyStatus = () => {
  const { user } = useAuth();
  const { hasApiKey } = useApiKey();
  
  // Get the actual API key to display a preview
  const apiKey = ApiClient.getApiKey();
  const apiKeyPreview = apiKey 
    ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}`
    : '';

  const hasOpenAI = !!apiKey;

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <Key className="h-3 w-3" />
        API Key Status: 
        {hasApiKey ? (
          <span className="text-green-500 font-medium ml-1">
            Active <code className="bg-muted p-1 rounded text-xs ml-1">{apiKeyPreview}</code>
          </span>
        ) : (
          <span className="text-red-500 font-medium ml-1">Not Set</span>
        )}
        {hasOpenAI && (
          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
            OpenAI Ready
          </span>
        )}
      </div>
      
      {user && !user.isPremium && (
        <div className="text-sm font-medium">
          <span className="text-primary">{user.leadsRemaining}</span> free leads remaining
        </div>
      )}
    </div>
  );
};

export default ApiKeyStatus;
