import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";

// We hardcode the API path here to match the server implementation
// In a real generated file, we would import api from @shared/routes
const API_PROJECTS = "/api/projects";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: [API_PROJECTS],
    queryFn: async () => {
      const res = await fetch(API_PROJECTS);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    },
  });
}
