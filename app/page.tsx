"use client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AstroSection3D from "@/components/About.a4b7c8d9.jsx";
import AnimatedSkillsSection from "@/components/AnimatedSkillsSection";
import AnimatedTimelineSection from "@/components/AnimatedTimelineSection";
import ProjectsSection from "@/components/ProjectsSection";
import AttractivePopup from "@/components/AttractivePopup";
import { useContent } from "@/hooks/useContent";



import { Button } from "@/components/ui/button";
import {
  Mail,
  Code,
  Palette,
  Zap,
  Users,
  Star,
  ChevronRight,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";
import ContactSection from "@/components/ContactSection";







const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const { data: content } = useContent();
  const footerData = content?.footer;
  const contactData = content?.contact;
  
  return (
    <footer id="contact" className="py-20 bg-surface border-t border-border/20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent mb-6">
              {footerData?.brandName || "GAYATRI SWAIN"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md text-lg leading-relaxed">
              {footerData?.description || "Designing and developing modern, high-performance, and responsive web experiences."}
            </p>
            <div className="space-y-4">
              <a 
                href={`mailto:${contactData?.email || 'gayatrisain2003@gmail.com'}`} 
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span>{contactData?.email || "gayatrisain2003@gmail.com"}</span>
              </a>
              <a 
                href={`tel:${contactData?.phone || '9289432640'}`} 
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span>{contactData?.phone || "9289432640"}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-xl">Expertise</h4>
            <ul className="space-y-4 text-muted-foreground">
              {(footerData?.expertise || ["Web Development", "WordPress Development", "Shopify Development"]).map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 text-xl">Useful Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              {(footerData?.usefulLinks || [
                { label: "About", url: "#about" },
                { label: "Experience", url: "#experience" },
                { label: "Portfolio", url: "#projects" },
                { label: "Contact", url: "#contact" }
              ]).map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border/10 text-center text-muted-foreground">
          <p className="text-sm">
            © {currentYear} | {footerData?.copyrightText || "Designed & Developed by Gayatri Swain"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AstroSection3D />
      <AnimatedSkillsSection />
      <AnimatedTimelineSection />
      <ProjectsSection/>
      <ContactSection/>
      
      <FooterSection />
      <AttractivePopup />
    </div>
  );
}
