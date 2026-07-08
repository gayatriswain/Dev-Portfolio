import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { useContent } from "@/hooks/useContent";
import './HeroSection.css'; // 👈 custom animation styles

export default function HeroSection() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) return null;

  const { hero } = content;

  // Build animation sequence: role, then wait, then empty, then next role
  const rolesSequence = hero.roles.flatMap(role => [role, 2000, ""]);

  return (
    <section
      id="home"
      className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

      {/* Animated dots */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-gradient-mid rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Glow */}
       <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(216,70,239,0.3)_0%,_rgba(139,92,246,0.15)_50%,_transparent_90%)] rounded-full blur-2xl z-0"></div>


        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-border/20">
            ✨ Portfolio
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Hi, I'm
          <br />
          <span className="relative inline-block fancy-type-wrapper">
            <TypeAnimation
              sequence={[
                hero.name,
                2000,
                '',
                500,
                ...rolesSequence
              ]}
              wrapper="span"
              speed={60}
              deletionSpeed={40}
              repeat={Infinity}
              className="block text-transparent bg-clip-text fancy-type-text"
            />
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className=" hover:opacity-90 transition-opacity text-lg px-8 py-4 h-auto"
            asChild
          >
            <a href={hero.primaryButtonLink || "#projects"}>
              {hero.primaryButtonText || "View Projects"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border/90 hover:bg-surface/50 text-lg px-8 py-4 h-auto backdrop-blur-sm hover:text-white"
            asChild
          >
            <a href={hero.secondaryButtonLink || "#contact"}>
              {hero.secondaryButtonText || "Contact"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Social icons */}
        <div
          style={{
            transform: 'translateY(40px)',
            opacity: 1,
            transition: 'transform 800ms ease-out 900ms, opacity 800ms ease-out 900ms',
          }}
          className="flex justify-center mt-6"
        >
          <div className="flex gap-6">
            {hero.social?.github && (
              <a
                href={hero.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card hover:bg-card/80 text-foreground transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
              >
                <FaGithub className="w-8 h-8" />
              </a>
            )}
            {hero.social?.linkedin && (
              <a
                href={hero.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card hover:bg-card/80 text-foreground transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
            )}
            {hero.social?.twitter && (
              <a
                href={hero.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card hover:bg-card/80 text-foreground transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
              >
                <FaTwitter className="w-8 h-8" />
              </a>
            )}
            {hero.social?.instagram && (
              <a
                href={hero.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card hover:bg-card/80 text-foreground transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
              >
                <FaInstagram className="w-8 h-8" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
