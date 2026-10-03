import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tunu Doley | Founder Building in AI",
    short_name: "Tunu Doley",
    description:
      "Tunu Doley is a founder building an AI company, and takes on a few interesting tech projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3efe7",
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
