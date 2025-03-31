
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Google, Github, Apple, Mail, FileUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulating registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      
      // Store user data with free trial info
      const userData = {
        name,
        email,
        company: company || undefined,
        leadsRemaining: 10,
        isPremium: false
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast.success("Account created successfully! You have 10 free leads to start.");
      navigate("/dashboard");
    }, 1000);
  };

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social authentication
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      
      // Store default user data with free trial info
      const userData = {
        name: "User",
        email: "user@example.com",
        leadsRemaining: 10,
        isPremium: false
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast.success(`Signed up with ${provider}! You have 10 free leads to start.`);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Start enriching your B2B leads today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleSocialSignup("Google")}>
            <Google className="h-4 w-4" />
            <span>Sign up with Google</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleSocialSignup("GitHub")}>
            <Github className="h-4 w-4" />
            <span>Sign up with GitHub</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleSocialSignup("Apple")}>
            <Apple className="h-4 w-4" />
            <span>Sign up with Apple</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <Separator className="flex-grow" />
          <span className="text-xs text-muted-foreground">OR</span>
          <Separator className="flex-grow" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <Input
              id="company"
              placeholder="Your Company Ltd"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password <span className="text-destructive">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileUp className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Supported Data Sources</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Upload your lead data from various sources:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>CSV Files</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>Excel Spreadsheets</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>Notion Databases</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span>Airtable Bases</span>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Log in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
