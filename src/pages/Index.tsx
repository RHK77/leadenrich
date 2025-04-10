import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, FileText, Upload, Sparkles, BarChart, X, CheckCircle, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
  const features = [{
    title: "CSV Upload",
    description: "Upload your company data in CSV format for easy processing",
    icon: <Upload className="h-10 w-10 text-black" />,
    benefits: ["One-click import of all your lead data", "Automatic field mapping saves time", "No data loss with validation checks", "Direct integration with your CRM"]
  }, {
    title: "AI Enrichment",
    description: "Leverage OpenAI to gather detailed insights about target companies",
    icon: <Sparkles className="h-10 w-10 text-black" />,
    benefits: ["Discover hidden company insights instantly", "Get detailed company profiles automatically", "Identify key decision makers with ease", "Uncover competitive intelligence"]
  }, {
    title: "Email Generation",
    description: "Create personalized B2B sales emails using AI technology",
    icon: <FileText className="h-10 w-10 text-black" />,
    benefits: ["Generate human-like outreach messages", "Personalize at scale with no effort", "Increase open rates with targeted content", "A/B test different approaches automatically"]
  }, {
    title: "Performance Analytics",
    description: "Track and analyze your email campaign performance",
    icon: <BarChart className="h-10 w-10 text-black" />,
    benefits: ["Real-time tracking of email performance", "Conversion rate analysis by industry", "Identify best-performing message styles", "Export reports for stakeholder review"]
  }];
  return <div className="min-h-screen flex flex-col bg-white text-black">
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
                <video className="w-full aspect-video object-cover" controls poster="/placeholder.svg">
                  <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white" onClick={() => navigate("/signup")}>
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-black text-black hover:bg-gray-100" onClick={() => navigate("/dashboard")}>
                  View Demo
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
          </div>
        </section>

        {/* Expanded SEO content section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-black">Why Choose LeadEnrich for Your B2B Outreach?</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 mb-10">
                <p className="lead text-xl mb-6">
                  LeadEnrich is the ultimate AI-powered platform for B2B sales teams looking to scale personalized outreach without the excessive costs of traditional services.
                </p>
                
                <p className="mb-6">
                  In today's competitive B2B landscape, generic mass emails no longer cut through the noise. Buyers expect personalized communication that demonstrates you understand their business challenges. However, traditional lead enrichment and personalization services are prohibitively expensive for many businesses, especially SMBs and startups.
                </p>
                
                <p className="mb-6">
                  LeadEnrich solves this problem by leveraging cutting-edge AI to automatically research companies, identify key decision-makers, and generate highly personalized outreach messages at a fraction of the cost of traditional services.
                </p>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Transform Your B2B Sales Process</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-bold text-xl mb-3">Before LeadEnrich:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Hours spent manually researching prospects</li>
                      <li>Generic outreach templates that get ignored</li>
                      <li>Expensive third-party data services</li>
                      <li>Low response rates despite high effort</li>
                      <li>Inability to scale personalized outreach</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-black">
                    <h4 className="font-bold text-xl mb-3">With LeadEnrich:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Automated research and enrichment in seconds</li>
                      <li>Hyper-personalized outreach at scale</li>
                      <li>Affordable pricing with generous free tier</li>
                      <li>2-3x higher response rates</li>
                      <li>Sales team focused on closing, not researching</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mt-8 mb-4">Key Benefits That Drive Results</h3>
                
                <div className="space-y-4 mb-8">
                  {features.map((feature, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="mr-4 bg-gray-100 p-3 rounded-full">
                          {feature.icon}
                        </div>
                        <h4 className="font-bold text-xl">{feature.title}</h4>
                      </div>
                      <p className="mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>)}
                      </ul>
                    </div>)}
                </div>
                
                <div className="bg-black text-white p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold mb-4">The LeadEnrich Advantage</h3>
                  <p className="mb-4">Our platform is designed specifically for B2B sales teams who need to scale personalized outreach without breaking the bank. We combine the power of AI with a seamless user experience to deliver:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>90% time savings on lead research and email writing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Up to 3x improvement in email response rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>75% cost reduction compared to traditional enrichment services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Seamless integration with your existing CRM and workflow</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Button size="lg" className="gap-2 bg-black hover:bg-gray-800 text-white" onClick={() => navigate("/signup")}>
                  Start Your Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-sm text-gray-500 mt-2">No credit card required. Start with 10 free leads.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center hover:shadow-md transition-shadow" onClick={() => navigate(`/feature/${feature.title.toLowerCase().replace(' ', '-')}`)} style={{
              cursor: 'pointer'
            }}>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>)}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" onClick={() => navigate("/signup")} className="border-white hover:bg-white text-slate-600">
                Start Free Trial
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" className="border-white hover:bg-white text-slate-700">
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
            <Button onClick={() => {
            setShowPromo(false);
            navigate("/signup");
          }} className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-black">
              Claim My 15 Free Leads
            </Button>
            <Button variant="outline" onClick={() => setShowPromo(false)} className="w-full sm:w-auto text-gray-500 hover:text-gray-700">
              I'll Pass
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Index;