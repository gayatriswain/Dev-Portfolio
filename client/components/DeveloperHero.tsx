import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function DeveloperHero() {
  return (
    <section
      id="home"
      className="relative min-h-[650px] md:min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-0"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-brand opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-brand-radial opacity-5"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-gradient-mid rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-border/20">
            💻 Frontend Developer
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Hi, I'm
          <span className="block bg-gradient-brand bg-clip-text text-transparent">
            Alex Johnson
          </span>
          <span className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
            Frontend Developer
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          I craft beautiful, responsive web applications using modern
          technologies. Passionate about creating user experiences that are both
          functional and delightful.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-4 h-auto"
          >
            View My Work
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border/20 hover:bg-surface/50 text-lg px-8 py-4 h-auto backdrop-blur-sm"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-16">
          <a
            href="#"
            className="p-3 bg-surface/50 backdrop-blur-sm rounded-full border border-border/20 hover:border-primary/20 transition-all duration-300 hover:scale-110"
          >
            <Github className="h-6 w-6 text-foreground" />
          </a>
          <a
            href="#"
            className="p-3 bg-surface/50 backdrop-blur-sm rounded-full border border-border/20 hover:border-primary/20 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="h-6 w-6 text-foreground" />
          </a>
          <a
            href="#"
            className="p-3 bg-surface/50 backdrop-blur-sm rounded-full border border-border/20 hover:border-primary/20 transition-all duration-300 hover:scale-110"
          >
            <Mail className="h-6 w-6 text-foreground" />
          </a>
        </div>

        {/* Tech Stack Preview */}
        <div className="border-t border-border/20 pt-12">
          <p className="text-sm text-muted-foreground mb-6">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Tailwind CSS",
              "Node.js",
              "Three.js",
              "Framer Motion",
              "GraphQL",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-surface/30 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground border border-border/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
