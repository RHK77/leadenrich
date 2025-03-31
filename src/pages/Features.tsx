
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  FileUp, 
  BarChart, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Database,
  Share2,
  Zap
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize 3D animation effects
    const animateFeatureCards = () => {
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.07)`;
          
          const shine = card.querySelector('.card-shine');
          if (shine) {
            shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)`;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.boxShadow = '';
          
          const shine = card.querySelector('.card-shine');
          if (shine) {
            shine.style.backgroundImage = '';
          }
        });
      });
    };
    
    animateFeatureCards();
    
    // Clean up event listeners
    return () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-gray-900 text-white">
          <div className="absolute inset-0 z-0">
            <div className="grid-animation"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful Features for <span className="text-primary">B2B Lead Enrichment</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Generate personalized B2B sales emails using AI without expensive third‐party services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-200 gap-2"
                  onClick={() => navigate("/signup")}
                >
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/pricing")}
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive features grid */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features to Enhance Your <span className="text-primary">B2B Outreach</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Upload Feature */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <FileUp className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Multiple File Formats</h3>
                  <p className="text-gray-600 mb-4">
                    Upload your company data in CSV, Excel, or connect directly to Notion and Airtable
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      CSV and Excel files
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Notion integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Airtable support
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* AI Enrichment */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Enrichment</h3>
                  <p className="text-gray-600 mb-4">
                    Leverage AI to gather detailed insights about target companies
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Company descriptions
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Industry challenges
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Pain points analysis
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Email Generation */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Email Generation</h3>
                  <p className="text-gray-600 mb-4">
                    Create personalized B2B sales emails using AI technology
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Personalized subject lines
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Value-focused content
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Industry-specific templates
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Integrations */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Share2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Third-Party Integrations</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with popular platforms and CRMs for seamless workflow
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Google, Microsoft, Apple integration
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Direct CRM connection
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Social login options
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Data Management */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Database className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Data Management</h3>
                  <p className="text-gray-600 mb-4">
                    Organize and manage your lead data effectively
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Smart data organization
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Secure storage
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Easy export options
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Analytics */}
              <div className="feature-card p-8 rounded-xl bg-white border transition-all duration-300 relative overflow-hidden">
                <div className="card-shine absolute inset-0"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <BarChart className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
                  <p className="text-gray-600 mb-4">
                    Track and analyze your email campaign performance
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Detailed reports
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Conversion tracking
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Performance insights
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Workflow section from original code */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* CSV Upload */}
                  <g>
                    <circle cx="100" cy="125" r="30" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="100" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">CSV</text>
                  </g>
                  {/* Arrow */}
                  <path d="M 135 125 L 185 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="185,120 195,125 185,130" fill="#93c5fd" />
                  {/* Read Data */}
                  <g>
                    <rect x="195" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="235" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Read Data</text>
                  </g>
                  {/* Arrow */}
                  <path d="M 275 125 L 325 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="325,120 335,125 325,130" fill="#93c5fd" />
                  {/* Process */}
                  <g>
                    <rect x="335" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="375" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Process</text>
                  </g>
                  {/* Arrow */}
                  <path d="M 415 125 L 465 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="465,120 475,125 465,130" fill="#93c5fd" />
                  {/* AI Agent (OpenAI o3 mini) */}
                  <g>
                    <rect x="475" y="95" width="90" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="520" y="120" fontSize="10" textAnchor="middle" dominantBaseline="middle">OpenAI</text>
                    <text x="520" y="135" fontSize="10" textAnchor="middle" dominantBaseline="middle">o3 mini</text>
                  </g>
                  {/* Arrow */}
                  <path d="M 565 125 L 615 125" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="615,120 625,125 615,130" fill="#93c5fd" />
                  {/* Generate Emails */}
                  <g>
                    <rect x="625" y="95" width="80" height="60" rx="5" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="665" y="125" fontSize="10" textAnchor="middle" dominantBaseline="middle">Generate</text>
                  </g>
                  {/* Chat (Optional) */}
                  <g>
                    <circle cx="520" cy="220" r="30" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2" />
                    <text x="520" y="220" fontSize="10" textAnchor="middle" dominantBaseline="middle">Chat</text>
                  </g>
                  {/* Arrow from AI Agent to Chat */}
                  <path d="M 520 155 L 520 190" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5,5" />
                  <polygon points="515,190 520,190 525,190" fill="#93c5fd" />
                </svg>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">Workflow Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <div className="step-title">Upload CSV Data</div>
                      <div className="step-desc">Upload your company data CSV file</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <div className="step-title">Data Processing</div>
                      <div className="step-desc">System reads and validates the data</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <div className="step-title">AI Enrichment</div>
                      <div className="step-desc">OpenAI enriches the company information</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <div className="step-title">Email Generation</div>
                      <div className="step-desc">Personalized B2B emails are created</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <div className="step-title">Results</div>
                      <div className="step-desc">Download enriched data and emails</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Free Trial CTA */}
        <section className="py-20 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to try it for free?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start with 10 free leads. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 gap-2"
                onClick={() => navigate("/signup")}
              >
                Start Free Trial <Zap className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
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

export default Features;
