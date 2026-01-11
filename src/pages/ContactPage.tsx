import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
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
import { useBigeenStore } from "../store/useBigeenStore"
import type { ContactInfo, FAQItem } from "../types"

interface ContactPageProps {
  faqs?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: "What is the typical response time?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
  },
  {
    question: "Do you offer custom integrations?",
    answer:
      "Yes! We offer custom integration services for enterprise clients. Our team can work with your existing tech stack to create seamless workflows.",
  },
  {
    question: "Where is your headquarters located?",
    answer:
      "Our headquarters is located at 123 Innovation Dr, Tech City. We also have remote teams across multiple time zones to serve you better.",
  },
]

export const ContactPage: React.FC<ContactPageProps> = ({
  faqs = defaultFAQs,
}) => {
  const { contactForm, setContactFormField, expandedFaq, setExpandedFaq } =
    useBigeenStore()

  const contactInfo: ContactInfo[] = [
    {
      icon: <Email sx={{ fontSize: 24, color: "#667eea" }} />,
      label: "Email us",
      value: "bigeen08@gmail.com",
    },
    {
      icon: <Phone sx={{ fontSize: 24, color: "#667eea" }} />,
      label: "Call us",
      value: "+234 567 8901",
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: "#667eea" }} />,
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
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Left Column - Contact Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#667eea",
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
                  Let's scale together.
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
                  Have a question about our integrated tools? Our team is ready
                  to help you optimize your workflow and accelerate growth.
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
                          borderColor: "#667eea",
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                          transform: "translateY(-2px)",
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
                  backgroundColor: "background.paper",
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
                          placeholder="Jane Doe"
                          value={contactForm.fullName}
                          onChange={(e) =>
                            setContactFormField("fullName", e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.default",
                              "&:hover fieldset": { borderColor: "#667eea" },
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
                          type="email"
                          placeholder="jane@company.com"
                          value={contactForm.workEmail}
                          onChange={(e) =>
                            setContactFormField("workEmail", e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.default",
                              "&:hover fieldset": { borderColor: "#667eea" },
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
                          placeholder="Acme Corp"
                          value={contactForm.companyName}
                          onChange={(e) =>
                            setContactFormField("companyName", e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.default",
                              "&:hover fieldset": { borderColor: "#667eea" },
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
                          value={contactForm.topic}
                          onChange={(e) =>
                            setContactFormField("topic", e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.default",
                              "&:hover fieldset": { borderColor: "#667eea" },
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
                          multiline
                          rows={4}
                          placeholder="Tell us more about your project needs..."
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactFormField("message", e.target.value)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "background.default",
                              "&:hover fieldset": { borderColor: "#667eea" },
                            },
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          endIcon={<Send />}
                          sx={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            fontWeight: 600,
                            py: 1.75,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "1rem",
                            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                              boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          Send Message
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
    </Box>
  )
}
