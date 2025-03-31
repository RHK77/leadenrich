
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PricingPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    // Here we would connect to Stripe for payment
    toast.info(`Redirecting to Stripe for ${plan} subscription...`);
    // Placeholder for Stripe integration
    // In a real implementation, we would redirect to Stripe checkout
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Choose the Right Plan for Your Business
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Generate personalized B2B sales emails using AI. Start with 10 free leads and upgrade when you're ready.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Trial Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Free Trial</h3>
            <p className="text-muted-foreground mb-4">Perfect for testing the waters</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground ml-2">/ forever</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>10 free lead enrichments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Basic email templates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>CSV file upload</span>
              </li>
            </ul>
            
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign Up Free
            </Button>
          </div>
          
          {/* Pro Plan */}
          <div className="border rounded-lg p-8 flex flex-col bg-black text-white shadow-lg scale-105 relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-zinc-400 mb-4">For growing businesses</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-zinc-400 ml-2">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Unlimited lead enrichments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Advanced email personalization</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Multiple file formats</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Notion & Airtable integration</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => handleSubscribe("pro")}>
              Subscribe Now
            </Button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
            <p className="text-muted-foreground mb-4">For larger organizations</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$199</span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Custom AI models</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Custom integrations</span>
              </li>
            </ul>
            
            <Button variant="outline" onClick={() => handleSubscribe("enterprise")}>
              Contact Sales
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We offer tailored solutions for larger organizations with specific needs.
            Our team will work with you to create a custom package.
          </p>
          <Button variant="outline" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>
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

export default PricingPlans;
