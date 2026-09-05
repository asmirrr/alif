import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alif — Prayer & Reflection",
    short_name: "Alif",
    description: "A modern Islamic companion app focused on prayer, reflection, and daily consistency.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff", // match your app's bg
    theme_color: "#0f172a",      // match your brand color
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}