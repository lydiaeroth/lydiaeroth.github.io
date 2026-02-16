import { Link } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type SocialLink } from "@shared/schema";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Activity // Strava equivalent
} from "lucide-react";

interface NavigationProps {
  links: SocialLink[];
  className?: string;
  variant?: "header" | "footer";
}

export function Navigation({ links, className, variant = "header" }: NavigationProps) {
  // Filter links based on variant context if needed, 
  // currently we just display what's appropriate for the section
  
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github": return <Github className="w-5 h-5" />;
      case "linkedin": return <Linkedin className="w-5 h-5" />;
      case "twitter": return <Twitter className="w-5 h-5" />;
      case "instagram": return <Instagram className="w-5 h-5" />;
      case "strava": return <Activity className="w-5 h-5" />; // Strava often represented by activity icon if dedicated not avail
      case "email": return <Mail className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <nav className={cn("flex flex-wrap gap-6 items-center", className)}>
      {links.map((link) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-muted-foreground transition-colors duration-200",
            "hover:text-primary hover:scale-105 active:scale-95"
          )}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {getIcon(link.icon)}
          <span className="sr-only">{link.platform}</span>
          {variant === "footer" && <span className="text-sm font-medium">{link.platform}</span>}
        </motion.a>
      ))}
    </nav>
  );
}
