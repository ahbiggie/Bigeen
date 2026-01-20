import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material"
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Twitter,
  GitHub,
  ExpandMore,
  Send,
} from "@mui/icons-material"
import { useState } from "react"
import { useBigeenStore } from "../store/useBigeenStore"
import { gradients } from "../theme/theme" // Ensure imports exist
import type { ContactInfo, FAQItem } from "../types"

interface ContactPageProps {
  faqs?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How does the Business Diagnostic work?",
    answer:
      "Our diagnostic is a 2-4 week engagement where we deep-dive into your financials, operations, and compliance. You get a prioritized action plan to fix bottlenecks immediately.",
  },
  {
    question: "Do you build custom software or use existing tools?",
    answer:
      "We believe in pragmatism. We implement proven SaaS tools (CRM, HR, Accounting) first. We only build custom software when off-the-shelf solutions cannot meet your specific operational needs.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We focus on high-growth African SMEs in Logistics, Fintech, Retail, and Healthcare—sectors where operational efficiency directly impacts the bottom line.",
  },
  {
    question: "Can I hire you for just strategy or just tech?",
    answer:
      "Yes. While our Hybrid Model offers the most value, we offer standalone 'Strategic Consulting' or 'SaaS Implementation' packages tailored to your current stage.",
  },
]

export const ContactPage: React.FC<ContactPageProps> = ({
  faqs = defaultFAQs,
}) => {
  const {
    contactForm,
    setContactFormField,
    resetContactForm,
    expandedFaq,
    setExpandedFaq,
  } = useBigeenStore()

  // Local state for submission feedback
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const contactInfo: ContactInfo[] = [
    {
      icon: <Email sx={{ fontSize: 24, color: "#667eea" }} />,
      label: "Email us",
      value: "hello@bigeen.solutions",
    },
    {
      icon: <Phone sx={{ fontSize: 24, color: "#667eea" }} />,
      label: "Call us",
      value: "+234 (0) 800 BIGEEN",
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: "#667eea" }} />,
      label: "Visit us",
      value: "Abuja, Nigeria",
    },
  ]

  //Service Pillars
  const topicOptions = [
    "Business Diagnostic (Consulting)",
    "SaaS Implementation",
    "Custom Software Dev",
    "Venture Studio / Investment",
    "General Inquiry",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      })

      if (response.ok) {
        setStatus("success")
        resetContactForm() // Reset form after successful submission
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Submission Error:", error)
      setStatus("error")
    }
  }

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
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
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: gradients.accent,
            opacity: 0.1,
            filter: "blur(80px)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6}>
            {/* Left Column - Contact Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.813rem",
                    letterSpacing: 1.2,
                    mb: 2,
                    display: "block",
                  }}
                >
                  CONTACT US
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem" },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  Let's fix your <br />
                  <Box component="span" sx={{ color: "primary.main" }}>
                    Infrastructure.
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    mb: 5,
                    maxWidth: 480,
                  }}
                >
                  Ready to move from survival to scale? Whether you need a
                  operational diagnostic or a custom tech stack, our team in
                  Abuja is ready to deploy.
                </Typography>

                {/* Contact Information Cards */}
                <Stack spacing={3} sx={{ mb: 4 }}>
                  {contactInfo.map((info, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.875rem",
                            mb: 0.5,
                          }}
                        >
                          {info.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.primary",
                            fontWeight: 600,
                            fontSize: "1rem",
                          }}
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                {/* Social Links */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  {[LinkedIn, Twitter, GitHub].map((Icon, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        border: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                          transform: "translateY(-2px)",
                          color: "primary.main",
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: 20, color: "text.secondary" }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Contact Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "rgba(255, 255, 255, 0.8)", // Glass effect
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: 4, color: "text.primary" }}
                  >
                    Send us a message
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
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
                          required
                          placeholder="Jane Doe"
                          value={contactForm.fullName}
                          onChange={(e) =>
                            setContactFormField("fullName", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
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
                          required
                          type="email"
                          placeholder="jane@company.com"
                          value={contactForm.workEmail}
                          onChange={(e) =>
                            setContactFormField("workEmail", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
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
                          Phone Number
                        </Typography>
                        <TextField
                          fullWidth
                          type="tel"
                          placeholder="+234 800 123 4567"
                          value={contactForm.phoneNumber}
                          onChange={(e) =>
                            setContactFormField("phoneNumber", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                        >
                          Company Name
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Acme Corp"
                          value={contactForm.companyName}
                          onChange={(e) =>
                            setContactFormField("companyName", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                        >
                          Topic
                        </Typography>
                        <TextField
                          select
                          fullWidth
                          value={contactForm.topic}
                          onChange={(e) =>
                            setContactFormField("topic", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
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

                      <Grid size={12}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                        >
                          How can we help?
                        </Typography>
                        <TextField
                          fullWidth
                          required
                          multiline
                          rows={4}
                          placeholder="Tell us about your operational bottlenecks..."
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactFormField("message", e.target.value)
                          }
                          disabled={status === "loading"}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.paper",
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          endIcon={
                            status === "loading" ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              <Send />
                            )
                          }
                          disabled={status === "loading"}
                          sx={{
                            background: gradients.primary,
                            color: "white",
                            fontWeight: 600,
                            py: 1.75,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                            "&:hover": {
                              background: gradients.accent,
                              boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {status === "loading" ? "Sending..." : "Send Message"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 800,
              textAlign: "center",
              mb: 6,
              color: "text.primary",
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Stack spacing={2}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedFaq === index}
                onChange={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                elevation={0}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px !important",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: "0 !important", mb: 2 },
                  backgroundColor: "background.default",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    px: 3,
                    py: 2,
                    "& .MuiAccordionSummary-content": { my: 1 },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Success/Error Snackbars */}
      <Snackbar
        open={status === "success"}
        autoHideDuration={6000}
        onClose={() => setStatus("idle")}
      >
        <Alert
          onClose={() => setStatus("idle")}
          severity="success"
          sx={{ width: "100%" }}
        >
          Message sent! We will diagnose your request shortly.
        </Alert>
      </Snackbar>
      <Snackbar
        open={status === "error"}
        autoHideDuration={6000}
        onClose={() => setStatus("idle")}
      >
        <Alert
          onClose={() => setStatus("idle")}
          severity="error"
          sx={{ width: "100%" }}
        >
          Transmission failed. Please try again later.
        </Alert>
      </Snackbar>
    </Box>
  )
}
