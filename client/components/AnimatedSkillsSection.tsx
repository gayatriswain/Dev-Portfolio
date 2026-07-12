import { useEffect, useRef, useState } from "react";
import { useContent } from "@/hooks/useContent";

import dynamic from "next/dynamic";
const CursorFollowingFace = dynamic(() => import("./CursorFollowingFace"), { ssr: false });
import * as LucideIcons from "lucide-react";

export default function AnimatedSkillsSection() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) return null;

  const skillCategories = content.skillCategories || [];

  return (
    <section id="skills" className="py-8 md:py-24 bg-[#05000a] relative overflow-hidden">
      {/* Stars Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='80' cy='60' r='1' fill='%23ffffff'/%3E%3Ccircle cx='150' cy='30' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='40' cy='140' r='1' fill='%23ffffff'/%3E%3Ccircle cx='120' cy='180' r='0.5' fill='%23ffffff'/%3E%3Ccircle cx='180' cy='110' r='1' fill='%23ffffff'/%3E%3Ccircle cx='90' cy='120' r='0.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="text-center mb-2 md:mb-8 z-20 relative flex flex-col items-center">
          <CursorFollowingFace />
          {content.skillsHeader?.badgeText && (
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-4 py-2 bg-[#1c142c]/50 backdrop-blur-sm rounded-full text-sm font-medium text-red-400 border border-red-500/20">
                {content.skillsHeader.badgeText}
              </span>
            </div>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {content.skillsHeader?.titleMain || "How I Can Contribute &"}
            <span className="block bg-gradient-brand bg-clip-text text-transparent mt-2">
              {content.skillsHeader?.titleHighlight || "My Key Skills"}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {content.skillsHeader?.description || "A comprehensive skill set spanning frontend development, backend systems, and project management to deliver exceptional digital experiences."}
          </p>
        </div>

        {/* Space Light Effect Between Header and Cards */}
        <div className="relative w-full h-px -mt-4 md:-mt-8 mb-4 md:mb-10 flex justify-center pointer-events-none z-0">
          {/* Smooth, blended glowing orb with heavy blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-red-600/30 rounded-full blur-[100px]"></div>
          {/* Core inner highlight for realistic light falloff */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-red-400/40 rounded-full blur-[80px]"></div>
        </div>

        {/* Categorized Skills Layout */}
        <div className="flex flex-col gap-5 relative z-10">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center p-6 bg-[#0a0514]/80 backdrop-blur-md border border-red-500/10 hover:border-red-500/30 transition-all duration-300 rounded-2xl gap-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              {/* Left Category Info */}
              <div className="flex items-center gap-5 w-full lg:w-[280px] flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  {(() => {
                    const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType || LucideIcons.Code2;
                    return <IconComponent size={26} strokeWidth={1.5} />;
                  })()}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-white font-bold text-lg tracking-wide">{category.title}</h3>
                  <p className="text-gray-400 text-[13px] font-medium leading-snug mt-0.5">{category.subtitle}</p>
                </div>
              </div>

              {/* Right Skills Icons */}
              <div className="flex flex-nowrap items-start gap-4 lg:gap-5 w-full overflow-x-auto hide-scrollbar py-2" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="flex flex-col items-center gap-2 group cursor-pointer min-w-[60px] flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#150e24] flex items-center justify-center border border-red-500/10 group-hover:border-red-400/50 group-hover:bg-[#1c142c] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_5px_15px_rgba(168,85,247,0.2)]">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-6 h-6 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 filter grayscale-[20%] group-hover:grayscale-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://img.icons8.com/ios-filled/50/ffffff/code.png";
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium group-hover:text-red-300 transition-colors duration-300 text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 md:mt-20">
          <p className="text-gray-400 mb-6 text-[16px]">
            {content.skillsFooter?.description || "Passionate about continuous learning and staying current with the latest technologies"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {(content.skillsFooter?.points || [
              "Performance & Optimization",
              "Responsive & Adaptive Design",
              "UI/UX Implementation",
              "Team Leadership",
            ]).map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[#150e24]/80 backdrop-blur-xl rounded-full text-sm font-medium text-gray-300 border border-red-500/20 hover:border-red-400/50 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Orbit Animation (Full Width) */}
      <div className="w-full mt-24 relative z-10">

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
