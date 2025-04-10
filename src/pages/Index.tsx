
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalComWidget from "@/components/CalComWidget";

const Index = () => {
  const navigate = useNavigate();
  const [showPromo, setShowPromo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
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
        setCountdown(prev => {
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
  
  const benefits = [
    "Discover hidden company insights instantly",
    "Get detailed company profiles automatically",
    "Identify key decision makers with ease",
    "Generate human-like outreach messages",
    "Personalize at scale with no effort",
    "Increase open rates with targeted content"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section with new image */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                  B2B Lead Enrichment for the Hemp Industry
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Generate personalized B2B sales emails using AI without expensive third‐party services. Perfect for hemp industry professionals.
                </p>
                
                {/* Benefits list */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Why Choose LeadEnrich?</h2>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white" onClick={() => navigate("/signup")}>
                    Start Pro Trial <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="lg" className="border-black text-black hover:bg-gray-100">
                        <Calendar className="h-4 w-4 mr-2" /> Schedule Demo
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <CalComWidget username="richard-kamolvathin-wc1yj8" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="order-first md:order-last">
                <img 
                  src="/public/lovable-uploads/28336766-ad6f-4d0c-b65b-d12fc0712c18.png" 
                  alt="Business growth illustration with person on upward trending graph" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO content section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-black">Transform Your Hemp Industry Outreach</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 mb-10">
                <p className="lead text-xl mb-6">
                  LeadEnrich is the ultimate AI-powered platform for hemp industry sales teams looking to scale personalized outreach without excessive costs.
                </p>
                
                <p className="mb-6">
                  In today's competitive hemp and CBD landscape, generic mass emails no longer cut through the noise. Buyers expect personalized communication that demonstrates you understand their specific business challenges. However, traditional lead enrichment and personalization services are prohibitively expensive for many businesses in this niche industry.
                </p>
                
                <p className="mb-6">
                  LeadEnrich solves this problem by leveraging cutting-edge AI to automatically research hemp companies, identify key decision-makers, and generate highly personalized outreach messages tailored specifically to the hemp and CBD industry at a fraction of the cost of traditional services.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">The LeadEnrich Advantage for Hemp Businesses</h3>
                
                <div className="bg-black text-white p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold mb-4">Why Hemp Industry Professionals Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>90% time savings on hemp industry lead research and email writing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Up to 3x improvement in email response rates with hemp-specific messaging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>75% cost reduction compared to traditional enrichment services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Industry-specific insights on cultivation methods, compliance, and product offerings</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Button size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white" onClick={() => navigate("/pricing")}>
                  View Pro Plan <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-sm text-gray-500 mt-2">14-day trial available. Process up to 100 leads per month.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your hemp industry outreach?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start generating personalized emails based on rich hemp company data today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")} className="border-white hover:bg-white hover:text-black text-white">
                Get Pro Plan
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" className="border-white hover:bg-white hover:text-black text-white">
                    <Calendar className="h-4 w-4 mr-2" /> Schedule Demo
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <CalComWidget username="richard-kamolvathin-wc1yj8" />
                </PopoverContent>
              </Popover>
            </div>
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
              <span className="block text-2xl font-bold my-2 text-gold">14-DAY PRO TRIAL</span>
              with access to all premium features!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 p-4">
            <p className="text-center">
              Don't miss this exclusive opportunity to supercharge your hemp industry outreach!
            </p>
            <div className="mx-auto w-32 h-32 flex items-center justify-center rounded-full bg-gold/10 animate-pulse">
              <span className="text-3xl font-bold text-gold">PRO</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-4 pt-4">
            <Button onClick={() => {
              setShowPromo(false);
              navigate("/pricing");
            }} className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-black">
              Get Pro Trial
            </Button>
            <Button variant="outline" onClick={() => setShowPromo(false)} className="w-full sm:w-auto text-gray-500 hover:text-gray-700">
              I'll Pass
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
