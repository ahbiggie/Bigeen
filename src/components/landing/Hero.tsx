import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material"
import { ledger, monoFont } from "../../theme/theme"
import { BOOKING_URL, WHATSAPP_URL, CTA_LABEL } from "../../data/site"

// ============================================
// SECTION 1 — HERO
// Pain-led question in the reader's voice, one
// promise, one CTA. The page's one orchestrated
// motion moment lives here: a staggered rise on
// load (CSS-only; global reduced-motion guard
// in the theme disables it).
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

// Staggered entrance: each hero child rises once on load.
// Transform-only, never opacity: if the animation clock stalls
// (blocked, unsupported, frozen webview), the worst case is a
// 14px offset — the content is never invisible.
const rise = (order: number) => ({
  "@keyframes heroRise": {
    from: { transform: "translateY(14px)" },
    to: { transform: "none" },
  },
  animation: `heroRise 0.5s ease-out ${order * 0.09}s both`,
})

export const Hero: React.FC = () => (
  <Box
    component="section"
    aria-labelledby="hero-heading"
    sx={{
      backgroundColor: ledger.paper,
      borderBottom: `1px solid ${ledger.greenLine}`,
      py: { xs: 7, md: 12 },
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            sx={{
              ...rise(0),
              fontFamily: monoFont,
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ledger.brassDeep,
              mb: 3,
            }}
          >
            For Nigerian business owners with 5–100 staff
          </Typography>

          <Typography
            id="hero-heading"
            variant="h1"
            sx={{
              ...rise(1),
              fontSize: { xs: "2.4rem", sm: "3rem", md: "3.55rem", lg: "3.9rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: ledger.ink,
              mb: 3,
              maxWidth: "14ch",
            }}
          >
            If you took two weeks off, would your business still run?
          </Typography>

          <Typography
            sx={{
              ...rise(2),
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
            sx={rise(3)}
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
              ...rise(4),
              mt: 4,
              fontFamily: monoFont,
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              color: ledger.inkSoft,
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
              ...rise(5),
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mb: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: ledger.brassDeep,
                }}
              >
                Sample handover sheet
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.7rem",
                  color: ledger.inkSoft,
                }}
              >
                wk 09
              </Typography>
            </Box>

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
                        fontFamily: monoFont,
                        fontSize: "0.7rem",
                        letterSpacing: "0.04em",
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
