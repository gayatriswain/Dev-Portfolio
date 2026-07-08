import { useRef } from "react";
import { Star, Calendar, MapPin, Briefcase, ChevronRight, Award, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import dynamic from "next/dynamic";

const CursorFollowingDuck = dynamic(() => import("./CursorFollowingDuck"), { ssr: false });

const TimelineItem = ({
  company,
  logo,
  role,
  duration,
  location = "Remote",
  rating = 5,
  description,
  achievements,
  index,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center mb-24 md:mb-32 ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Connector line for mobile */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-border/20 md:hidden"></div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`w-full md:w-[45%] pl-20 md:pl-0 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
      >
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="group relative bg-surface/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl hover:shadow-primary/10 overflow-hidden"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Header Info */}
          <div className={`flex flex-col ${index % 2 === 0 ? "items-start" : "md:items-end items-start"} mb-6 relative z-10`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 group-hover:bg-primary/20 transition-colors duration-500">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase opacity-70">Timeline</span>
                <span className="text-sm font-bold text-foreground/90">{duration}</span>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-500">
              {role}
            </h3>
            <p className="text-xl font-medium text-muted-foreground">{company}</p>
          </div>

          {/* Meta Badges */}
          <div className={`flex flex-wrap items-center gap-3 mb-6 ${index % 2 === 0 ? "" : "md:justify-end"} relative z-10`}>
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 backdrop-blur-md bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < rating ? "text-yellow-500 fill-yellow-500" : "text-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className={`text-muted-foreground/80 leading-relaxed mb-8 text-lg relative z-10 ${index % 2 === 0 ? "" : "md:text-right"}`}>
            {description}
          </p>

          {/* Achievements Grid */}
          <div className="space-y-4 relative z-10">
            {achievements?.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`flex items-start gap-3 group/item ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                <div className="mt-1.5 flex-shrink-0 p-1 bg-primary/10 rounded-lg group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                  <ChevronRight className="w-3.5 h-3.5 text-primary group-hover/item:text-white" />
                </div>
                <span className="text-[15px] text-muted-foreground/90 group-hover/item:text-foreground transition-colors duration-300 line-height-[1.6]">
                  {achievement}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Decorative Corner Element */}
          <div className={`absolute -bottom-6 ${index % 2 === 0 ? "-right-6" : "-left-6"} w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700`}></div>
        </motion.div>
      </motion.div>

      {/* Center Pivot Point */}
      <div className="absolute left-8 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <div className="relative">
          {/* Animated rings */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -inset-8 bg-primary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute -inset-4 border border-primary/30 border-dashed rounded-full"
          />
          
          {/* Core Dot */}
          <div className="w-10 h-10 md:w-14 md:h-14 bg-background border-[3px] border-primary/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.3)] backdrop-blur-xl relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-brand opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),1)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Spacer for alternating desktop layout */}
      <div className="hidden md:block md:w-[45%]"></div>
    </div>
  );
};

export default function AnimatedTimelineSection() {
  const { data: content } = useContent();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!content) return null;

  const experienceData = content.experience || [];

  return (
    <section
      id="experience"
      className="py-8 md:py-32 bg-background relative overflow-hidden"
      ref={containerRef}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* 3D Duck Face at the top */}
        <div className="flex justify-center mb-2 md:mb-8 relative z-20">
          <CursorFollowingDuck />
        </div>

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-24">
          {content.experienceHeader?.badgeText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary/5 backdrop-blur-md rounded-full text-sm font-semibold text-primary border border-primary/10 mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{content.experienceHeader.badgeText.replace('✨ ', '').replace('🎯 ', '')}</span>
            </motion.div>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight"
          >
            {content.experienceHeader?.titleMain || "Professional"} <span className="text-primary italic">{content.experienceHeader?.titleHighlight || "Journey"}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {content.experienceHeader?.description || "A chronicle of my professional growth, technical expertise, and the impactful solutions I've delivered across the digital landscape."}
          </motion.p>
        </div>

        {/* Timeline Hub */}
        <div className="relative mt-16 px-4">
          {/* Center Line Desktop */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/20 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
            />
          </div>

          {/* Experience Items */}
          <div className="relative z-10">
            {experienceData.map((experience, index) => (
              <TimelineItem key={index} {...experience} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section: "Let's Create the Future Together" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-40 relative group"
        >
          {/* Animated Background Orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }}></div>

          <div className="relative overflow-hidden bg-surface/20 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-20 text-center">
            {/* Ambient Background Animation */}
            <motion.div 
              animate={{ 
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(var(--primary), 0.05) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(var(--primary), 0.05) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, rgba(var(--primary), 0.05) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, rgba(var(--primary), 0.05) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* Content Container */}
            <div className="relative z-20 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-foreground/80 text-sm font-bold tracking-[0.2em] uppercase mb-10 shadow-inner"
              >
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                {content.collaborationsCta?.badgeText?.replace('✨ ', '') || "Collaborations"}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter leading-[1.1]"
              >
                {content.collaborationsCta?.titleMain || "Let's Create the"} <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-text bg-clip-text text-transparent">
                  {content.collaborationsCta?.titleHighlight || "Future Together"}
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-muted-foreground mb-12 leading-relaxed"
              >
                {content.collaborationsCta?.description || "I’m always open to new challenges and opportunities to innovate. Whether you have a groundbreaking idea or a complex problem, let’s build something extraordinary."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <a href={content.collaborationsCta?.primaryButtonLink || "#"} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn relative px-10 py-5 bg-foreground text-background rounded-2xl font-black text-xl overflow-hidden transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center gap-3 group-hover/btn:text-white">
                      {content.collaborationsCta?.primaryButtonText || "Download Resume"}
                      <Award className="w-6 h-6" />
                    </span>
                  </motion.button>
                </a>

                <a href={content.collaborationsCta?.secondaryButtonLink || "#contact"} onClick={(e) => {
                  if (content.collaborationsCta?.secondaryButtonLink === "#contact" || !content.collaborationsCta?.secondaryButtonLink) {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn2 relative px-10 py-5 bg-white/5 border border-white/10 hover:border-primary/50 text-foreground rounded-2xl font-bold text-xl backdrop-blur-xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {content.collaborationsCta?.secondaryButtonText || "Contact Me"}
                      <ChevronRight className="w-5 h-5 group-hover/btn2:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </a>
              </motion.div>
            </div>

            {/* Decorative Floating Icons */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 hidden lg:block opacity-20"
            >
              <Briefcase className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-20 hidden lg:block opacity-20"
            >
              <Star className="w-12 h-12 text-accent" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
