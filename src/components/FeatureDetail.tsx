
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, ArrowRight } from "lucide-react";

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
  
  useEffect(() => {
    // Check if timer should be active (based on localStorage)
    const shouldActivate = localStorage.getItem("specialOfferSeen") !== "true";
    if (shouldActivate) {
      setTimerActive(true);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
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
      
      <main className="container mx-auto py-24 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-transparent hover:text-gold" 
          onClick={() => navigate("/features")}
        >
          ← Back to Features
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gold">{title}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {description}
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-silver">Key Benefits</h2>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-gold shrink-0 mt-0.5" />
                  <span className="text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex gap-4 mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold to-silver hover:from-gold/90 hover:to-silver/90 text-black"
                onClick={handleSignUpSpecial}
              >
                Try For Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/50 text-gold hover:bg-gold/10"
                onClick={() => navigate("/pricing")}
              >
                View Pricing
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {image ? (
              <img 
                src={image} 
                alt={title} 
                className="rounded-lg shadow-2xl border border-white/10 w-full h-auto"
              />
            ) : (
              <div className="bg-gradient-to-br from-gold/20 to-silver/20 rounded-lg w-full aspect-video flex items-center justify-center">
                <div className="text-8xl opacity-50">{icon}</div>
              </div>
            )}
            
            {testimonial && (
              <Card className="absolute -bottom-8 -left-8 max-w-md bg-black border border-gold/20 shadow-xl">
                <CardContent className="pt-6">
                  <blockquote className="text-white/80 italic mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer>
                    <p className="font-semibold text-gold">{testimonial.author}</p>
                    <p className="text-sm text-white/60">{testimonial.company}</p>
                  </footer>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-silver">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="bg-black border border-white/10 hover:border-gold/30 transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2 text-gold">{useCase.title}</h3>
                <p className="text-white/70">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="rounded-lg bg-gradient-to-r from-gold/20 to-silver/20 p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
            Sign up now and start with 10 free leads to experience the full power of our platform.
            {timerActive && (
              <span className="block mt-2 text-gold font-bold">
                Limited time offer: Sign up in the next {formatTime(timeLeft)} to get 5 EXTRA leads!
              </span>
            )}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-gold to-silver hover:from-gold/90 hover:to-silver/90 text-black"
            onClick={handleSignUpSpecial}
          >
            Start Your Free Trial
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FeatureDetail;
