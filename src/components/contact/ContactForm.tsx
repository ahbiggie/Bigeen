import { useState, useEffect } from "react"
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material"
import { Send, CheckCircle } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useBigeenStore } from "../../store/useBigeenStore"
import { gradients } from "../../theme/theme"

// ============================================
// MOTION COMPONENTS
// ============================================

const MotionBox = motion.create(Box)

// ============================================
// GLASS INPUT STYLES
// ============================================

const glassInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
      "& fieldset": {
        borderColor: "primary.main",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      "& fieldset": {
        borderColor: "primary.main",
        borderWidth: 2,
      },
    },
  },
  "& .MuiInputBase-input": {
    color: "text.primary",
    "&::placeholder": {
      color: "text.secondary",
      opacity: 0.7,
    },
  },
}

// ============================================
// FORM FIELD LABELS
// ============================================

interface FormFieldProps {
  label: string
  children: React.ReactNode
  required?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  required = false,
}) => (
  <Box>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        mb: 1,
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: "error.main" }}>
          *
        </Box>
      )}
    </Typography>
    {children}
  </Box>
)

// ============================================
// PROJECT TYPE OPTIONS (Context-Aware)
// ============================================

const softwareProjectTypes = [
  "Web Application Development",
  "Mobile App Development",
  "SaaS Product Build",
  "API Integration",
  "Technical Support",
  "Other",
]

const consultingProjectTypes = [
  "Technical Audit",
  "Architecture Design",
  "Team Augmentation",
  "Digital Strategy",
  "Process Optimization",
  "Other",
]

// ============================================
// VALIDATION
// ============================================

interface FormErrors {
  fullName?: string
  workEmail?: string
  message?: string
}

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// ============================================
// CONTACT FORM COMPONENT
// ============================================

export const ContactForm: React.FC = () => {
  const { appMode, contactForm, setContactFormField, resetContactForm } =
    useBigeenStore()

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info"
  }>({
    open: false,
    message: "",
    severity: "info",
  })

  // Get project types based on current app mode
  const projectTypes =
    appMode === "Software" ? softwareProjectTypes : consultingProjectTypes

  // Set default topic when mode changes (if topic is empty or not in current list)
  useEffect(() => {
    if (!contactForm.topic || !projectTypes.includes(contactForm.topic)) {
      setContactFormField("topic", projectTypes[0])
    }
  }, [appMode, projectTypes, contactForm.topic, setContactFormField])

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!contactForm.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!contactForm.workEmail.trim()) {
      newErrors.workEmail = "Email is required"
    } else if (!validateEmail(contactForm.workEmail)) {
      newErrors.workEmail = "Please enter a valid email"
    }

    if (!contactForm.message.trim()) {
      newErrors.message = "Please tell us about your project"
    } else if (contactForm.message.trim().length < 20) {
      newErrors.message = "Please provide more details (min 20 characters)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before submitting",
        severity: "error",
      })
      return
    }

    setIsSubmitting(true)
    setSnackbar({
      open: true,
      message: "Sending your message...",
      severity: "info",
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", {
      ...contactForm,
      appMode,
      submittedAt: new Date().toISOString(),
    })

    setIsSubmitting(false)
    setSnackbar({
      open: true,
      message: "Message sent successfully! We'll get back to you soon.",
      severity: "success",
    })

    // Reset form after successful submission
    resetContactForm()
  }

  // Clear field error on change
  const handleFieldChange = (
    field: keyof typeof contactForm,
    value: string
  ) => {
    setContactFormField(field, value)
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Full Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField label="Full Name" required>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Jane Doe"
                value={contactForm.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                error={!!errors.fullName}
                helperText={errors.fullName}
                sx={glassInputSx}
              />
            </FormField>
          </Grid>

          {/* Work Email */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField label="Work Email" required>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                placeholder="jane@company.com"
                value={contactForm.workEmail}
                onChange={(e) => handleFieldChange("workEmail", e.target.value)}
                error={!!errors.workEmail}
                helperText={errors.workEmail}
                sx={glassInputSx}
              />
            </FormField>
          </Grid>

          {/* Company Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField label="Company Name">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Acme Corp"
                value={contactForm.companyName}
                onChange={(e) =>
                  handleFieldChange("companyName", e.target.value)
                }
                sx={glassInputSx}
              />
            </FormField>
          </Grid>

          {/* Project Type (Context-Aware) */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField label="Project Type">
              <TextField
                select
                fullWidth
                variant="outlined"
                value={contactForm.topic || projectTypes[0]}
                onChange={(e) => handleFieldChange("topic", e.target.value)}
                sx={glassInputSx}
              >
                {projectTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormField>
          </Grid>

          {/* Message */}
          <Grid size={{ xs: 12 }}>
            <FormField label="How can we help?" required>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                placeholder={
                  appMode === "Software"
                    ? "Tell us about the application you want to build..."
                    : "Describe the challenges you're facing and how we can help..."
                }
                value={contactForm.message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
                error={!!errors.message}
                helperText={errors.message}
                sx={glassInputSx}
              />
            </FormField>
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <MotionBox
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CheckCircle /> : <Send />}
                sx={{
                  background: isSubmitting
                    ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                    : gradients.accent,
                  color: "white",
                  fontWeight: 600,
                  py: 2,
                  borderRadius: 2,
                  fontSize: "1.1rem",
                  boxShadow: isSubmitting
                    ? "0 8px 24px rgba(16, 185, 129, 0.3)"
                    : "0 8px 24px rgba(124, 58, 237, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: isSubmitting
                      ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                      : gradients.primary,
                    boxShadow: "0 12px 32px rgba(124, 58, 237, 0.4)",
                  },
                  "&:disabled": {
                    color: "white",
                    opacity: 0.9,
                  },
                }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </MotionBox>
          </Grid>
        </Grid>
      </Box>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "success" ? 5000 : 4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
