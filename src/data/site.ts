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

// TODO(founder review): bios below use the credentials the CEO supplied
// in the website review. Confirm each line is accurate before launch, and
// add professional headshots (see `photo` — null renders the monogram).
export const FOUNDERS = [
  {
    name: "Fatima Lawal",
    role: "Co-founder & CEO",
    credentials: "MBA · McKinsey Forward Programme · Columbia Behavioural Science",
    bio: "Business analyst and product manager. As Quality Assurance & Patient Care Coordinator at a multi-specialty hospital, she built clinical governance systems, process frameworks and SOPs from the ground up — she has seen operational chaos from the inside, and knows what it takes to fix it without breaking what works.",
    initials: "FL",
    photo: null as string | null,
    linkedin: "https://linkedin.com/in/fatimalawal023",
  },
  {
    name: "Yusuf Shaibu",
    role: "Co-founder & CTO",
    credentials: "Full-stack developer · Data analyst · Digital marketer",
    bio: "Builds and ships product end to end, from architecture to deployment. The technical half of a firm that does not outsource its thinking — and the reason our software recommendations come from people who actually build software.",
    initials: "YS",
    photo: null as string | null,
    linkedin: "https://www.linkedin.com/in/yuusuf-b272bb157/",
  },
] as const

// TODO(founder review): the CEO's review recommends this refund guarantee.
// It is a real financial commitment — confirm the terms before launch.
export const DIAGNOSTIC_GUARANTEE =
  "If by the end of Week 4 you don't have a clearer picture of your business than you started with — and a written list of specific things you can act on — we refund 100% of your diagnostic fee. No conditions."

// TODO(founder review): the "founding clients" offer (slot count, reduced
// rate) is a real business decision. Confirm the number of slots and terms.
export const FOUNDING_CLIENT = {
  slots: 5,
  note: "We are taking our first five founding clients. Founding clients get priority scheduling, a reduced engagement rate, and direct access to both founders throughout — in exchange for honest feedback and permission to document the work (anonymised if you prefer).",
}

// Industry statistics — approved by the CEO review (2026-07-14).
// TODO(founder review): verify each figure and source before launch;
// misattributed stats are a credibility risk.
export const INDUSTRY_STATS = [
  {
    value: "67%",
    label: "of Nigerian SMEs have no formal financial reporting system",
    source: "SMEDAN",
  },
  {
    value: "31 hrs",
    label: "a week the average owner spends on tasks that could be systemised",
    source: "Stears",
  },
  {
    value: "40%",
    label: "faster scaling for businesses with documented processes",
    source: "McKinsey",
  },
] as const

export const CTA_LABEL = "Book a free diagnostic call"
