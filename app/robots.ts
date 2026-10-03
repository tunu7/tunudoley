import type { MetadataRoute } from "next";
import { founder } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${founder.website}/sitemap.xml`,
    host: founder.website,
  };
}
