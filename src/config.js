// Centralized Site Configuration
// Edit all site details here in one place

export const siteConfig = {
  // Site Identity
  name: "Ravi Nangre",
  title: "Ravi Nangre - Future of PCMC",
  description: "Official website of Ravi Nangre, Corporation Election Aspirant and Leader of Science Technology & Skill, PCMC. Voting for Progress, Innovation, and Community Welfare.",

  // Domain & URLs
  domain: "royalfoundations.in",
  url: "https://royalfoundations.in",

  // Social Media
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100079902380354",
    // Add more social links as needed
    // twitter: "https://twitter.com/ravinangre",
    // instagram: "https://instagram.com/ravinangre_official",
    // linkedin: "https://linkedin.com/in/ravinangre",
  },

  // Contact Information
  contact: {
    email: "contact@royalfoundations.in", // Keeping for footer, but reducing visibility
    phone: "+91 75195 32222",
    whatsapp: "https://wa.me/917519532222",
    address: "PCMC Region, Pune, Maharashtra",
  },

  // Branding
  branding: {
    // Professional Political Palette
    primaryColor: "#003366", // Deep Royal Blue - Trust, Authority
    secondaryColor: "#FF9933", // Saffron/Gold - Energy, Leadership, Culture
    accentColor: "#F4F4F4", // Off-white for section backgrounds
    textColor: "#333333", // Dark Grey for text
  },

  // Content Settings
  content: {
    postsPerPage: 9, // Reduced for cleaner grid
    showTimestamps: true,
    dateFormat: "dd MMMM yyyy",
  },

  // GitHub Pages Settings
  base: "/",

  // Language
  language: "en",
  locale: "en-IN",

  // SEO
  seo: {
    keywords: [
      "Ravi Nangre",
      "PCMC Election",
      "Corporation Election",
      "Science Technology Skill Leader",
      "Social Worker Pune",
      "Royal Foundation",
      "Development PCMC"
    ],
    ogImage: "/images/og-image.jpg",
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
