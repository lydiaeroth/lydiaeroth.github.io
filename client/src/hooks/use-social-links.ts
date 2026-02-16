import { useQuery } from "@tanstack/react-query";
import { type SocialLink } from "@shared/schema";

const API_SOCIAL_LINKS = "/api/social-links";

export function useSocialLinks() {
  return useQuery<SocialLink[]>({
    queryKey: [API_SOCIAL_LINKS],
    queryFn: async () => {
      const res = await fetch(API_SOCIAL_LINKS);
      if (!res.ok) throw new Error("Failed to fetch social links");
      return await res.json();
    },
  });
}
