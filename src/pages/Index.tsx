
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Upload, Sparkles, BarChart, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [showPromo, setShowPromo] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [promoViewed, setPromoViewed] = useState(false);

  useEffect(() => {
    // Show promo after 3 seconds
    const timer = setTimeout(() => {
      const hasSeenPromo = localStorage.getItem("promoViewed");
      if (!hasSeenPromo) {
        setShowPromo(true);
        setPromoViewed(true);
        localStorage.setItem("promoViewed", "true");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Countdown timer
    let interval: number | undefined;
    
    if (showPromo) {
      interval = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showPromo]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const features = [
    {
      title: "CSV Upload",
      description: "Upload your company data in CSV format for easy processing",
      icon: <Upload className="h-10 w-10 text-black" />,
    },
    {
      title: "AI Enrichment",
      description: "Leverage OpenAI to gather detailed insights about target companies",
      icon: <Sparkles className="h-10 w-10 text-black" />,
    },
    {
      title: "Email Generation",
      description: "Create personalized B2B sales emails using AI technology",
      icon: <FileText className="h-10 w-10 text-black" />,
    },
    {
      title: "Performance Analytics",
      description: "Track and analyze your email campaign performance",
      icon: <BarChart className="h-10 w-10 text-black" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section with video */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                B2B Lead Enrichment and Email Personalization
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Generate personalized B2B sales emails using AI without expensive third‐party services
              </p>

              {/* Hero video */}
              <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
                <video 
                  className="w-full aspect-video object-cover"
                  controls
                  poster="/placeholder.svg"
                >
                  <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gap-2 bg-black hover:bg-gray-800 text-white"
                  onClick={() => navigate("/signup")}
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-black text-black hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/feature/${feature.title.toLowerCase().replace(' ', '-')}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your B2B outreach?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start generating personalized emails based on rich company data today.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2023 LeadEnrich. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Promotional Popup */}
      <Dialog open={showPromo} onOpenChange={setShowPromo}>
        <DialogContent className="sm:max-w-md border-2 border-gold">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              <span className="text-gold">Limited Time Offer!</span>
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Sign up in the next <span className="font-bold text-gold">{formatTime(countdown)}</span> and get
              <span className="block text-2xl font-bold my-2 text-gold">5 EXTRA FREE LEADS</span>
              on top of your 10 free trial leads!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 p-4">
            <p className="text-center">
              Don't miss this exclusive opportunity to supercharge your B2B outreach!
            </p>
            <div className="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gold/10 animate-pulse">
              <span className="text-3xl font-bold text-gold">5+10</span>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-4">
            <Button 
              onClick={() => {
                setShowPromo(false);
                navigate("/signup");
              }}
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-black"
            >
              Claim My 15 Free Leads
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPromo(false)}
              className="w-full sm:w-auto text-gray-500 hover:text-gray-700"
            >
              I'll Pass
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
