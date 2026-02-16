import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type Project } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a 
        href={project.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <Card className="h-full border-none shadow-none bg-transparent overflow-hidden group-hover:bg-secondary/30 transition-colors duration-300 rounded-xl">
          <CardContent className="p-6 md:p-8 flex flex-col h-full relative">
            {/* Visual Indicator of interactivity */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* Typography-led design */}
            <h3 className="text-3xl md:text-4xl font-display font-medium text-primary group-hover:underline decoration-1 underline-offset-4 decoration-muted-foreground/50">
              {project.title}
            </h3>
            
            <p className="mt-3 text-lg text-muted-foreground font-sans leading-relaxed">
              {project.subtitle}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono uppercase tracking-wider rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Optional Image Preview - handled conditionally */}
            {project.imageUrl && (
              <div className="mt-6 rounded-lg overflow-hidden border border-border/50 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}
