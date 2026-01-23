import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Grid,
} from "@mui/material"
import { LinkedIn, Twitter, GitHub } from "@mui/icons-material"

import { gradients } from "../theme/theme"

// ============================================
// FOOTER LINK DATA
// ============================================

const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Strategic Roadmap", href: "#roadmap" },
  { label: "Contact HQ", href: "#contact" },
  { label: "Careers", href: "#careers" },
]

const resourceLinks = [
  { label: "Our Methodology", href: "#about" },
  { label: "Case Studies", href: "#roadmap" },
  { label: "Insights & Blog", href: "#blog" },
  { label: "Client Support", href: "#contact" },
]

// ============================================
// FOOTER COMPONENT
// ============================================

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0F172A",
        color: "white",
        pt: 8,
        pb: 4,
        mt: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* ============ COLUMN 1: Brand & Mission ============ */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  background: gradients.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: 800 }}
                >
                  B
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Bigeen
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.65)",
                mb: 3,
                maxWidth: 320,
                lineHeight: 1.7,
              }}
            >
              We build the operational infrastructure African businesses need to
              scale. Bridging the gap between high-level strategy and pragmatic
              digital execution.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { icon: LinkedIn, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: GitHub, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={href}
                  size="small"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* ============ COLUMN 2: Company ============ */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Company
            </Typography>
            <Stack spacing={1.5}>
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "white" },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* ============ COLUMN 3: Resources ============ */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "white" },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        {/* ============ BOTTOM BAR ============ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.813rem" }}
          >
            © {currentYear} Bigeen Solutions Limited. Abuja, Nigeria.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              href="#privacy"
              underline="none"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.813rem",
                "&:hover": { color: "white" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              underline="none"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.813rem",
                "&:hover": { color: "white" },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
