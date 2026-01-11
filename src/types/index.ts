// ============================================
// SHARED INTERFACES & TYPES
// ============================================

// Feature Card
export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color?: string
  showLearnMore?: boolean
}

// Team Member
export interface TeamMemberSocials {
  linkedin?: string
  twitter?: string
  github?: string
  email?: string
}

export interface TeamMemberProps {
  name: string
  role: string
  imageUrl?: string
  initials?: string
  gradient?: string
  socials?: TeamMemberSocials
}

// Stat Card
export interface StatCardProps {
  value: string | number
  label: string
  suffix?: string
  icon?: React.ReactNode
  color?: string
}

// Contact Information
export interface ContactInfo {
  icon: React.ReactNode
  label: string
  value: string
}

// FAQ Item
export interface FAQItem {
  question: string
  answer: string
}

// Navigation
export interface NavLinkProps {
  label: string
  href: string
}

// Footer
export interface FooterLinkSection {
  title: string
  links: NavLinkProps[]
}

// Project Card (Roadmap)
export interface ProjectCardProps {
  title: string
  description: string
  imageUrl?: string
  categories: string[]
  categoryColors?: string[]
  status?: string
  votes?: number
  comments?: number
}

// Project (Full)
export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  categories: string[]
  categoryColors?: string[]
  link?: string
}

// Milestone (Timeline)
export interface Milestone {
  year: string
  title: string
  description: string
  icon?: React.ReactNode
  position: "left" | "right"
}

// Roadmap Card
export interface RoadmapCardProps {
  label: string
  labelColor: string
  icon: React.ReactNode
  title: string
  description: string
  votes: number
  views: number
  status?: string
}
