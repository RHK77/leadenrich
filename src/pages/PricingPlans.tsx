
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPlans = () => {
  const navigate = useNavigate();
  const [showPromotion, setShowPromotion] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple">("card");

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

  const handleSubscribe = () => {
    setShowPaymentDialog(true);
  };

  const handlePayment = (method: "card" | "apple") => {
    setPaymentMethod(method);
    
    // Here we would connect to Stripe for payment
    toast.info(`Redirecting to ${method === "card" ? "Stripe" : "Apple Pay"} for payment processing...`);
    
    // In a real implementation, we would redirect to Stripe checkout
    setTimeout(() => {
      setShowPaymentDialog(false);
      toast.success("Thank you for subscribing to the Pro plan!");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          LeadEnrich Pro Plan
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Generate personalized B2B sales emails for the hemp industry using AI. Start with a 14-day free trial.
        </p>
        
        <div className="max-w-3xl mx-auto">
          {/* Pro Plan */}
          <div className="border rounded-lg p-8 flex flex-col bg-black text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              INCLUDES 14-DAY FREE TRIAL
            </div>
            <h3 className="text-3xl font-semibold mb-2">Pro Plan</h3>
            <p className="text-zinc-400 mb-4">For hemp industry businesses</p>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold">$49</span>
              <span className="text-zinc-400 ml-2">/ month</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span><strong>100 lead enrichments</strong> per month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Hemp industry-specific insights</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Advanced email personalization</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>CSV, Excel file upload formats</span>
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
            
            <Button className="bg-white text-black hover:bg-zinc-200 text-lg py-6" onClick={handleSubscribe}>
              Start 14-Day Free Trial
            </Button>
            
            <p className="text-zinc-400 text-center mt-4 text-sm">
              No credit card required for trial. Cancel anytime.
            </p>
          </div>

          {/* Features explanation */}
          <div className="mt-12 bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">What's included in the Pro Plan?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Lead Enrichment</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Detailed company profiles</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Hemp cultivation methods</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Product offerings analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Certifications and compliance</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Email Generation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Industry-specific templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>AI personalization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Pain point targeting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-success mr-2 mt-1" />
                    <span>Compliance-aware messaging</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <h4 className="font-semibold text-amber-800">Lead Limit Explained</h4>
              <p className="text-amber-700 text-sm mt-1">
                Your plan includes 100 lead enrichments per month. If you upload a file with more than 100 contacts, 
                we'll process the first 100 leads in that file. Additional leads will require a plan upgrade.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We offer tailored solutions for larger hemp industry organizations with specific needs.
            Our team will work with you to create a custom package.
          </p>
          <Button variant="outline" onClick={() => navigate("/contact")}>
            Contact Us
          </Button>
        </div>
      </main>
      
      {/* Time-Limited Promotion Dialog */}
      {showPromotion && (
        <Dialog open={showPromotion} onOpenChange={setShowPromotion}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Limited Time Offer!</DialogTitle>
              <DialogDescription className="text-lg pt-2">
                Sign up in the next <span className="font-bold text-black">{formatTime(remainingTime)}</span> and get <span className="font-bold text-black">14 DAYS FREE</span> with our Pro plan!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 pt-4">
              <p>
                Our Pro plan includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>100 lead enrichments per month</li>
                <li>Hemp industry-specific insights</li>
                <li>Custom email generation</li>
                <li>Multiple file formats</li>
                <li>Hemp compliance awareness</li>
              </ul>
              <div className="flex justify-between gap-4 pt-2">
                <Button variant="outline" onClick={() => setShowPromotion(false)} className="w-1/2">
                  Maybe Later
                </Button>
                <Button onClick={() => {
                  setShowPromotion(false);
                  handleSubscribe();
                }} className="w-1/2 bg-black text-white hover:bg-gray-800">
                  Claim Free Trial
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Choose Payment Method</DialogTitle>
            <DialogDescription>
              Your 14-day free trial starts today. You won't be charged until the trial ends.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="card" className="mt-4" onValueChange={(value) => setPaymentMethod(value as "card" | "apple")}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Credit Card</span>
              </TabsTrigger>
              <TabsTrigger value="apple" className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                <span>Apple Pay</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Secure payment processing by Stripe. Your card details are never stored on our servers.
              </p>
            </TabsContent>
            
            <TabsContent value="apple" className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Quick and secure payment with Apple Pay. Available on compatible devices only.
              </p>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-between mt-4">
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handlePayment(paymentMethod)} className="gap-2">
              {paymentMethod === "card" ? (
                <>
                  <CreditCard className="h-4 w-4" />
                  Continue with Card
                </>
              ) : (
                <>
                  <Apple className="h-4 w-4" />
                  Continue with Apple Pay
                </>
              )}
            </Button>
          </DialogFooter>
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
