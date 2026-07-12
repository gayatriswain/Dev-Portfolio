import React from "react";
import { useContent } from "@/hooks/useContent";

export default function TechStackOrbit() {
  const { data: content } = useContent();
  const orbitData = content?.techStackOrbit;
  
  // Specific icons for exact match (fallback to original if not found)
  const row1Icons = orbitData?.row1Icons || [
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", label: "Figma" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C++" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", label: "Redux" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML5" }
  ];

  const row2Icons = orbitData?.row2Icons || [
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg", label: "Adobe XD" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", label: "Next.js" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", label: "Sass" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", label: "Illustrator" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express" },
    { url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" }
  ];

  const smallIcons = orbitData?.smallIcons || {
    linkedin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    ai: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    gatsby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gatsby/gatsby-original.svg",
    js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    xd: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
    figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    code: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent pt-16 pb-12 flex flex-col items-center font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header text */}
      <div className="text-center z-20 mb-16 px-4">
        <h2 className="text-[28px] md:text-[40px] text-white font-bold mb-4 tracking-tight">
          {orbitData?.titlePrefix || "I'm currently looking to join a"} <span className="text-transparent bg-clip-text bg-gradient-brand">{orbitData?.titleHighlight || "cross-functional team"}</span>
        </h2>
        <p className="text-gray-400 md:text-[20px] font-light max-w-2xl mx-auto">
          {orbitData?.description || "that values improving people's lives through accessible design, scalable performance, and continuous innovation."}
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Top Icons Containers */}
        <div className="flex flex-col items-center gap-6 z-20 w-full mt-4">
          {/* Row 1 (7 icons) */}
          <div className="flex gap-5 md:gap-8 justify-center">
            {row1Icons.map((item, i) => (
              <div key={`row1-${i}`} className="flex flex-col items-center gap-3" style={{ animation: `float-${(i % 5) + 1} 3s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-gradient-to-b from-[#2a2438] to-[#1c1825] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-red-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:border-red-400/50 hover:scale-110 transition-all duration-300">
                  <img src={item.url} alt={item.label} className="w-[55%] h-[55%] object-contain drop-shadow-md" />
                </div>
                
              </div>
            ))}
          </div>
          {/* Row 2 (6 icons) */}
          <div className="flex gap-5 md:gap-8 justify-center">
            {row2Icons.map((item, i) => (
              <div key={`row2-${i}`} className="flex flex-col items-center gap-3 relative z-20" style={{ animation: `float-${(i % 5) + 1} 4s ease-in-out infinite`, animationDelay: `${i * 0.2 + 1}s` }}>
                <div className="w-14 h-14 md:w-[72px] md:h-[72px] bg-gradient-to-b from-[#2a2438] to-[#1c1825] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-red-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:border-red-400/50 hover:scale-110 transition-all duration-300">
                  <img src={item.url} alt={item.label} className="w-[55%] h-[55%] object-contain drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Connection Lines area */}
        <div className="absolute top-[148px] left-1/2 -translate-x-1/2 w-[592px] h-[321px] pointer-events-none z-10 hidden md:block">
           <svg className="w-full h-full" viewBox="0 0 592 321" preserveAspectRatio="none">
             {/* Top of red sphere target for lines: x=296, y=321 */}
             <path d="M 36 0 C 36 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" />
             <path d="M 140 0 C 140 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
             <path d="M 244 0 C 244 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
             <path d="M 348 0 C 348 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} />
             <path d="M 452 0 C 452 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
             <path d="M 556 0 C 556 150, 296 200, 296 321" stroke="#7e22ce" strokeWidth="1.5" strokeOpacity="0.4" fill="none" className="animate-[pulse_3s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }} />
           </svg>
        </div>

        {/* Wrapper to handle scaled element's document flow height */}
        <div className="relative w-full h-[230px] sm:h-[325px] md:h-[487px] lg:h-[650px] mt-10 z-0 flex justify-center">
          <div className="absolute top-0 w-[1250px] min-w-[1250px] h-[650px] overflow-hidden flex justify-center scale-[0.35] sm:scale-50 md:scale-75 lg:scale-100 origin-top">
          
          {/* Main glowing sphere in center */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[#ff0033] rounded-full blur-[70px] opacity-100 pointer-events-none z-10"></div>
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-[#cc0029] rounded-full shadow-[0_0_100px_rgba(255,0,51,1)] z-20 flex items-center justify-center">
            {/* Hourglass-like white logo */}
            <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18H48" stroke="white" strokeWidth="5" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"/>
              <path d="M48 18L18 30L45 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"/>
              <path d="M12 42H48" stroke="white" strokeWidth="5" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"/>
            </svg>
          </div>

          {/* Masked wrapper for rings so they fade into the distance at the top but remain faintly visible */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 10%, rgba(0,0,0,1) 60%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 10%, rgba(0,0,0,1) 60%)' }}>
            
            {/* Ring 1 */}
            <div className="absolute top-1/2 left-1/2 w-[950px] h-[950px]" style={{ transform: 'translate(-50%, -50%) rotateX(70deg)', transformStyle: 'preserve-3d' }}>
              <div className="w-full h-full rounded-[50%] border border-red-400/20" style={{ animation: 'spin 25s linear infinite', transformStyle: 'preserve-3d' }}>
                 <div className="absolute left-[-12px] top-[calc(50%-12px)] w-6 h-6" style={{ animation: 'spin 25s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.linkedin} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute right-[-12px] top-[calc(50%-12px)] w-6 h-6" style={{ animation: 'spin 25s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.react} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute left-[15%] top-[15%] w-6 h-6" style={{ animation: 'spin 25s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.ai} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Ring 2 */}
            <div className="absolute top-1/2 left-1/2 w-[1050px] h-[1050px]" style={{ transform: 'translate(-50%, -50%) rotateX(70deg)', transformStyle: 'preserve-3d' }}>
              <div className="w-full h-full rounded-[50%] border border-red-400/20" style={{ animation: 'spin 35s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                 <div className="absolute left-[-14px] top-[calc(50%-14px)] w-7 h-7" style={{ animation: 'spin 35s linear infinite', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.gatsby} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute right-[8%] top-[25%] w-6 h-6" style={{ animation: 'spin 35s linear infinite', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.js} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
              </div>
            </div>

            {/* Ring 3 */}
            <div className="absolute top-1/2 left-1/2 w-[1150px] h-[1150px]" style={{ transform: 'translate(-50%, -50%) rotateX(70deg)', transformStyle: 'preserve-3d' }}>
              <div className="w-full h-full rounded-[50%] border border-red-400/20" style={{ animation: 'spin 45s linear infinite', transformStyle: 'preserve-3d' }}>
                 <div className="absolute right-[15%] bottom-[15%] w-6 h-6" style={{ animation: 'spin 45s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.code} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute left-[8%] bottom-[25%] w-7 h-7" style={{ animation: 'spin 45s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.css} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute right-[25%] bottom-[2%] w-6 h-6" style={{ animation: 'spin 45s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-70 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.figma} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
              </div>
            </div>

            {/* Ring 4 */}
            <div className="absolute top-1/2 left-1/2 w-[1250px] h-[1250px]" style={{ transform: 'translate(-50%, -50%) rotateX(70deg)', transformStyle: 'preserve-3d' }}>
              <div className="w-full h-full rounded-[50%] border border-red-400/20" style={{ animation: 'spin 55s linear infinite reverse', transformStyle: 'preserve-3d' }}>
                 <div className="absolute left-[20%] bottom-[8%] w-6 h-6" style={{ animation: 'spin 55s linear infinite', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-90 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.ai} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute right-[-12px] top-[calc(50%-12px)] w-6 h-6" style={{ animation: 'spin 55s linear infinite', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-70 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.js} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
                 <div className="absolute top-[10%] left-[60%] w-6 h-6" style={{ animation: 'spin 55s linear infinite', transformStyle: 'preserve-3d' }}>
                   <div className="w-full h-full opacity-70 flex items-center justify-center" style={{ transform: 'rotateX(-70deg)' }}>
                      <img src={smallIcons.xd} alt="icon" className="w-full h-full grayscale"/>
                   </div>
                 </div>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  );
}
