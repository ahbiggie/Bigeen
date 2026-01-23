import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  Grid,
  Paper,
} from "@mui/material"
import { ArrowForward, PlayArrow, Star } from "@mui/icons-material"

import { motion } from "framer-motion"
import { gradients, glassStyles, blobKeyframes } from "../theme/theme"
import { FeatureCard } from "../components/ui/FeatureCard"
import { ModeSwitch } from "../components/home/ModeSwitch"
import { useBigeenStore } from "../store/useBigeenStore"
import { CONTENT } from "../data/content"

// ============================================
// MOTION COMPONENTS
// ============================================

const MotionBox = motion.create(Box)
const MotionTypography = motion.create(Typography)
const MotionStack = motion.create(Stack)
const MotionCard = motion.create(Card)
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
      opacity: 0.6,
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
// ANIMATION VARIANTS (typed for framer-motion 12)
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
} as const

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
} as const

// Float animation for direct animate prop (not variants)
const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
}

// ============================================
// HOMEPAGE COMPONENT
// ============================================

export const HomePage: React.FC = () => {
  const { appMode } = useBigeenStore()
  const content = appMode === "tech" ? CONTENT.tech : CONTENT.consult

  return (
    <Box>
      {/* ======================== HERO SECTION ======================== */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #F8FAFC 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Animated Background Blobs */}
        <AnimatedBlob
          color="#667eea"
          size={400}
          top="-10%"
          left="10%"
          delay={0}
        />
        <AnimatedBlob
          color="#09065b"
          size={350}
          top="50%"
          right="-5%"
          delay={2}
        />
        <AnimatedBlob
          color="#3B82F6"
          size={300}
          bottom="-10%"
          left="30%"
          delay={4}
        />
        <AnimatedBlob
          color="#050a6c"
          size={250}
          top="20%"
          right="25%"
          delay={1}
        />
        <AnimatedBlob
          color="#06B6D4"
          size={200}
          bottom="20%"
          left="5%"
          delay={3}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Column: Text Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionStack
                spacing={3}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Mode Switch */}
                <MotionBox variants={itemVariants}>
                  <ModeSwitch />
                </MotionBox>

                <MotionTypography
                  variant="h1"
                  variants={itemVariants}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    color: "text.primary",
                  }}
                >
                  {content.hero.headline}
                </MotionTypography>
                <MotionTypography
                  variant="body1"
                  variants={itemVariants}
                  sx={{
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    color: "text.secondary",
                    maxWidth: 520,
                  }}
                >
                  {content.hero.subhead}
                </MotionTypography>

                {/* CTA Buttons */}
                <MotionBox variants={itemVariants}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ pt: 2 }}
                  >
                    <MotionBox
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        component="a"
                        href="#contact"
                        sx={{
                          background: gradients.primary,
                          px: 4,
                          py: 1.5,
                          fontSize: "1rem",
                          "&:hover": {
                            background: gradients.accent,
                          },
                        }}
                      >
                        {content.hero.ctaPrimary}
                      </Button>
                    </MotionBox>
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<PlayArrow />}
                        component="a"
                        href="#about"
                        sx={{
                          ...glassStyles.light,
                          borderColor: "transparent",
                          color: "text.primary",
                          px: 4,
                          py: 1.5,
                          fontSize: "1rem",
                          "&:hover": {
                            borderColor: "primary.main",
                            background: glassStyles.medium.background,
                          },
                        }}
                      >
                        {content.hero.ctaSecondary}
                      </Button>
                    </MotionBox>
                  </Stack>
                </MotionBox>

                {/* Social Proof */}
                <MotionBox variants={itemVariants}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ pt: 2 }}
                  >
                    <Stack direction="row" spacing={-0.5}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          sx={{ fontSize: 20, color: "#F59E0B" }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", fontWeight: 500 }}
                    >
                      Trusted by 500+ teams
                    </Typography>
                  </Stack>
                </MotionBox>
              </MotionStack>
            </Grid>

            {/* Right Column: Hero Visual with Video Background */}
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{
                  width: "100%",
                  height: { xs: 300, md: 450 },
                  borderRadius: 4,
                  background: gradients.dark,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Video Background with Fallback */}
                <Box
                  component="video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/hero-fallback.png"
                  onError={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                    e.currentTarget.style.display = "none"
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                >
                  <source src="/videos/hero-video.webm" type="video/webm" />
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                </Box>

                {/* Dark Overlay for better contrast */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.3)",
                    zIndex: 1,
                  }}
                />

                {/* Floating Glass Card - API Calls */}
                <MotionCard
                  animate={floatAnimation}
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "10%",
                    p: 2,
                    borderRadius: 3,
                    ...glassStyles.light,
                    background: "rgba(255, 255, 255, 0.9)",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    API Calls
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "success.main" }}
                  >
                    +42.8%
                  </Typography>
                </MotionCard>

                {/* Floating Glass Card - Status */}
                <MotionCard
                  animate={{
                    ...floatAnimation,
                    transition: { ...floatAnimation.transition, delay: 1 },
                  }}
                  sx={{
                    position: "absolute",
                    bottom: "25%",
                    left: "15%",
                    p: 2,
                    borderRadius: 3,
                    ...glassStyles.light,
                    background: "rgba(255, 255, 255, 0.9)",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    Status
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "success.main" }}
                  >
                    ✓ Deployed
                  </Typography>
                </MotionCard>

                {/* Central Glow Effect */}
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: gradients.accent,
                    opacity: 0.2,
                    filter: "blur(60px)",
                    zIndex: 2,
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ======================== TRUSTED BY SECTION ======================== */}
      <Box sx={{ py: 6, bgcolor: "background.paper" }}>
        <Container maxWidth="xl">
          <Typography
            variant="overline"
            sx={{
              display: "block",
              textAlign: "center",
              color: "text.secondary",
              mb: 4,
              letterSpacing: 1.5,
            }}
          >
            TRUSTED BY INNOVATIVE TEAMS
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {[
              "Bigeen Solutions",
              "Bigeen",
              "Bigeen Inc.",
              "Bigeen LLC",
              "Bigeen Co.",
            ].map((company) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={company}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "text.disabled",
                    fontWeight: 600,
                    opacity: 0.6,
                    transition: "opacity 0.3s",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {company}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ======================== FEATURES SECTION ======================== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2, color: "text.primary" }}>
              Why{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bigeen
              </Box>
              ?
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
              Powerful capabilities wrapped in a simple, intuitive approach.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {content.features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.id}>
                <FeatureCard
                  icon={
                    <feature.icon sx={{ fontSize: 28, color: "#667eea" }} />
                  }
                  title={feature.title}
                  description={feature.description}
                />
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
