// Centralized Site Configuration
// Edit all site details here in one place

export const siteConfig = {
  // Site Identity
  name: "Royal Foundation",
  title: "Royal Foundation - Empowering Communities",
  description: "Royal Foundation is dedicated to empowering communities through education, healthcare, and social welfare initiatives.",

  // Domain & URLs
  domain: "royalfoundations.in",
  url: "https://royalfoundations.in",

  // Social Media
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100079902380354",
    // Add more social links as needed
    // twitter: "https://twitter.com/yourhandle",
    // instagram: "https://instagram.com/yourhandle",
  },

  // Contact Information
  contact: {
    email: "contact@royalfoundations.in",
    // phone: "+91 XXX XXX XXXX",
    // address: "Your Address Here",
  },

  // Branding
  branding: {
    primaryColor: "#1877f2", // Facebook blue as default
    secondaryColor: "#42b72a",
    logo: "/images/logo.png", // Update with your logo path
  },

  // Content Settings
  content: {
    postsPerPage: 12,
    showTimestamps: true,
    dateFormat: "dd MMMM yyyy",
  },

  // GitHub Pages Settings
  base: "/", // Change to "/repo-name/" if not using custom domain

  // Language
  language: "en", // Change to "mr" for Marathi if needed
  locale: "en-US",

  // SEO
  seo: {
    keywords: ["royal foundation", "charity", "ngo", "social welfare", "education"],
    ogImage: "/images/og-image.jpg", // Update with your OG image
  }
};

// Helper function to get full URL
export function getFullUrl(path = "") {
  return `${siteConfig.url}${path}`;
}

// Helper function to format dates
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(siteConfig.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
