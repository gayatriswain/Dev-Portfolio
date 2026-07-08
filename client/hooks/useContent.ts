import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface PortfolioContent {
  seo?: {
    title: string;
    description: string;
  };
  hero: {
    name: string;
    roles: string[];
    description: string;
    backgroundImage: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    social: {
      github: string;
      linkedin: string;
      twitter?: string;
      instagram?: string;
    };
  };
  about: {
    name: string;
    role: string;
    bio: string;
    image: string;
    location: string;
    availability: string;
    experience: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    highlights: Array<{
      label: string;
      value: string;
      icon: string;
      accent: string;
    }>;
  };
  skillCategories: Array<{
    title: string;
    subtitle: string;
    icon: string;
    skills: Array<{ name: string; icon: string }>;
  }>;
  skillsFooter?: {
    description: string;
    points: string[];
  };
  skillsHeader?: {
    badgeText: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
  };
  skills: Array<{
    title: string;
    icon: string;
  }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    mainimage: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
    gallery?: string[];
  }>;
  projectsHeader?: {
    badgeText: string;
    title: string;
    description: string;
  };
  projectsCta?: {
    buttonText: string;
    buttonUrl: string;
  };
  header: {
    logoText: string;
    hireMeUrl: string;
  };
  techStackOrbit: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    row1Icons: Array<{ url: string; label: string }>;
    row2Icons: Array<{ url: string; label: string }>;
    smallIcons: {
      linkedin: string;
      ai: string;
      react: string;
      gatsby: string;
      js: string;
      code: string;
      css: string;
      xd: string;
      figma: string;
    };
  };
  experienceHeader?: {
    badgeText: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
  };
  collaborationsCta?: {
    badgeText: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
    achievements?: string[];
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    description: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
      iconUrl: string;
    }>;
  };
  footer: {
    brandName: string;
    description: string;
    expertise: string[];
    copyrightText: string;
    usefulLinks?: Array<{
      label: string;
      url: string;
    }>;
  };
  popup: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

export const useContent = () => {
  return useQuery<PortfolioContent>({
    queryKey: ["content"],
    queryFn: async () => {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json();
    },
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ password, content }: { password: string; content: PortfolioContent }) => {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
};
