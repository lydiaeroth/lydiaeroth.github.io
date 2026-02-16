
import { z } from 'zod';
import { insertProjectSchema, insertSocialLinkSchema, projects, socialLinks } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects' as const,
      input: insertProjectSchema,
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  socialLinks: {
    list: {
      method: 'GET' as const,
      path: '/api/social-links' as const,
      responses: {
        200: z.array(z.custom<typeof socialLinks.$inferSelect>()),
      },
    },
  }
};

// ============================================
// TYPE HELPERS
// ============================================
export type ProjectResponse = z.infer<typeof api.projects.list.responses[200]>[number];
export type SocialLinkResponse = z.infer<typeof api.socialLinks.list.responses[200]>[number];
