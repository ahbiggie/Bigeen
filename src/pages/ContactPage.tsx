import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Stack,
  IconButton,
} from "@mui/material"
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Twitter,
  GitHub,
  Send,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import { useBigeenStore } from "../store/useBigeenStore"
import { glassStyles, gradients, blobKeyframes } from "../theme/theme"
import type { ContactInfo } from "../types"

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
      filter: "blur(80px)",
      opacity: 0.6,
      top,
      left,
      right,
      bottom,
      animation: `blob 8s ease-in-out infinite ${delay}s`,
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
// CONTACT PAGE COMPONENT
// ============================================

export const ContactPage: React.FC = () => {
  const { contactForm, setContactFormField } = useBigeenStore()

  const contactInfo: ContactInfo[] = [
    {
      icon: <Email sx={{ fontSize: 24 }} />,
      label: "Email us",
      value: "solutions@bigeen.com",
    },
    {
      icon: <Phone sx={{ fontSize: 24 }} />,
      label: "Call us",
      value: "+234 803 123 4567",
    },
    {
      icon: <LocationOn sx={{ fontSize: 24 }} />,
      label: "Visit us",
      value: "Abuja, Nigeria",
    },
  ]

  const topicOptions = [
    "General Inquiry",
    "Sales",
    "Technical Support",
    "Partnership",
    "Billing",
    "Other",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", contactForm)
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* ======================== MAIN SECTION ======================== */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #F3E8FF 0%, #E0E7FF 50%, #F8FAFC 100%)",
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Animated Background Blobs */}
        <AnimatedBlob
          color="#667eea"
          size={400}
          top="-10%"
          left="-5%"
          delay={0}
        />
        <AnimatedBlob
          color="#764ba2"
          size={350}
          bottom="-5%"
          right="10%"
          delay={2}
        />
        <AnimatedBlob
          color="#3B82F6"
          size={300}
          top="40%"
          right="-10%"
          delay={1}
        />
        <AnimatedBlob
          color="#06B6D4"
          size={250}
          bottom="20%"
          left="20%"
          delay={3}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            {/* ============ LEFT COLUMN - Contact Info ============ */}
            <Grid size={{ xs: 12, md: 5 }}>
              <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MotionBox variants={itemVariants}>
                  <Typography
                    variant="overline"
                    sx={{
                      background: gradients.accent,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      letterSpacing: 1.5,
                      mb: 2,
                      display: "block",
                    }}
                  >
                    CONTACT US
                  </Typography>
                </MotionBox>

                <MotionTypography
                  variant="h1"
                  variants={itemVariants}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  Let's Build Something{" "}
                  <Box
                    component="span"
                    sx={{
                      background: gradients.accent,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Great
                  </Box>
                </MotionTypography>

                <MotionTypography
                  variant="body1"
                  variants={itemVariants}
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    mb: 5,
                    maxWidth: 450,
                  }}
                >
                  Have a question about our integrated tools? Our team is ready
                  to help you optimize your workflow and accelerate growth.
                </MotionTypography>

                {/* Contact Details */}
                <MotionBox variants={itemVariants}>
                  <Stack spacing={3} sx={{ mb: 5 }}>
                    {contactInfo.map((info, index) => (
                      <MotionPaper
                        key={index}
                        whileHover={{ x: 5, scale: 1.02 }}
                        elevation={0}
                        sx={{
                          ...glassStyles.light,
                          borderRadius: 3,
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: glassStyles.accent.background,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "primary.main",
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mb: 0.5 }}
                          >
                            {info.label}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "text.primary", fontWeight: 600 }}
                          >
                            {info.value}
                          </Typography>
                        </Box>
                      </MotionPaper>
                    ))}
                  </Stack>
                </MotionBox>

                {/* Social Links */}
                <MotionBox variants={itemVariants}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 2, fontWeight: 500 }}
                  >
                    Follow us
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    {[
                      { icon: LinkedIn, href: "#" },
                      { icon: Twitter, href: "#" },
                      { icon: GitHub, href: "#" },
                    ].map(({ icon: Icon, href }, index) => (
                      <MotionBox
                        key={index}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          component="a"
                          href={href}
                          sx={{
                            ...glassStyles.light,
                            width: 44,
                            height: 44,
                            color: "text.secondary",
                            "&:hover": {
                              color: "primary.main",
                              background: glassStyles.medium.background,
                            },
                          }}
                        >
                          <Icon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </MotionBox>
                    ))}
                  </Stack>
                </MotionBox>
              </MotionBox>
            </Grid>

            {/* ============ RIGHT COLUMN - Contact Form ============ */}
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionPaper
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.2,
                }}
                elevation={0}
                sx={{
                  ...glassStyles.medium,
                  borderRadius: 4,
                  p: { xs: 4, md: 6 },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Form Background Blob */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: gradients.accent,
                    opacity: 0.08,
                    filter: "blur(40px)",
                  }}
                />

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    color: "text.primary",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Send us a message
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        Full Name
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Jane Doe"
                        value={contactForm.fullName}
                        onChange={(e) =>
                          setContactFormField("fullName", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        Work Email
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        type="email"
                        placeholder="jane@company.com"
                        value={contactForm.workEmail}
                        onChange={(e) =>
                          setContactFormField("workEmail", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        Company Name
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Acme Corp"
                        value={contactForm.companyName}
                        onChange={(e) =>
                          setContactFormField("companyName", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        Topic
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={contactForm.topic}
                        onChange={(e) =>
                          setContactFormField("topic", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      >
                        {topicOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                      >
                        How can we help?
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={5}
                        placeholder="Tell us more about your project needs..."
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactFormField("message", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            "&:hover fieldset": { borderColor: "primary.main" },
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.main",
                            },
                          },
                        }}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <MotionBox
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          size="large"
                          endIcon={<Send />}
                          sx={{
                            background: gradients.accent,
                            color: "white",
                            fontWeight: 600,
                            py: 2,
                            borderRadius: 2,
                            fontSize: "1.1rem",
                            boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)",
                            "&:hover": {
                              background: gradients.primary,
                              boxShadow: "0 12px 32px rgba(124, 58, 237, 0.4)",
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </MotionBox>
                    </Grid>
                  </Grid>
                </Box>
              </MotionPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
