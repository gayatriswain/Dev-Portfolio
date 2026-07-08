"use client";

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContent } from "@/hooks/useContent";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export default function ProjectDetail({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const project = content.projects.find(p => p.id.toString() === projectId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 pb-16">
          <div className="rounded-xl border border-border/20 p-8 bg-surface/50">
            <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
            <p className="text-muted-foreground mb-6">
              The project you are looking for does not exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <header className="pt-24 pb-10 bg-surface/30 border-b border-border/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" className="px-2" asChild>
              <Link href="/#projects" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to projects
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-8 py-10">
        <div className="rounded-2xl overflow-hidden border border-border/20 bg-surface/50 mb-8">
          <img
            src={project.mainimage || project.image}
            alt={project.title}
            className="w-full h-[360px] md:h-[520px] object-cover"
          />
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md border border-border/20 bg-surface/60 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Gallery</h2>
            <div className="relative">
              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {project.gallery.map((img, idx) => (
                    <CarouselItem
                      key={img}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-2">
                        <div
                          className="overflow-hidden rounded-xl border border-border/20 bg-surface/40 cursor-pointer"
                          onClick={() => setSelectedImage(img)}
                        >
                          <img
                            src={img}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            className="w-full h-56 object-cover hover:scale-[1.02] transition-transform"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 md:-left-6" />
                <CarouselNext className="-right-4 md:-right-6" />
              </Carousel>
            </div>
          </section>
        )}

        {/* ✅ Popup Modal */}
        {/* ✅ Popup Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 overflow-y-auto flex justify-center fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-5xl my-8 md:my-16 px-4 animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full view"
                className="w-full h-auto rounded-lg shadow-2xl ring-1 ring-white/10"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-4 md:-right-12 md:top-0 p-2 text-white/70 hover:text-white transition-colors bg-black/50 md:bg-transparent rounded-full backdrop-blur-sm md:backdrop-blur-none"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </section>
          </div>

          <aside className="md:col-span-1">
            <div className="rounded-xl border border-border/20 p-4 bg-surface/50 sticky top-24">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-brand" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" /> View Code
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
