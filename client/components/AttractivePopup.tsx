import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Mail, Send, Bell, Star, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";

export default function AttractivePopup() {
  const { data: content } = useContent();
  const popupData = content?.popup;
  const contactData = content?.contact;
  
  const [isMinimized, setIsMinimized] = useState(true);

  const togglePopup = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsMinimized(true); // Minimize when clicked
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isMinimized && (
          <div className="fixed bottom-24 md:bottom-8 right-6 md:right-8 z-[100] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[320px] bg-surface/90 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Background Orbs */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
              
              {/* Close Button */}
              <button 
                onClick={togglePopup}
                className="absolute top-5 right-5 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="relative z-10 p-8 text-center pt-10">
                {/* Header Icon */}
                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-16 h-16 bg-gradient-brand mx-auto rounded-2xl flex items-center justify-center shadow-xl shadow-primary/40 mb-6"
                >
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </motion.div>

                {/* Title & Description */}
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-black text-foreground mb-3 leading-tight tracking-tight"
                >
                  {popupData?.title || "Let's Connect!"}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-muted-foreground mb-6 leading-relaxed"
                >
                  {popupData?.description || "I'm currently open to new opportunities."}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-3"
                >
                  <button
                    onClick={scrollToContact}
                    className="w-full py-3 bg-white hover:bg-neutral-800 text-black rounded-xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    {popupData?.buttonText || "Get in Touch"}
                  </button>
                  <a
                    href={`tel:${contactData?.phone || '9289432640'}`}
                    className="w-full py-3 bg-black/5 border border-white/10 hover:border-primary/50 rounded-xl font-bold text-base text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    Call Me Now
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Minimize Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={togglePopup}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 bg-gradient-brand rounded-full shadow-[0_10px_25px_rgba(168,85,247,0.5)] flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#05000a] animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
