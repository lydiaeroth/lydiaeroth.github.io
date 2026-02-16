
import { db } from "./db";
import {
  projects,
  socialLinks,
  type InsertProject,
  type Project,
  type InsertSocialLink,
  type SocialLink,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSocialLinks(): Promise<SocialLink[]>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async getSocialLinks(): Promise<SocialLink[]> {
    return await db.select().from(socialLinks);
  }

  async createSocialLink(insertLink: InsertSocialLink): Promise<SocialLink> {
    const [link] = await db.insert(socialLinks).values(insertLink).returning();
    return link;
  }
}

export const storage = new DatabaseStorage();
