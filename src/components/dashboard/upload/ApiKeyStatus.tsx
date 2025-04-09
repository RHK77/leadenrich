
import { useAuth } from "@/contexts/AuthContext";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Key } from "lucide-react";

const ApiKeyStatus = () => {
  const { user } = useAuth();
  const { hasApiKey } = useApiKey();

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <Key className="h-3 w-3" />
        API Key Status: 
        {hasApiKey ? (
          <span className="text-green-500 font-medium">Active</span>
        ) : (
          <span className="text-red-500 font-medium">Not Set</span>
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
