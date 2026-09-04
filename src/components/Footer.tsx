import { Box, Container, Typography, Link, Stack, Grid } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { ledger, monoFont } from "../theme/theme"
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
  LINKEDIN_COMPANY_URL,
} from "../data/site"

// ============================================
// SECTION 9 — FOOTER
// Contact, LinkedIn primary, NDPR-aware note.
// Only links that actually exist.
// ============================================

const footerLinkSx = {
  color: ledger.softOnDark,
  fontSize: "0.9rem",
  textDecoration: "none",
  width: "fit-content",
  "&:hover": { color: ledger.paperOnDark, textDecoration: "underline" },
}

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: ledger.greenDeep,
      color: ledger.paperOnDark,
      borderTop: `1px solid ${ledger.lineOnDark}`,
      pt: 7,
      pb: 4,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 4, md: 6 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "1.15rem",
              mb: 1.5,
            }}
          >
            Bigeen Solutions Limited
          </Typography>
          <Typography
            sx={{
              color: ledger.softOnDark,
              fontSize: "0.9rem",
              maxWidth: 340,
              mb: 2.5,
            }}
          >
            Business systems for Nigerian SMEs — built with your team, run by
            your team. CAC-registered private limited company, Abuja.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link
              href={LINKEDIN_COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bigeen Solutions on LinkedIn"
              sx={{
                color: ledger.softOnDark,
                "&:hover": { color: ledger.brassBright },
              }}
            >
              <LinkedInIcon />
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Bigeen on WhatsApp"
              sx={{
                color: ledger.softOnDark,
                "&:hover": { color: ledger.brassBright },
              }}
            >
              <WhatsAppIcon />
            </Link>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ledger.brassBright,
              mb: 2,
            }}
          >
            Contact
          </Typography>
          <Stack spacing={1.25}>
            <Link href={`mailto:${EMAIL}`} sx={footerLinkSx}>
              {EMAIL}
            </Link>
            <Link href={`tel:${PHONE_TEL}`} sx={footerLinkSx}>
              {PHONE_DISPLAY}
            </Link>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={footerLinkSx}
            >
              WhatsApp us
            </Link>
            <Typography sx={{ color: ledger.softOnDark, fontSize: "0.9rem" }}>
              Abuja, Nigeria
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ledger.brassBright,
              mb: 2,
            }}
          >
            Your data
          </Typography>
          <Typography sx={{ color: ledger.softOnDark, fontSize: "0.9rem" }}>
            Anything you share with us — through this site, on a call, or
            during an engagement — is treated as confidential and handled in
            line with the Nigeria Data Protection Regulation (NDPR). We collect
            only what we need to respond to you, and we never sell or share
            your details.
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: `1px solid ${ledger.lineOnDark}`,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography sx={{ color: ledger.softOnDark, fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} Bigeen Solutions Limited. All rights
          reserved.
        </Typography>
        <Typography sx={{ color: ledger.softOnDark, fontSize: "0.8rem" }}>
          Built for Nigerian connections — light pages, no tracking scripts.
        </Typography>
      </Box>
    </Container>
  </Box>
)
