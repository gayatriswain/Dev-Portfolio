export type Project = {
  id: number;
  title: string;
  longDescription: string;
  description: string;
  image: string;
  mainimage: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "BizMaster - Business Consulting",
    longDescription:
      "BizMaster is a professional business consulting React.js template designed for corporate firms and agencies. It features a modern, responsive design built with React and Bootstrap, offering sections for services, case studies, team members, and testimonials. The project highlights dynamic routing, component reusability, and a polished user interface suitable for establishing a strong online brand presence.",
    description:
      "A modern business consulting website built with React and Bootstrap. It features a fully responsive layout, dynamic page transitions, and essential corporate sections including services, portfolio, and contact forms.",
    image:
      "/images/project.webp",
    mainimage:
      "/images/project.webp",
    technologies: ["React", "Bootstrap", "JavaScript", "CSS3", "FontAwesome"],
    githubUrl: "https://github.com/gayatriswain/bizmaster",
    liveUrl: "https://bizmasterr.netlify.app/",
    featured: true,
    gallery: [
      "/images/bizmaster1.png",
      "/images/bizmaster2.png",
      "/images/bizmaster3.png",
      "/images/bizmaster4.png",
      "/images/bizmaster5.png",
    ],
  },
  {
    id: 2,
    title: "Real Estate Website",
    longDescription:
      "The Real Estate Website is a modern, responsive platform designed to help users browse and explore property listings seamlessly. Built with Next.js, it leverages server-side rendering for enhanced performance and SEO optimization. The platform allows users to search, filter, and view property details dynamically, ensuring a smooth and interactive experience. As the Frontend Developer, I focused on creating an intuitive user interface using React and Tailwind CSS, ensuring consistency and responsiveness across all devices. The layout emphasizes clarity and usability, with well-structured property cards, smooth navigation, and optimized loading times. The project demonstrates strong proficiency in modern frontend development, emphasizing performance, scalability, and user experience. It lays the foundation for integrating additional features like user authentication, favorites management, and interactive maps.",
    description:
      "Real Estate Website – Developed a responsive property listing platform using Next.js, React, Tailwind CSS, and JavaScript, featuring dynamic pages, search filters, and optimized performance for a smooth user experience.",
    image: "/images/estate1.png",
    mainimage: "/images/realestateproject.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/gayatriswain/estate-flow",
    liveUrl: "https://ownestateflow.netlify.app/",
    gallery: [

      "/images/estate2.png",
      "/images/estate3.png",
      "/images/estate4.png",
      "/images/estate5.png",
      "/images/estate6.png",
    ],
  },
  {
    id: 3,
    title: "PHP-Based Website",
    longDescription:
      "This project is a dynamic website developed using PHP and MySQL, designed with a custom-built admin panel to manage site content efficiently. The admin dashboard enables authorized users to add, edit, update, and delete content through a user-friendly interface, eliminating the need for manual code changes. The system includes secure authentication using PHP sessions to ensure that only authorized users can access administrative features. Content updates are stored in a MySQL database and reflected instantly on the frontend, making the website fully dynamic and easy to maintain. This project demonstrates strong understanding of backend development, database integration, CRUD operations, and basic security practices, while also showcasing clean UI implementation on the frontend.",
    description:
      "A dynamic PHP-based website featuring a secure admin panel that allows administrators to manage website content in real time without modifying code.",
    image:
      "/images/rpi-image.png",
    mainimage: "/images/rpi-main-image.jpg ",
    technologies: ["PHP", "MySQL", "Session-based Login System"],
    githubUrl: "#", 
    liveUrl: "#",
    gallery: [
      "/images/rpi2.png",
      "/images/rpi3.png",
      "/images/rpi4.png",
     

    ],
  },
  {
    id: 4,
    title: "WooCommerce E-Commerce Website",
    longDescription:
      "A WooCommerce-based WordPress e-commerce website was developed with a focus on usability, responsive design, and an intuitive user experience. The platform features custom product pages, category filters, shopping cart functionality, and secure payment gateway integration. Themes were customized using PHP, HTML, CSS, and JavaScript, with optimizations for performance, SEO, and mobile responsiveness. Key plugins, including WooCommerce extensions, WPML for multilingual support, and caching/optimization tools, were implemented to enhance functionality and site speed. The project demonstrates the creation of scalable, visually appealing, and user-friendly online stores with robust backend capabilities.",
    description:
      "Developed a fully functional WooCommerce e-commerce website with custom product pages, shopping cart, payment gateway integration, and responsive design for a seamless shopping experience.",
    image:
      "/images/fusiocoat1.png",
    mainimage: "/images/Woo-commerceproject.jpg",
    technologies: ["CMS", "WooCommerce", "PHP", "JavaScript"],
    githubUrl: "#",
    liveUrl: "#",
    gallery: [
      "/images/fusiocoat2.png",
      "/images/fusiocoat3.png",
      "/images/fusiocoat4.png",
      "/images/fusiocoat5.png",
    ],
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    longDescription:
      "Analytics dashboard for social media insights.",
    description:
      "A social media analytics dashboard built to track engagement, followers, and performance metrics across platforms. Uses D3.js for data visualization, Vue.js for reactive UI, and Express with PostgreSQL for backend data management.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center",
    mainimage: "/images/estate1.png",
    technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop&crop=center",
    ],
  },
  {
    id: 6,
    title: "Modern Data-Driven Shopify Store",
    longDescription:
      "This project represents the full development of a Shopify store, including store setup, theme customization, and advanced data handling using Shopify metafields. Metafields were implemented to store and manage additional structured information such as product details, specifications, and custom content sections beyond Shopify’s default fields. The metafields were integrated into the storefront using Liquid templating, allowing dynamic rendering of data across product and collection pages. This approach improved content flexibility, reduced hard-coded values, and enabled easy updates through the Shopify Admin. The store was designed with a responsive, user-centric layout to ensure a consistent experience across all devices. Best practices in Shopify theme development were followed to maintain clean, scalable, and maintainable code, demonstrating strong expertise in both Shopify development and data architecture.",
    description:
      "Designed and developed a complete Shopify store using metafields to manage structured data and deliver dynamic, scalable storefront content.",
    image: "/images/main-vedikroot.png",
    mainimage: "/images/main-image-shopify.png",
    technologies: ["Shopify", "Liquid templating", "Metafields", "Shopify API"],
    githubUrl: "#",
    liveUrl: "https://www.vedikroots.com/",
    gallery: [
      "/images/vedikroot1.png",
      "/images/vedikroot2.png",
      "/images/vedikroot3.png",
      "/images/vedikroot4.png",
    ],
  },
];

export function getProjectById(idParam: string | number) {
  const id = typeof idParam === "string" ? Number(idParam) : idParam;
  if (Number.isNaN(id)) return undefined;
  return projects.find((p) => p.id === id);
}
