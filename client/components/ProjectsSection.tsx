import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProjectCard = ({
  id,
  title,
  description,
  mainimage,
  technologies,
  githubUrl,
  liveUrl,
  featured = false,
}) => {
  return (
    <div
      className={`group relative rounded-2xl border border-border/20 overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden bg-gradient-brand/10">
        <AspectRatio ratio={16 / 9}>
          <img
            src={mainimage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              size="sm"
              variant="secondary"
              className="backdrop-blur-sm bg-background/80"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </a>
            </Button>
            <Button
              size="sm"
              className="backdrop-blur-sm bg-gradient-brand hover:opacity-90"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
         
          </div>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-brand text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          <Link href={`/projects/${id}`}>{title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-surface/50 text-foreground text-xs rounded-md border border-border/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
          <Link
            href={`/projects/${id}`}
            className="text-muted-foreground hover:text-primary transition-colors text-sm underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section id="projects" className="py-8 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-16">
          {content.projectsHeader?.badgeText && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-border/20">
                {content.projectsHeader.badgeText}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {content.projectsHeader?.title || "Featured Projects"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.projectsHeader?.description || "Here are some of my recent projects that showcase my skills in frontend development, from complex web applications to interactive experiences."}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-16">
          {content.projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a href={content.projectsCta?.buttonUrl || "#"} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-black hover:bg-neutral-800 text-white border-none font-bold shadow-lg transition-all text-lg px-8 py-4 h-auto"
              >
                <Github className="mr-2 h-5 w-5" />
                {content.projectsCta?.buttonText || "View All Projects on GitHub"}
              </Button>
            </a>
          
          </div>
        </div>
      </div>
    </section>
  );
}
