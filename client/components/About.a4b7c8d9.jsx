import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  MapPin, 
  Calendar,
  Code2,
  Zap,
  ArrowRight,
  Star,
  Briefcase,
  GraduationCap,
  Globe,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const ICON_MAP = {
  Calendar,
  Briefcase,
  GraduationCap
};

export default function Index() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) return null;

  const { about } = content;

  return (
    <div id="about" className="bg-black relative overflow-hidden">
      {/* Sophisticated Dark Background */}
     
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.02]"></div>
      
      {/* Animated Floating Elements */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-gradient-to-r from-pink-500/8 to-rose-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Additional floating particles removed for cleaner look */}

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-12 pb-6 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Sophisticated Profile */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group" style={{animationDuration: '4s'}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-pink-400/20 to-rose-400/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 animate-pulse"></div>
              <div className="relative w-72 md:w-80 lg:w-96 aspect-[3/4] rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl border border-gray-700/50 hover:scale-[1.02] transition-transform duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden border border-gray-800/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-rose-900/20"></div>
                  <img
      src={about.image} 
      alt={about.name}
      className="object-cover w-full h-full rounded-2xl relative group-hover:scale-110 transition-transform duration-700"
    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 text-left space-y-8 flex flex-col justify-center"
            >
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="bg-black/10 text-white border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
                    <Zap className="w-4 h-4 mr-2 inline" />
                    {about.availability}
                  </Badge>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
                    {about.name}
                  </span>
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-light text-gray-400 tracking-wide h-[40px]">
                  <TypeAnimation
                    sequence={[
                      about.role,
                      2000,
                      "Creative Coder",
                      2000,
                      "Interactive Designer",
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-transparent bg-clip-text bg-gradient-brand"
                  />
                </h2>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl font-light">
                {about.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="bg-white !text-black hover:bg-gray-200 text-base font-semibold px-8 py-6 h-auto shadow-xl transition-all duration-300" asChild>
                  <a href={about.primaryButtonLink || "#contact"} className="!text-black flex items-center">
                    <Mail className="w-5 h-5 mr-2 !text-black" />
                    {about.primaryButtonText || "Let's Connect"}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-base font-semibold px-8 py-6 h-auto backdrop-blur-sm" asChild>
                  <a href={about.secondaryButtonLink || "#"}>
                    <Download className="w-5 h-5 mr-2" />
                    {about.secondaryButtonText || "Download Resume"}
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-gray-400 pt-6">
                <div className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{about.location}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-400 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span className="text-lg">{about.availability}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-violet-400 transition-colors">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{about.experience}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Elegant Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 mt-24"
          >
            {about.highlights.map((stat, index) => {
              const Icon = ICON_MAP[stat.icon] || Briefcase;
              return (
                <Card key={index} className="w-full sm:w-[45%] lg:w-[30%] max-w-[320px] bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2 animate-pulse"
                      style={{animationDelay: `${index * 0.2}s`, animationDuration: '3s'}}>
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon className={`w-10 h-10 mx-auto mb-4 text-${stat.accent}-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 relative z-10`} />
                    <div className="text-4xl font-bold text-white mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                    <div className="text-gray-400 relative z-10 text-lg">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
);
}
