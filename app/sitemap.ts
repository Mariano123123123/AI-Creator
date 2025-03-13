import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aicreator-platform.com"

  const routes = [
    "",
    "/generate-images",
    "/create-characters",
    "/chat",
    "/billing",
    "/settings",
    "/login",
    "/about",
    "/blog",
    "/contact",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}

