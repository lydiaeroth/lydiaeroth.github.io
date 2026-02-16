
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects API
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Social Links API
  app.get(api.socialLinks.list.path, async (req, res) => {
    const links = await storage.getSocialLinks();
    res.json(links);
  });

  // Initial Seed Data (if empty)
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Blood Glucose Monitoring Dashboard",
      subtitle: "A health dashboard for type 1 diabetic athletes",
      link: "https://solistic.lydiaroth.com/",
      tags: ["Health Tech", "Dashboard"],
      imageUrl: "/attached_assets/IMG_9771.png", 
    });
  }

  const existingLinks = await storage.getSocialLinks();
  if (existingLinks.length === 0) {
    // Header Links
    await storage.createSocialLink({ platform: "LinkedIn", url: "https://www.linkedin.com/in/lydia-e-roth/", icon: "Linkedin", category: "header" });
    await storage.createSocialLink({ platform: "GitHub", url: "https://github.com/lydiaeroth", icon: "Github", category: "header" });
    await storage.createSocialLink({ platform: "Twitter", url: "https://x.com/LydiaRoth", icon: "Twitter", category: "header" });
    await storage.createSocialLink({ platform: "Strava", url: "https://www.strava.com/athletes/lydia_roth", icon: "Activity", category: "header" }); // Assuming 'Activity' icon for Strava or similar

    // Footer/Contact Links
    await storage.createSocialLink({ platform: "Email", url: "mailto:lydiaeroth@gmail.com", icon: "Mail", category: "contact" });
    await storage.createSocialLink({ platform: "Instagram", url: "https://www.instagram.com/lydiawin100", icon: "Instagram", category: "contact" });
    await storage.createSocialLink({ platform: "LinkedIn", url: "https://www.linkedin.com/in/lydia-e-roth/", icon: "Linkedin", category: "contact" });
  }

  return httpServer;
}
