import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Paper,
  Stack,
} from "@mui/material"
import {
  Rocket,
  EmojiEvents,
  TrendingUp,
  Groups,
  Lightbulb,
  CheckCircle,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { ProjectCard } from "../components/ui"
import { glassStyles, gradients, blobKeyframes } from "../theme/theme"
import type { Project, Milestone } from "../types"

// ============================================
// MOTION COMPONENTS
// ============================================

const MotionBox = motion.create(Box)
const MotionTypography = motion.create(Typography)
const MotionPaper = motion.create(Paper)

// ============================================
// ANIMATED BLOB COMPONENT
// ============================================

interface BlobProps {
  color: string
  size: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  delay?: number
}

const AnimatedBlob: React.FC<BlobProps> = ({
  color,
  size,
  top,
  left,
  right,
  bottom,
  delay = 0,
}) => (
  <Box
    sx={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(60px)",
      opacity: 0.5,
      top,
      left,
      right,
      bottom,
      animation: `blob 7s ease-in-out infinite ${delay}s`,
      ...blobKeyframes,
    }}
  />
)

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

// ============================================
// MILESTONE CARD COMPONENT
// ============================================

interface MilestoneCardProps {
  milestone: Milestone
  index: number
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, index }) => {
  const isLeft = milestone.position === "left"

  return (
    <MotionBox
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: index * 0.1,
      }}
    >
      <MotionPaper
        whileHover={{ y: -5, scale: 1.02 }}
        elevation={0}
        sx={{
          ...glassStyles.light,
          borderRadius: 4,
          p: 4,
          position: "relative",
        }}
      >
        {/* Year Badge */}
        <Chip
          label={milestone.year}
          sx={{
            position: "absolute",
            top: -12,
            [isLeft ? "right" : "left"]: 24,
            background: gradients.accent,
            color: "white",
            fontWeight: 700,
            fontSize: "0.8rem",
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          sx={{ mt: 1 }}
        >
          {milestone.icon && (
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: glassStyles.accent.background,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "primary.main",
              }}
            >
              {milestone.icon}
            </Box>
          )}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
            >
              {milestone.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {milestone.description}
            </Typography>
          </Box>
        </Stack>
      </MotionPaper>
    </MotionBox>
  )
}

// ============================================
// ROADMAP PAGE COMPONENT
// ============================================

export const RoadmapPage: React.FC = () => {
  // Portfolio Projects Data
  const projects: Project[] = [
    {
      id: "1",
      title: "FinFlow Analytics Platform",
      description:
        "A comprehensive fintech dashboard enabling real-time portfolio tracking and AI-driven investment insights for wealth managers.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      categories: ["Fintech", "AI/ML"],
      categoryColors: ["#667eea", "#10B981"],
      link: "#",
    },
    {
      id: "2",
      title: "MediConnect Mobile",
      description:
        "HIPAA-compliant telemedicine app connecting patients with healthcare providers through secure video consultations.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      categories: ["Healthcare", "Mobile"],
      categoryColors: ["#EF4444", "#3B82F6"],
      link: "#",
    },
    {
      id: "3",
      title: "LogiTrack Enterprise",
      description:
        "End-to-end supply chain visibility platform with predictive analytics for Fortune 500 logistics operations.",
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      categories: ["Logistics", "Enterprise"],
      categoryColors: ["#F59E0B", "#764ba2"],
      link: "#",
    },
  ]

  // Timeline Milestones Data
  const milestones: Milestone[] = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Founded with a vision to simplify enterprise workflows. Started with 3 co-founders and a bold idea.",
      icon: <Lightbulb sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "2021",
      title: "First Major Client",
      description:
        "Landed our first Fortune 500 client. Expanded team to 15 engineers and designers.",
      icon: <EmojiEvents sx={{ fontSize: 24 }} />,
      position: "right",
    },
    {
      year: "2022",
      title: "Product-Market Fit",
      description:
        "Achieved 100+ paying customers. Launched Bigeen Core v1.0 with seamless integrations.",
      icon: <CheckCircle sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description:
        "Raised $12M Series A. Expanded globally with offices in 3 countries.",
      icon: <TrendingUp sx={{ fontSize: 24 }} />,
      position: "right",
    },
    {
      year: "2024",
      title: "500+ Customers",
      description:
        "Crossed 500 active customers milestone. Launched AI-powered analytics suite.",
      icon: <Groups sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "2025",
      title: "The Future",
      description:
        "Building next-gen automation tools. Expanding into new verticals with strategic partnerships.",
      icon: <Rocket sx={{ fontSize: 24 }} />,
      position: "right",
    },
  ]

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* ======================== HERO SECTION ======================== */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #F8FAFC 100%)",
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Blobs */}
        <AnimatedBlob
          color="#667eea"
          size={350}
          top="-5%"
          right="10%"
          delay={0}
        />
        <AnimatedBlob
          color="#764ba2"
          size={300}
          bottom="0%"
          left="5%"
          delay={2}
        />
        <AnimatedBlob
          color="#3B82F6"
          size={250}
          top="50%"
          left="30%"
          delay={1}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}
          >
            <MotionBox variants={itemVariants}>
              <Chip
                label="🎯 Our Journey & Work"
                sx={{
                  mb: 3,
                  ...glassStyles.light,
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  px: 1,
                }}
              />
            </MotionBox>

            <MotionTypography
              variant="h1"
              variants={itemVariants}
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                color: "text.primary",
              }}
            >
              Building the Future of{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business Tools
              </Box>
            </MotionTypography>

            <MotionTypography
              variant="body1"
              variants={itemVariants}
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "text.secondary",
                lineHeight: 1.7,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Transparency at our core. Explore our journey from legacy systems
              to our flagship Micro-SaaS Integrator.
            </MotionTypography>
          </MotionBox>
        </Container>
      </Box>

      {/* ======================== PORTFOLIO SECTION ======================== */}
      <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "background.paper" }}>
        <Container maxWidth="xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 8 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Featured{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Case Studies
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Real solutions for real businesses. See how we've helped companies
              transform their operations.
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {projects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ======================== TIMELINE SECTION ======================== */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: "background.default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Glow */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: gradients.accent,
            opacity: 0.03,
            filter: "blur(100px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            sx={{ textAlign: "center", mb: 10 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Our{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Journey
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.1rem",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              From a small startup to serving 500+ businesses worldwide.
            </Typography>
          </MotionBox>

          {/* Timeline Container */}
          <Box sx={{ position: "relative" }}>
            {/* Vertical Dashed Line */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 2,
                background: `repeating-linear-gradient(
                  to bottom,
                  transparent,
                  transparent 8px,
                  #667eea40 8px,
                  #667eea40 16px
                )`,
                transform: "translateX(-50%)",
                display: { xs: "none", md: "block" },
              }}
            />

            {/* Timeline Dot Markers */}
            {milestones.map((_, index) => (
              <Box
                key={`dot-${index}`}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: `${(index / (milestones.length - 1)) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: gradients.accent,
                  border: "3px solid white",
                  boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.2)",
                  zIndex: 2,
                  display: { xs: "none", md: "block" },
                }}
              />
            ))}

            {/* Milestone Cards */}
            <Stack spacing={6}>
              {milestones.map((milestone, index) => (
                <Grid container key={index} spacing={4} alignItems="center">
                  {/* Left Side */}
                  <Grid size={{ xs: 12, md: 5 }}>
                    {milestone.position === "left" && (
                      <MilestoneCard milestone={milestone} index={index} />
                    )}
                  </Grid>

                  {/* Center Spacer (for the line) */}
                  <Grid
                    size={{ xs: 0, md: 2 }}
                    sx={{ display: { xs: "none", md: "block" } }}
                  />

                  {/* Right Side */}
                  <Grid size={{ xs: 12, md: 5 }}>
                    {milestone.position === "right" && (
                      <MilestoneCard milestone={milestone} index={index} />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
