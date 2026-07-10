"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const FloatingContact = () => {
  const { data: content } = useContent();
  const phoneNumber = content?.contact?.phone || "919289432640";
  const email = content?.contact?.email || "gayatrisain2003@gmail.com";
  const message = "Hello! I'd like to get in touch with you.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent("Inquiry from Portfolio")}&body=${encodeURIComponent(message)}`;
  const telUrl = `tel:+${phoneNumber}`;

  const buttonVariants = {
    initial: { opacity: 1, scale: 1, x: 0 },
    animate: { opacity: 1, scale: 1, x: 0 },
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3">
      {/* Call Button */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        custom={0}
      >
        <motion.a
          href={telUrl}
          aria-label="Call Me"
          className="relative flex items-center justify-center w-11 h-11 bg-[#0ea5e9] text-white rounded-full shadow-lg hover:shadow-[#0ea5e9]/40 transition-shadow duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Tooltip */}
          <span className="absolute left-14 bg-black text-slate-900 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap pointer-events-none border border-slate-100">
            Call me!
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-slate-100 rotate-45"></span>
          </span>

          <Phone size={18} className="relative z-10" />
        </motion.a>
      </motion.div>

      {/* Email Button */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        custom={1}
      >
        <motion.a
          href={mailtoUrl}
          aria-label="Send Email"
          className="relative flex items-center justify-center w-11 h-11 bg-[#8B5CF6] text-white rounded-full shadow-lg hover:shadow-[#8B5CF6]/40 transition-shadow duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Tooltip */}
          <span className="absolute left-14 bg-black text-slate-900 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap pointer-events-none border border-slate-100">
            Email me!
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-slate-100 rotate-45"></span>
          </span>

          <Mail size={18} className="relative z-10" />
        </motion.a>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        custom={2}
      >
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-11 h-11 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-shadow duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated Pulsing Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>
          
          {/* Tooltip */}
          <span className="absolute left-14 bg-black text-slate-900 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap pointer-events-none border border-slate-100">
            Chat with me!
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-slate-100 rotate-45"></span>
          </span>

          <FaWhatsapp size={22} className="relative z-10" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default FloatingContact;
