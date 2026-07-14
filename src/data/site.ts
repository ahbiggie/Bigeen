// ============================================
// SITE-WIDE CONTACT & CONVERSION CONSTANTS
// Single source of truth for every CTA on the page.
// ============================================

// TODO(founder review): replace with the real Calendly event link
// before launch. Until then the primary CTA still works — it points
// at the booking section, and the form/WhatsApp capture the lead.
export const BOOKING_URL = "#book"

export const PHONE_DISPLAY = "+234 815 877 1727"
export const PHONE_TEL = "+2348158771727"

export const EMAIL = "info@bigeensolutions.com"

const WHATSAPP_MESSAGE =
  "Hello Bigeen — I'd like to book a free diagnostic call for my business."
export const WHATSAPP_URL = `https://wa.me/2348158771727?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

// TODO(founder review): confirm the company LinkedIn page URL.
export const LINKEDIN_COMPANY_URL =
  "https://www.linkedin.com/company/bigeen-solutions"

export const FOUNDERS = [
  {
    name: "Fatima Lawal",
    role: "Co-founder & CEO",
    focus: "Strategy, consulting, brand and finance",
    initials: "FL",
    linkedin: "https://linkedin.com/in/fatimalawal023",
  },
  {
    name: "Yusuf Shaibu",
    role: "Co-founder & CTO",
    focus: "Product, SaaS enablement and technical delivery",
    initials: "YS",
    linkedin: "https://www.linkedin.com/in/yuusuf-b272bb157/",
  },
] as const

export const CTA_LABEL = "Book a free diagnostic call"
