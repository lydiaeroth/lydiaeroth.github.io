// All site data lives here as plain objects.
// To add a project or link, just edit this file — no database needed.

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  tags: string[];
  imageUrl?: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  category: "header" | "contact";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Blood Glucose Monitoring Dashboard",
    subtitle: "A health dashboard for type 1 diabetic athletes",
    link: "https://solistic.lydiaroth.com/",
    tags: ["Health Tech", "Dashboard"],
    imageUrl: "/health-preview.png",
  },
];

export const socialLinks: SocialLink[] = [
  // Header links
  { id: 1, platform: "LinkedIn", url: "https://www.linkedin.com/in/lydia-e-roth/", icon: "Linkedin", category: "header" },
  { id: 2, platform: "GitHub", url: "https://github.com/lydiaeroth", icon: "Github", category: "header" },
  { id: 3, platform: "Twitter", url: "https://x.com/LydiaRoth", icon: "Twitter", category: "header" },
  { id: 4, platform: "Strava", url: "https://www.strava.com/athletes/lydia_roth", icon: "Activity", category: "header" },

  // Contact links
  { id: 5, platform: "Email", url: "mailto:lydiaeroth@gmail.com", icon: "Mail", category: "contact" },
  { id: 6, platform: "Instagram", url: "https://www.instagram.com/lydiawin100", icon: "Instagram", category: "contact" },
  { id: 7, platform: "LinkedIn", url: "https://www.linkedin.com/in/lydia-e-roth/", icon: "Linkedin", category: "contact" },
];
