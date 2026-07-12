import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function HeroSection() {
  const { data: content, isLoading } = useContent();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    if (content?.hero?.roles && content.hero.roles.length > 0) {
      const interval = setInterval(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % content.hero.roles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [content]);

  if (isLoading || !content) return null;

  const { hero } = content;

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0c0c0c]"
    >
      {/* Background Pillars Effect */}
      <div className="absolute inset-0 flex z-0">
        <div className="w-full md:w-[50%] h-full flex">
          {[...Array(7)].map((_, i) => {
             // 3D cylindrical gradient: sharp black gap, bright peak highlight, smooth dropoff to deep shadow
             const backgroundStyle = `linear-gradient(90deg, #000000 0%, #000000 2%, #1f1f1f 4%, #2a2a2a 12%, #141414 30%, #080808 70%, #030303 95%, #000000 100%)`;

             return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  mass: 1,
                  delay: i * 0.08, 
                }}
                className="flex-1 h-full"
                style={{ background: backgroundStyle, transformOrigin: "left" }}
              >
              </motion.div>
            )
          })}
        </div>
        
        {/* Top Center Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] pointer-events-none z-0">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2 }}
             className="w-full h-full bg-[radial-gradient(ellipse_at_top,_#ff0033_0%,_transparent_80%)] blur-[100px]"
           ></motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full mt-10 px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 0.6 
          }}
          className="mb-4 flex items-center justify-center text-4xl md:text-6xl lg:text-[5rem] font-bold text-gray-200 tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <span className="text-gray-400/80 mr-4 font-medium">&lt;</span>
          <div className="relative flex items-center justify-center h-[1.3em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRoleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
                className="whitespace-nowrap inline-block"
              >
                {hero.roles[currentRoleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-gray-400/80 ml-4 font-medium">/&gt;</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.7 }}
          className="text-xl md:text-3xl text-gray-300 tracking-wide font-light mb-6"
        >
          {hero.name}
        </motion.p>

        {hero.description && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.8 }}
            className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {hero.description}
          </motion.p>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            className="hover:scale-105 transition-transform text-lg px-8 py-6 rounded-full bg-white hover:bg-gray-200 text-black border-none tracking-wider font-bold shadow-lg"
            asChild
          >
            <a href={hero.primaryButtonLink || "#projects"}>
              {hero.primaryButtonText || "View Projects"}
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="hover:scale-105 transition-transform text-lg px-8 py-6 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white tracking-wider font-bold shadow-lg"
            asChild
          >
            <a href={hero.secondaryButtonLink || "#contact"}>
              {hero.secondaryButtonText || "Contact Me"}
            </a>
          </Button>
        </motion.div>

        {/* Social icons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 20, delay: 1.0 }}
          className="flex justify-center"
        >
          <div className="flex gap-6">
            {hero.social?.github && (
              <a
                href={hero.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            )}
            {hero.social?.linkedin && (
              <a
                href={hero.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
