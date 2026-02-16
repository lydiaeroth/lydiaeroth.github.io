import { useProjects } from "@/hooks/use-projects";
import { useSocialLinks } from "@/hooks/use-social-links";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { Layout } from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: socialLinks, isLoading: isLoadingSocials } = useSocialLinks();

  const headerLinks = socialLinks?.filter(l => l.category === 'header') || [];
  const footerLinks = socialLinks?.filter(l => l.category === 'footer' || l.category === 'contact') || [];

  if (isLoadingProjects || isLoadingSocials) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Layout>
      {/* HEADER SECTION */}
      <header className="flex flex-col items-center justify-center space-y-8 mb-20 md:mb-32">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-primary">
            Lydia Roth
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Navigation links={headerLinks} variant="header" />
        </motion.div>
      </header>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: INTRO */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="sticky top-24"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
              About Me
            </h2>
            <div className="prose prose-lg prose-gray">
              <p className="text-xl md:text-2xl leading-relaxed font-light text-foreground/90 font-display">
                Hi! I’m Lydia. Welcome to my little corner of the internet.
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6 font-sans">
                I like tinkering with and building things—products, projects, board games. 
                I’m fascinated by early-stage ventures. 
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6 font-sans">
                In my free time, I like bikes, long runs on the Puget Sound, and convincing my cat to join me on unsolicited adventures.
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: PROJECTS */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-8 md:mb-12">
              Selected Work
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
              {projects?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
              
              {(!projects || projects.length === 0) && (
                <div className="p-8 border border-dashed border-border rounded-xl text-center text-muted-foreground">
                  No projects found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Separator className="my-16 md:my-24" />

      {/* FOOTER / CONTACT */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div>
          <h3 className="text-2xl font-display font-medium mb-2">Get in touch</h3>
          <p className="text-muted-foreground max-w-sm">
            Always open to discussing new projects, early-stage ventures, or the best bike routes in the PNW.
          </p>
        </div>
        
        <Navigation links={footerLinks} variant="footer" className="flex-col items-start md:flex-row md:items-center gap-4 md:gap-8" />
      </motion.footer>
    </Layout>
  );
}
