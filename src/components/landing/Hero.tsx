import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material"
import { ledger } from "../../theme/theme"
import { BOOKING_URL, WHATSAPP_URL, CTA_LABEL } from "../../data/site"

// ============================================
// SECTION 1 — HERO
// Pain-led question in the reader's voice, one
// promise, one CTA. No video, no stock photo —
// the visual is a CSS-only diagnostic sheet.
// ============================================

const checklistItems = [
  { label: "Personal & business cash separated", state: "done" },
  { label: "Margin known per product", state: "done" },
  { label: "Receivables reviewed every week", state: "active" },
  { label: "Payroll runs without the founder", state: "pending" },
] as const

const stateStyles = {
  done: { mark: "✓", color: ledger.green, note: "handed over" },
  active: { mark: "—", color: ledger.brassDeep, note: "in training" },
  pending: { mark: "", color: ledger.inkSoft, note: "up next" },
} as const

export const Hero: React.FC = () => (
  <Box
    component="section"
    aria-labelledby="hero-heading"
    sx={{
      backgroundColor: ledger.paper,
      borderBottom: `1px solid ${ledger.greenLine}`,
      py: { xs: 7, md: 11 },
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 500,
              fontSize: "0.875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ledger.brassDeep,
              mb: 2.5,
            }}
          >
            For Nigerian business owners with 5–100 staff
          </Typography>

          <Typography
            id="hero-heading"
            variant="h1"
            sx={{
              fontSize: { xs: "2.25rem", sm: "2.75rem", md: "3.4rem" },
              lineHeight: 1.12,
              color: ledger.ink,
              mb: 3,
            }}
          >
            If you took two weeks off, would your business still run?
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.05rem", md: "1.15rem" },
              color: ledger.inkSoft,
              maxWidth: 540,
              mb: 4,
            }}
          >
            Most owners can't say yes. We build the systems — processes,
            financial visibility, tools your team actually uses — and we stay
            until your people run them competently. Not until a report is
            submitted.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <Button
              component="a"
              href={BOOKING_URL}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: ledger.green,
                color: "#fff",
                px: 4,
                py: 1.75,
                fontSize: "1.05rem",
                "&:hover": { backgroundColor: ledger.greenDeep },
              }}
            >
              {CTA_LABEL}
            </Button>
            <Typography
              component="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: ledger.green,
                fontWeight: 600,
                fontSize: "0.95rem",
                textAlign: { xs: "center", sm: "left" },
                textDecorationColor: ledger.brass,
                textUnderlineOffset: "4px",
              }}
            >
              or chat with us on WhatsApp
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 4,
              fontSize: "0.85rem",
              color: ledger.inkSoft,
              letterSpacing: "0.04em",
            }}
          >
            CAC-registered · Founder-led · Abuja, Nigeria
          </Typography>
        </Grid>

        {/* Diagnostic sheet — pure CSS, ~0 kB, on-message */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            aria-hidden
            sx={{
              backgroundColor: ledger.card,
              border: `1px solid ${ledger.greenLine}`,
              borderTop: `4px solid ${ledger.green}`,
              borderRadius: 2,
              p: { xs: 3, md: 4 },
              boxShadow: "0 12px 32px rgba(12, 46, 33, 0.08)",
              maxWidth: 420,
              mx: { xs: "auto", md: 0 },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: ledger.brassDeep,
                mb: 2.5,
              }}
            >
              Sample handover sheet
            </Typography>

            <Stack spacing={0}>
              {checklistItems.map((item) => {
                const style = stateStyles[item.state]
                return (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1.5,
                      py: 1.5,
                      borderBottom: `1px dashed ${ledger.greenLine}`,
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        flexShrink: 0,
                        border: `2px solid ${style.color}`,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: style.color,
                        alignSelf: "center",
                      }}
                    >
                      {style.mark}
                    </Box>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: "0.95rem",
                        color:
                          item.state === "pending"
                            ? ledger.inkSoft
                            : ledger.ink,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        color: style.color,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {style.note}
                    </Typography>
                  </Box>
                )
              })}
            </Stack>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: "0.85rem",
                color: ledger.inkSoft,
                fontStyle: "italic",
              }}
            >
              We leave at "runs without us" — not at "report submitted."
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
)
