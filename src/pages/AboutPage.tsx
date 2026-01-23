import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
} from "@mui/material"
import {
  Groups,
  TrendingUp,
  ArrowForward,
  Rocket,
  Bolt,
  CheckCircle,
  VerifiedUser,
  Lightbulb,
  Info,
} from "@mui/icons-material"

import { motion } from "framer-motion"
import { TeamMemberCard, StatCard } from "../components/ui"
import { glassStyles, gradients, blobKeyframes } from "../theme/theme"
import type { TeamMemberProps, StatCardProps } from "../types"

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
// ABOUT PAGE COMPONENT
// ============================================

export const AboutPage: React.FC = () => {
  // Team Members Data
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Lawal Fatima",
      role: "Co-Founder & Lead Consultant",
      initials: "LF",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      socials: {
        linkedin: "https://linkedin.com/in/fatimalawal",
        twitter: "https://twitter.com/fatimalawal",
      },
    },
    {
      name: "Yusuf Shaibu",
      role: "Head of Technology",
      initials: "YS",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      socials: {
        linkedin: "https://linkedin.com/in/yusufshaibu",
        twitter: "https://twitter.com/yusufshaibu",
      },
    },
    {
      name: "Mochi Nurudeen",
      role: "Operations Manager",
      initials: "MN",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      socials: {
        linkedin: "https://linkedin.com/in/mochinurudeen",
      },
    },
  ]

  // Stats Data
  const stats: StatCardProps[] = [
    {
      value: "10",
      suffix: "+",
      label: "Team Members",
      icon: <Groups sx={{ fontSize: 28 }} />,
    },
    {
      value: "500",
      suffix: "+",
      label: "Active Customers",
      icon: <TrendingUp sx={{ fontSize: 28 }} />,
    },
    {
      value: "12",
      label: "Products Shipped",
      icon: <Rocket sx={{ fontSize: 28 }} />,
    },
    {
      value: "99.9",
      suffix: "%",
      label: "Uptime SLA",
      icon: <Bolt sx={{ fontSize: 28 }} />,
    },
  ]

  // Solution Features
  const solutionFeatures = [
    "Operational Diagnostics",
    "Process & Workflow Design",
    "SaaS Tool Implementation",
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
          left="5%"
          delay={0}
        />
        <AnimatedBlob
          color="#764ba2"
          size={300}
          bottom="10%"
          right="-5%"
          delay={2}
        />
        <AnimatedBlob
          color="#3B82F6"
          size={250}
          top="40%"
          right="20%"
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
                icon={<Info sx={{ fontSize: 16 }} />}
                label="About Us"
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
              Bridging Strategy &{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Execution.
              </Box>
            </MotionTypography>

            <MotionTypography
              variant="body1"
              variants={itemVariants}
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "text.secondary",
                mb: 4,
                lineHeight: 1.7,
                maxWidth: 800,
                mx: "auto",
              }}
            >
              We help African SMEs transition from chaotic survival to
              sustainable scale. We are the "Business Operating System" you need
              to grow.
            </MotionTypography>

            <MotionBox variants={itemVariants}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <MotionBox
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component="a"
                    href="#roadmap"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: gradients.accent,
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      boxShadow: "0 8px 24px rgba(3, 8, 145, 0.3)",
                      "&:hover": {
                        background: gradients.primary,
                      },
                    }}
                  >
                    View our Journey
                  </Button>
                </MotionBox>
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component="a"
                    href="#roadmap"
                    variant="outlined"
                    size="large"
                    startIcon={<Rocket />}
                    sx={{
                      ...glassStyles.light,
                      borderColor: "transparent",
                      color: "text.primary",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      "&:hover": {
                        borderColor: "primary.main",
                        background: glassStyles.medium.background,
                      },
                    }}
                  >
                    Watch Roadmap
                  </Button>
                </MotionBox>
              </Stack>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>

      {/* ======================== PROBLEM & SOLUTION SECTION ======================== */}
      <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: "background.paper" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* The Problem */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    ...glassStyles.medium,
                    p: 5,
                    borderRadius: 4,
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: gradients.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <VerifiedUser sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h4" fontWeight={700}>
                      The Problem
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: "1.1rem",
                    }}
                  >
                    Over{" "}
                    <Box component="strong" sx={{ color: "text.primary" }}>
                      80% of Nigerian SMEs fail within five years
                    </Box>
                    . It's not because of a lack of passion or bad ideas. It's
                    because of operational failure.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                    }}
                  >
                    Founders get stuck doing everything themselves, lacking the
                    structure, financial clarity, and processes needed to step
                    back and scale. That is where we come in.
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>

            {/* The Solution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    ...glassStyles.medium,
                    p: 5,
                    borderRadius: 4,
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 3 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background:
                          "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Lightbulb sx={{ color: "white", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h4" fontWeight={700}>
                      The Solution
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      mb: 3,
                      fontSize: "1.1rem",
                    }}
                  >
                    Bigeen Solutions is a{" "}
                    <Box component="strong" sx={{ color: "text.primary" }}>
                      Hybrid Partner
                    </Box>
                    . We combine high-level strategic consulting with pragmatic
                    software implementation.
                  </Typography>
                  <Stack spacing={2}>
                    {solutionFeatures.map((feature, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <CheckCircle sx={{ color: "success.main" }} />
                        <Typography
                          variant="h6"
                          sx={{ fontSize: "1.1rem", fontWeight: 500 }}
                        >
                          {feature}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ======================== STATS SECTION ======================== */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: "background.default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: gradients.accent,
            opacity: 0.03,
            filter: "blur(100px)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
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
              Numbers that{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                speak volumes
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
              Our growth is a testament to the trust our customers place in us.
            </Typography>
          </MotionBox>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ======================== LEADERSHIP SECTION ======================== */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: "background.paper",
        }}
      >
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
                fontSize: { xs: "2rem", md: "2.75rem" },
                fontWeight: 800,
                mb: 2,
                color: "text.primary",
              }}
            >
              Leadership
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.125rem",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Built in Abuja. Serving the Continent.
            </Typography>
          </MotionBox>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 80,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                >
                  <TeamMemberCard {...member} />
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ======================== CTA SECTION ======================== */}
      <Box
        sx={{ py: { xs: 10, md: 14 }, backgroundColor: "background.default" }}
      >
        <Container maxWidth="md">
          <MotionPaper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
            elevation={0}
            sx={{
              background: gradients.dark,
              borderRadius: 4,
              p: { xs: 5, md: 8 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background Glow */}
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: gradients.accent,
                opacity: 0.15,
                filter: "blur(80px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -80,
                left: -80,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "#3B82F6",
                opacity: 0.1,
                filter: "blur(60px)",
              }}
            />

            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                position: "relative",
                zIndex: 1,
              }}
            >
              Ready to shape the future?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mb: 4,
                fontSize: "1.125rem",
                maxWidth: 500,
                mx: "auto",
                position: "relative",
                zIndex: 1,
              }}
            >
              Join companies that have already transformed the way they work
              with Bigeen Solutions.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "center", position: "relative", zIndex: 1 }}
            >
              <MotionBox
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component="a"
                  href="#contact"
                  variant="contained"
                  size="large"
                  sx={{
                    background: gradients.accent,
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    textDecoration: "none",
                    "&:hover": {
                      background: gradients.primary,
                    },
                  }}
                >
                  Book Consultation
                </Button>
              </MotionBox>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component="a"
                  href="#contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    ...glassStyles.dark,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "1rem",
                    textDecoration: "none",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Contact Sales
                </Button>
              </MotionBox>
            </Stack>
          </MotionPaper>
        </Container>
      </Box>
    </Box>
  )
}
