import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tunu Doley | Technology Entrepreneur",
    short_name: "Tunu Doley",
    description:
      "The personal portfolio of Tunu Doley, a technology entrepreneur, founder, and product builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6f2",
    theme_color: "#171717",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
