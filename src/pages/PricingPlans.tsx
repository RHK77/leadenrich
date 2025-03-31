
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PricingPlans = () => {
  const navigate = useNavigate();
  const [showPromotion, setShowPromotion] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [showAnnualDialog, setShowAnnualDialog] = useState(false);

  useEffect(() => {
    // Check if we should show the promotion
    const hasSeenPromotion = localStorage.getItem("hasSeenPromotion");
    
    if (!hasSeenPromotion) {
      setShowPromotion(true);
      localStorage.setItem("hasSeenPromotion", "true");
      
      // Start timer
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${minutes}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSubscribe = (plan: string) => {
    if (plan === "enterprise") {
      navigate("/contact");
      return;
    }
    
    if (plan === "annual") {
      setShowAnnualDialog(true);
      return;
    }
    
    // Here we would connect to Stripe for payment
    toast.info(`Redirecting to Stripe for ${plan} subscription...`);
    // Placeholder for Stripe integration
    // In a real implementation, we would redirect to Stripe checkout
  };

  const handlePromoSignup = () => {
    if (remainingTime > 0) {
      toast.success("Congratulations! You'll receive 5 extra leads with your free trial!");
      localStorage.setItem("extraLeads", "true");
    }
    setShowPromotion(false);
    navigate("/signup");
  };

  const closePromotion = () => {
    setShowPromotion(false);
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
        
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
              <li className="flex items-start">
                <X className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                <span className="text-muted-foreground">Database storage</span>
              </li>
            </ul>
            
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign Up Free
            </Button>
          </div>
          
          {/* Basic Email Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Email Leads</h3>
            <p className="text-muted-foreground mb-4">For email outreach</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$1-20</span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Random leads via email</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Verified contact info</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Company profiles</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Basic database access</span>
              </li>
            </ul>
            
            <Button variant="outline" onClick={() => handleSubscribe("email")}>
              Subscribe Now
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
                <span>100 lead enrichments monthly</span>
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
                <span>Full database storage</span>
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
          
          {/* Annual Plan */}
          <div className="border rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-semibold mb-2">Annual Pro</h3>
            <p className="text-muted-foreground mb-4">For high-volume users</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold">$250</span>
              <span className="text-muted-foreground ml-2">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>1000 lead enrichments monthly</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Everything in Pro plan</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>12-month commitment required</span>
              </li>
            </ul>
            
            <Button variant="outline" onClick={() => handleSubscribe("annual")}>
              Get Annual Deal
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
      
      {/* Time-Limited Promotion Dialog */}
      {showPromotion && (
        <Dialog open={showPromotion} onOpenChange={closePromotion}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Limited Time Offer!</DialogTitle>
              <DialogDescription className="text-lg pt-2">
                Sign up in the next <span className="font-bold text-black">{formatTime(remainingTime)}</span> and get <span className="font-bold text-black">5 EXTRA FREE LEADS</span> on top of your free trial!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              <p>
                Our lead enrichment service provides detailed business information including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Business name and contact details</li>
                <li>Decision maker names and emails</li>
                <li>Address and phone numbers</li>
                <li>Company profile summary</li>
                <li>Revenue estimates and employee count</li>
              </ul>
              <div className="flex justify-between gap-4 pt-2">
                <Button variant="outline" onClick={closePromotion} className="w-1/2">
                  Maybe Later
                </Button>
                <Button onClick={handlePromoSignup} className="w-1/2 bg-black text-white hover:bg-gray-800">
                  Claim Offer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Annual Plan Dialog */}
      <Dialog open={showAnnualDialog} onOpenChange={setShowAnnualDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>12-Month Annual Commitment</DialogTitle>
            <DialogDescription>
              By subscribing to our Annual Pro plan, you agree to a 12-month commitment at $250/month, 
              billed monthly. This represents significant savings compared to the monthly Pro plan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => setShowAnnualDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAnnualDialog(false);
              toast.info("Redirecting to Stripe for Annual Pro subscription...");
            }}>
              Confirm Subscription
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
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
