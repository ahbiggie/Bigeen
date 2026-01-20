import {
  Box,
  Container,
  Typography,
  Chip,
  Paper,
  Stack,
  Grid as Grid,
} from "@mui/material"
import {
  Rocket,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Construction,
  Language,
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
  // Strategic Pillars Data
  const projects: Project[] = [
    {
      id: "1",
      title: "Integrated Consulting",
      description:
        "The bedrock of our model. We help organizations diagnose operational gaps, strengthen financial and process discipline, and build execution capability suited to African business realities.",
      imageUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      categories: ["Strategy", "Operations"],
      categoryColors: ["#667eea", "#10B981"],
      link: "/contact",
    },
    {
      id: "2",
      title: "Bigeen Core SaaS",
      description:
        "A demand-led business operating platform designed to unify core business functions over time, informed by real workflows, validated needs, and proven execution patterns.",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      categories: ["SaaS", "Automation"],
      categoryColors: ["#3B82F6", "#7C3AED"],
      link: "/contact",
    },
    {
      id: "3",
      title: "Venture Studio",
      description:
        "A long-term investment arm focused on selective equity partnerships, providing operational support and infrastructure to high-potential African businesses.",
      imageUrl:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      categories: ["Investment", "Scale"],
      categoryColors: ["#F59E0B", "#EF4444"],
      link: "/contact",
    },
  ]

  // Timeline Milestones Data (Mapped to Playbook 5-Year Plan)
  const milestones: Milestone[] = [
    {
      year: "2026",
      title: "Foundation",
      description:
        "Focus on diagnostics, process design, and capability-building for Nigerian SMEs.",
      icon: <Lightbulb sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "2027",
      title: "Validation",
      description:
        "Standardization of Service offerings Onboarding early cohorts of paying clients and deploying structured operating systems and initial technology solutions.",
      icon: <CheckCircle sx={{ fontSize: 24 }} />,
      position: "right",
    },
    {
      year: "2028",
      title: "Technology Maturity",
      description:
        "Launch of the first version of Bigeen Core. Reducint fragementation between strategy, operations, and execution through automation and system integration.",
      icon: <Construction sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "2029",
      title: "Regional Expansion",
      description:
        "Expansion into selected West African markets. Building cross-market execution playbooks and regional operating capabilities.",
      icon: <Language sx={{ fontSize: 24 }} />,
      position: "right",
    },
    {
      year: "2030",
      title: "The Venture Studio",
      description:
        "Launch of our investment arm. Transitioning from service delivery to ecosystem enablement through structured equity partnerships.",
      icon: <TrendingUp sx={{ fontSize: 24 }} />,
      position: "left",
    },
    {
      year: "Future",
      title: "Category Leader",
      description:
        "Establishing 'Business Infrastructure as a Service' (BIaaS) as a practical standard for building resilient, scalable African businesses.",
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
                label="Our Strategic Vision"
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
              Building the <br />
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                African Infrastructure
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
              Our roadmap is deliberate: execution-led consulting today,
              validated technology tomorrow, and scalable African business
              infrastructure for the future.
            </MotionTypography>
          </MotionBox>
        </Container>
      </Box>

      {/* ======================== PILLARS SECTION ======================== */}
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
              Strategic{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pillars
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
              Three integrated engines guiding how we create long-term value.
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
              The{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Roadmap
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
              Our 5-year journey from foundation to category leadership.
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
