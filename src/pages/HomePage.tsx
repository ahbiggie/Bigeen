import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Card,
  Grid,
} from "@mui/material"
import { ArrowForward, PlayArrow, Star } from "@mui/icons-material"
import { motion } from "framer-motion"
import { gradients, glassStyles, blobKeyframes } from "../theme/theme"
import { FeatureCard } from "../components/ui/FeatureCard"

// ============================================
// MOTION COMPONENTS
// ============================================

const MotionBox = motion.create(Box)
const MotionTypography = motion.create(Typography)
const MotionStack = motion.create(Stack)
const MotionCard = motion.create(Card)

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
  const features = [
    {
      icon: (
        <Box component="span" sx={{ fontSize: 28 }}>
          🚀
        </Box>
      ),
      title: "Smart Automation",
      description:
        "Automate complex workflows with our intelligent process engine.",
    },
    {
      icon: (
        <Box component="span" sx={{ fontSize: 28 }}>
          📊
        </Box>
      ),
      title: "Real-time Analytics",
      description: "Deep insights with built-in analytics that just works.",
    },
    {
      icon: (
        <Box component="span" sx={{ fontSize: 28 }}>
          🔒
        </Box>
      ),
      title: "Enterprise Security",
      description: "SOC2 compliant with zero-downtime guaranteed.",
    },
    {
      icon: (
        <Box component="span" sx={{ fontSize: 28 }}>
          ⚡
        </Box>
      ),
      title: "Instant Scalability",
      description: "Infrastructure that grows effortlessly with your business.",
    },
  ]

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
          color="#764ba2"
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
          color="#7C3AED"
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
                <MotionBox variants={itemVariants}>
                  <Chip
                    label="✨ Now Available for Early Access"
                    sx={{
                      ...glassStyles.light,
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "0.813rem",
                      px: 1,
                    }}
                  />
                </MotionBox>
                <MotionTypography
                  variant="h1"
                  variants={itemVariants}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    color: "text.primary",
                  }}
                >
                  Scale Your Micro-
                  <Box
                    component="span"
                    sx={{
                      background: gradients.accent,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    SaaS
                  </Box>{" "}
                  Stack.
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
                  Integrated tools for the modern founder. Automate workflows,
                  analyze growth, and scale infrastructure without the
                  enterprise bloat.
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
                        Get Early Access
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
                        Watch Demo
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
                      Trusted by 500+ founders
                    </Typography>
                  </Stack>
                </MotionBox>
              </MotionStack>
            </Grid>

            {/* Right Column: Hero Visual with Glass Cards */}
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
            TRUSTED BY INNOVATIVE TEAMS WORLDWIDE
          </Typography>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {[
              "Accenture",
              "Deloitte",
              "Nvidia",
              "Vercel",
              "Shopify",
              "Stripe",
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
              Everything you need to{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                grow
              </Box>
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
              Powerful features wrapped in a simple, intuitive interface
              designed for lean teams.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ======================== CTA SECTION ======================== */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Card
            elevation={0}
            sx={{
              background: gradients.dark,
              borderRadius: 4,
              p: { xs: 4, md: 8 },
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
                opacity: 0.1,
                filter: "blur(80px)",
              }}
            />

            <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
              Ready to simplify your stack?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.8)",
                mb: 4,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Join 500+ companies that have already transformed their workflows
              with Bigeen Solutions.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: gradients.accent,
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    background: gradients.primary,
                  },
                }}
              >
                Get Started for Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}
