
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

const Features = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  
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
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="Lead Enrichment" 
            description="Automatically enhance your B2B leads with comprehensive company data, saving hours of manual research." 
            icon="🔍"
          />
          <FeatureCard 
            title="AI Email Generation" 
            description="Create personalized outreach emails tailored to each prospect's specific industry and pain points." 
            icon="✉️"
          />
          <FeatureCard 
            title="Multiple Data Sources" 
            description="Import your leads from CSV, Excel, Notion, or Airtable to seamlessly integrate with your existing workflow." 
            icon="📊"
          />
          <FeatureCard 
            title="Interactive Dashboard" 
            description="Track your lead enrichment and email generation progress with a beautiful, responsive dashboard." 
            icon="📈"
          />
          <FeatureCard 
            title="Free Trial" 
            description="Start with 10 free leads to experience the full power of our platform before committing." 
            icon="🎁"
          />
          <FeatureCard 
            title="Export Options" 
            description="Download your enriched leads and generated emails in multiple formats for easy integration." 
            icon="💾"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-silver/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-black border border-white/10 rounded-lg p-6 h-full flex flex-col">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gold">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default Features;
