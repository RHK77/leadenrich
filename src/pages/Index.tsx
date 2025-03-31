
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Upload, Sparkles, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "CSV Upload",
      description: "Upload your company data in CSV format for easy processing",
      icon: <Upload className="h-10 w-10 text-primary" />,
    },
    {
      title: "AI Enrichment",
      description: "Leverage OpenAI to gather detailed insights about target companies",
      icon: <Sparkles className="h-10 w-10 text-primary" />,
    },
    {
      title: "Email Generation",
      description: "Create personalized B2B sales emails using AI technology",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Performance Analytics",
      description: "Track and analyze your email campaign performance",
      icon: <BarChart className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                B2B Lead Enrichment and Email Personalization
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Generate personalized B2B sales emails using AI without expensive third‐party services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gap-2"
                  onClick={() => navigate("/signup")}
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your B2B outreach?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start generating personalized emails based on rich company data today.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2023 LeadEnrich. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
