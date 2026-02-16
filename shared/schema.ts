
import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
// We'll store projects and social links in the DB to make them modular
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  link: text("link").notNull(),
  tags: text("tags").array(), // For "interactive visuals" or categories
  imageUrl: text("image_url"),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(), // LinkedIn, GitHub, Twitter, Strava, Instagram
  url: text("url").notNull(),
  icon: text("icon").notNull(), // Icon name
  category: text("category").notNull(), // 'header' or 'footer' or 'contact'
});

// === BASE SCHEMAS ===
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type SocialLink = typeof socialLinks.$inferSelect;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;

export type ProjectResponse = Project;
export type SocialLinkResponse = SocialLink;
