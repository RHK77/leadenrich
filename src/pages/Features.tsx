
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { toast } from "sonner";

const Features = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);

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
  
  // Timer effect
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
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div ref={circlesRef} className="pointer-events-none fixed inset-0 z-50">
        <div className="cursor absolute h-3 w-3 rounded-full bg-gold -translate-x-1/2 -translate-y-1/2"></div>
        <div className="cursor-follower absolute h-8 w-8 rounded-full border border-gold/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"></div>
      </div>
      
      <main className="container mx-auto pt-24 pb-12">
        <div ref={parallaxRef} className="relative h-[50vh] overflow-hidden mb-20">
          <div className="parallax-item absolute top-16 left-1/4 text-6xl font-bold text-gold">
            Features
          </div>
          <div className="parallax-item absolute bottom-16 right-1/4 text-4xl font-light text-silver">
            That empower you
          </div>
          <div className="parallax-item absolute top-1/3 left-1/3 w-16 h-16 rounded-full bg-gold/20"></div>
          <div className="parallax-item absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-silver/20"></div>
          
          <div className="parallax-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img 
              src="/lovable-uploads/4d44a4fe-dd80-4752-b702-e51cc2368bd3.png" 
              alt="LeadEnrich" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
        
        {timerActive && (
          <div className="fixed bottom-5 right-5 z-40 bg-black border border-gold rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-gold animate-pulse" />
              <h3 className="text-lg font-bold text-gold">Limited Time Offer!</h3>
            </div>
            <p className="mb-3 text-sm">Sign up in the next <span className="text-gold font-bold">{formatTime(timeLeft)}</span> and get <span className="text-gold font-bold">5 EXTRA FREE LEADS</span> (15 total)!</p>
            <Button 
              onClick={handleSignUpSpecial}
              className="w-full bg-gradient-to-r from-gold to-silver hover:from-gold/90 hover:to-silver/90 text-black"
            >
              Claim Special Offer Now
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </main>
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
      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-silver/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-black border border-white/10 rounded-lg p-6 h-full flex flex-col">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gold">{title}</h3>
        <p className="text-white/70 mb-4">{description}</p>
        <div className="mt-auto">
          <Button 
            variant="link" 
            className="text-gold hover:text-silver p-0"
          >
            Learn more →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
