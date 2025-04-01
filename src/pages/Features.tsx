
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalComWidget from "@/components/CalComWidget";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Features = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAbandonmentPopup, setShowAbandonmentPopup] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());
  const inactivityTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (parallaxRef.current) {
        const parallaxItems = parallaxRef.current.querySelectorAll('.parallax-item');
        
        parallaxItems.forEach((item, index) => {
          const speed = index * 0.03 + 0.03;
          const x = (window.innerWidth - e.clientX * speed) / 100;
          const y = (window.innerHeight - e.clientY * speed) / 100;
          
          const htmlItem = item as HTMLElement;
          htmlItem.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
      }
      
      if (circlesRef.current) {
        const cursor = circlesRef.current.querySelector('.cursor') as HTMLElement;
        const follower = circlesRef.current.querySelector('.cursor-follower') as HTMLElement;
        
        if (cursor) {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }
        
        if (follower) {
          follower.style.left = `${e.clientX}px`;
          follower.style.top = `${e.clientY}px`;
        }
      }
      
      // Reset inactivity timer
      setLastInteraction(Date.now());
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Check if timer should be active (based on localStorage)
    const shouldActivate = localStorage.getItem("specialOfferSeen") !== "true";
    if (shouldActivate) {
      setTimerActive(true);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Timer effect for promotional offer
  useEffect(() => {
    let timer: number | null = null;
    
    if (timerActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      localStorage.setItem("specialOfferSeen", "true");
      toast.info("Special offer has ended. You can still get 10 free leads when you sign up!");
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timeLeft]);
  
  // Inactivity tracker
  useEffect(() => {
    // Check for inactivity every second
    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastInteraction;
      
      // If inactive for 30 seconds and not showing popup already
      if (inactiveTime > 30000 && !showAbandonmentPopup) {
        setShowAbandonmentPopup(true);
      }
    };
    
    const intervalId = setInterval(checkInactivity, 1000);
    
    return () => {
      clearInterval(intervalId);
      if (inactivityTimeout.current) {
        window.clearTimeout(inactivityTimeout.current);
      }
    };
  }, [lastInteraction, showAbandonmentPopup]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const handleSignUpSpecial = () => {
    localStorage.setItem("specialBonus", "true");
    localStorage.setItem("specialOfferSeen", "true");
    setTimerActive(false);
    navigate("/signup");
  };
  
  const handleUserInteraction = () => {
    setLastInteraction(Date.now());
  };
  
  return (
    <div className="min-h-screen bg-white text-black" onClick={handleUserInteraction} onKeyDown={handleUserInteraction}>
      <Navbar />
      
      <div ref={circlesRef} className="pointer-events-none fixed inset-0 z-50">
        <div className="cursor absolute h-3 w-3 rounded-full bg-black -translate-x-1/2 -translate-y-1/2"></div>
        <div className="cursor-follower absolute h-8 w-8 rounded-full border border-black/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"></div>
      </div>
      
      <main className="container mx-auto pt-24 pb-12">
        <div ref={parallaxRef} className="relative h-[50vh] overflow-hidden mb-20">
          <div className="parallax-item absolute top-16 left-1/4 text-6xl font-bold text-black">
            Features
          </div>
          <div className="parallax-item absolute bottom-16 right-1/4 text-4xl font-light text-gray-600">
            That empower you
          </div>
          <div className="parallax-item absolute top-1/3 left-1/3 w-16 h-16 rounded-full bg-black/20"></div>
          <div className="parallax-item absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-gray-300/20"></div>
        </div>
        
        {timerActive && (
          <div className="fixed bottom-5 right-5 z-40 bg-white border border-black rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-black animate-pulse" />
              <h3 className="text-lg font-bold text-black">Limited Time Offer!</h3>
            </div>
            <p className="mb-3 text-sm">Sign up in the next <span className="text-black font-bold">{formatTime(timeLeft)}</span> and get <span className="text-black font-bold">5 EXTRA FREE LEADS</span> (15 total)!</p>
            <Button 
              onClick={handleSignUpSpecial}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Claim Special Offer Now
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            title="Lead Enrichment" 
            description="Automatically enhance your B2B leads with comprehensive company data, saving hours of manual research." 
            icon="🔍"
            link="/feature/lead-enrichment"
          />
          <FeatureCard 
            title="AI Email Generation" 
            description="Create personalized outreach emails tailored to each prospect's specific industry and pain points." 
            icon="✉️"
            link="/feature/ai-email"
          />
          <FeatureCard 
            title="Multiple Data Sources" 
            description="Import your leads from CSV, Excel, Notion, or Airtable to seamlessly integrate with your existing workflow." 
            icon="📊"
            link="/feature/data-sources"
          />
          <FeatureCard 
            title="Interactive Dashboard" 
            description="Track your lead enrichment and email generation progress with a beautiful, responsive dashboard." 
            icon="📈"
            link="/feature/dashboard"
          />
          <FeatureCard 
            title="Free Trial" 
            description="Start with 10 free leads to experience the full power of our platform before committing." 
            icon="🎁"
            link="/feature/free-trial"
          />
          <FeatureCard 
            title="Export Options" 
            description="Download your enriched leads and generated emails in multiple formats for easy integration." 
            icon="💾"
            link="/feature/export-options"
          />
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 bg-black hover:bg-gray-800 text-white"
              onClick={() => navigate("/signup")}
            >
              Start Free Trial
            </Button>
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-black text-black hover:bg-gray-100"
                >
                  <Calendar className="h-4 w-4 mr-2" /> Schedule Demo
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalComWidget username="richard-kamolvathin-wc1yj8" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </main>
      
      {/* Abandonment Popup */}
      <Dialog open={showAbandonmentPopup} onOpenChange={setShowAbandonmentPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Don't Leave Just Yet!
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              We noticed you're exploring our features. 
              Have questions about how LeadEnrich can help your business?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 p-4">
            <p className="text-center">
              Schedule a personalized demo to see how our platform can transform your B2B outreach:
            </p>
            <div className="mx-auto">
              <CalComWidget username="richard-kamolvathin-wc1yj8" />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-4">
            <Button 
              onClick={() => {
                setShowAbandonmentPopup(false);
                navigate("/signup");
              }}
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white"
            >
              Start Free Trial Instead
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAbandonmentPopup(false)}
              className="w-full sm:w-auto text-gray-500 hover:text-gray-700"
            >
              Continue Browsing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string; 
  description: string; 
  icon: string;
  link: string;
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative group cursor-pointer" onClick={() => navigate(link)}>
      <div className="absolute inset-0 bg-gray-100 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mt-auto">
          <Button 
            variant="link" 
            className="text-black hover:text-gray-700 p-0"
          >
            Learn more →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
