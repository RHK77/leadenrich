
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, ArrowRight, Calendar } from "lucide-react";
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

interface FeatureDetailProps {
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  useCases: {title: string; description: string}[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
  };
  image?: string;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({
  title,
  icon,
  description,
  benefits,
  useCases,
  testimonial,
  image
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAbandonmentPopup, setShowAbandonmentPopup] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());
  const [formActive, setFormActive] = useState(false);
  
  useEffect(() => {
    // Check if timer should be active (based on localStorage)
    const shouldActivate = localStorage.getItem("specialOfferSeen") !== "true";
    if (shouldActivate) {
      setTimerActive(true);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
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
      
      // If inactive for 30 seconds, form active, and not showing popup already
      if (inactiveTime > 30000 && formActive && !showAbandonmentPopup) {
        setShowAbandonmentPopup(true);
      }
    };
    
    const intervalId = setInterval(checkInactivity, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [lastInteraction, formActive, showAbandonmentPopup]);
  
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
    <div 
      className="min-h-screen bg-white text-black" 
      onClick={handleUserInteraction} 
      onKeyDown={handleUserInteraction}
    >
      <Navbar />
      
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
      
      <main className="container mx-auto py-24 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-transparent hover:text-black" 
          onClick={() => navigate("/features")}
        >
          ← Back to Features
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-black">{title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-black">Key Benefits</h2>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-black shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-4 mt-8">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white"
                onClick={handleSignUpSpecial}
              >
                Try For Free <ArrowRight className="ml-2 h-4 w-4" />
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
          
          <div className="relative">
            {image ? (
              <img 
                src={image} 
                alt={title} 
                className="rounded-lg shadow-2xl border border-gray-200 w-full h-auto"
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg w-full aspect-video flex items-center justify-center">
                <div className="text-8xl opacity-50">{icon}</div>
              </div>
            )}
            
            {testimonial && (
              <Card className="absolute -bottom-8 -left-8 max-w-md bg-white border border-gray-200 shadow-xl">
                <CardContent className="pt-6">
                  <blockquote className="text-gray-700 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer>
                    <p className="font-semibold text-black">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </footer>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-black">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-black">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div 
          className="rounded-lg bg-gray-100 p-8 text-center"
          onFocus={() => setFormActive(true)}
          onClick={() => setFormActive(true)}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Sign up now and start with 10 free leads to experience the full power of our platform.
            {timerActive && (
              <span className="block mt-2 text-black font-bold">
                Limited time offer: Sign up in the next {formatTime(timeLeft)} to get 5 EXTRA leads!
              </span>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white"
              onClick={handleSignUpSpecial}
            >
              Start Your Free Trial
            </Button>
            <Popover>
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
              Wait Before You Go!
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              We noticed you're interested in {title}. 
              Have questions about how this feature can help your business?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 p-4">
            <p className="text-center">
              Schedule a personalized demo to see how {title} can transform your B2B outreach:
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

export default FeatureDetail;
