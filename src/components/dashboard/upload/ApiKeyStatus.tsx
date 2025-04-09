
import { useAuth } from "@/contexts/AuthContext";

const ApiKeyStatus = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <div className="text-xs text-muted-foreground">
        API Key Status: <span className="text-green-500 font-medium">Active</span>
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
