
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { Key, EyeOff, Eye } from "lucide-react";

const ApiKeyForm = () => {
  const { hasApiKey, setApiKey, clearApiKey } = useApiKey();
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call to validate key
    setTimeout(() => {
      setApiKey(apiKeyInput.trim());
      setApiKeyInput("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key Management
        </CardTitle>
        <CardDescription>
          {hasApiKey 
            ? "Your API key is securely stored for this session" 
            : "Enter your API key to enable AI features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasApiKey ? (
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-medium">API Key Status: <span className="text-green-500">Active</span></p>
              <p className="text-muted-foreground text-xs mt-1">Your API key is securely stored in memory for this session only</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={clearApiKey}
              className="w-full"
            >
              Clear API Key
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="Enter your API key"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key will be stored in memory only and cleared when you close your browser.
            </p>
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800" 
              disabled={isSubmitting || !apiKeyInput.trim()}
            >
              {isSubmitting ? "Setting API Key..." : "Set API Key"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
