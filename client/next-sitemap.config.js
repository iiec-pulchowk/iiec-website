/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASEURL || "https://iiec.pcampus.edu.np",
  generateRobotstxt: true, // (optional) Generate a robots.txt file
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/admin/*", // Exclude admin pages
    "/private/*", // Exclude private pages
    "/api/*", // Exclude API routes
  ],
  // Add additional paths that might not be auto-discovered
  additionalPaths: async (config) => [
    await config.transform(config, "/custom-page"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private"],
      },
    ],
    additionalSitemaps: [
      `${
        process.env.NEXT_PUBLIC_BASEURL || "https://iiec.pcampus.edu.np"
      }/sitemap.xml`,
    ],
  },
};
