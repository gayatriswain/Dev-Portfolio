export interface Experience {
  id: number;
  company: string;
  logo: string | null;
  position: string;
  duration: string;
  location: string;
  rating: number;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Promanage IT Solution",
    logo: null,
    position: "Frontend Developer",
    duration: "Dec 9, 2024 - Present",
    location: "Noida, India",
    rating: 5,
    description:
      "Responsible for designing and developing responsive websites for global clients with a focus on performance and user experience. Collaborating with cross-functional teams to deliver high-quality web solutions.",
    achievements: [
      "Translating complex UI/UX designs into clean, efficient, and maintainable code using modern frontend technologies.",
      "Ensuring cross-browser compatibility and optimizing performance for a seamless user experience across all devices.",
      "Collaborating with designers and backend developers to implement scalable web solutions and new features.",
      "Maintaining existing projects and delivering updates based on international client requirements and feedback.",
    ],
  },
  
];
