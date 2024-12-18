/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/programs/:path*",
        destination: "/ui/programs/:path*",
      },
      {
        source: "/about-us/:path*",
        destination: "/ui/about-us/:path*",
      },
      {
        source: "/how-it-works/:path*",
        destination: "/ui/how-it-works/:path*",
      },
      {
        source: "/workshops/:path*",
        destination: "/ui/workshops/:path*",
      },
      {
        source: "/blogs/:path*",
        destination: "/ui/blogs/:path*",
      },
      {
        source: "/blog/:path*",
        destination: "/ui/blog/:path*",
      },
      {
        source: "/privacy-and-policy/:path*",
        destination: "/ui/privacy-and-policy/:path*",
      },
      {
        source: "/dmca-policy/:path*",
        destination: "/ui/dmca-policy/:path*",
      },
      {
        source: "/terms-and-conditions/:path*",
        destination: "/ui/terms-and-conditions/:path*",
      },
      {
        source: "/disclaimer/:path*",
        destination: "/ui/disclaimer/:path*",
      },
      {
        source: "/workshop-detail/:path*",
        destination: "/ui/workshop-detail/:path*",
      },
      {
        source: "/program/:path*",
        destination: "/ui/program/:path*",
      },
      {
        source: "/thanks/:path*",
        destination: "/ui/thanks/:path*",
      },
      {
        source: "/faqs",
        destination: "/ui/faqs",
      },
      {
        source: "/faqs",
        destination: "/ui/faqs",
      },
      {
        source: "/contact-us",
        destination: "/ui/contact-us",
      },

      {
        source: "/blog/category/:path*",
        destination: "/ui/blog/category/:path*",
      },

      {
        // Rewrite for admin pages
        source: "/admin/:path*",
        destination: "/panel/admin/:path*",
      },
      {
        // Rewrite for cms pages
        source: "/cms/:path*",
        destination: "/panel/cms/:path*",
      },

      {
        // Rewrite for lms pages
        source: "/lms/:path*",
        destination: "/panel/lms/:path*",
      },
      {
        source: "/student/:path*",
        destination: "/school/student/:path*",
      },
      {
        source: "/instructor/:path*",
        destination: "/school/instructor/:path*",
      },
      {
        source: "/_/:path*",
        destination: "/school/student/_/:path*",
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
