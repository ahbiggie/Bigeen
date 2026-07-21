import { Box, Container, Typography, Grid } from "@mui/material"
import { ledger, monoFont } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"

// ============================================
// SECTION — WHAT AN ENGAGEMENT LOOKS LIKE
// Methodology as evidence + illustrative "what we
// typically find" (CEO review alternatives 2 & 4):
// credibility through visible process and pattern
// recognition, not invented client results.
// ============================================

const deliverables = [
  "A written diagnostic report — where cash, time and decisions leak, ranked by what to fix first",
  "A 90-day systems plan your team can actually execute",
  "SOPs for the processes that were living only in someone's head",
  "A weekly financial rhythm you can read in ten minutes",
  "A handover checklist — the one at the top of this page, filled in for your business",
]

const typicalFindings = [
  "A founder personally approving every payment above ₦50,000",
  "At least two staff whose real job differs from what they were hired for",
  "Financial reports running 3–6 weeks behind reality",
  "One or two tools the business pays for and nobody uses",
  "Pricing based on what competitors charge, not what the business costs to run",
]

export const Approach: React.FC = () => (
  <Box
    component="section"
    id="approach"
    aria-labelledby="approach-heading"
    sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.card }}
  >
    <Container maxWidth="lg">
      <SectionMark label="What you get" />

      <Typography
        id="approach-heading"
        variant="h2"
        sx={{
          fontSize: { xs: "1.85rem", md: "2.4rem" },
          color: ledger.ink,
          mb: 1.5,
        }}
      >
        What a Bigeen engagement actually looks like.
      </Typography>
      <Typography
        sx={{ color: ledger.inkSoft, fontSize: "1.05rem", maxWidth: 640, mb: 5 }}
      >
        You can judge the thinking before you pay for it. Here's what the
        diagnostic produces — and what, in our experience, it usually surfaces.
      </Typography>

      <Grid container spacing={{ xs: 4, md: 6 }}>
        {/* What the diagnostic delivers */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontFamily: monoFont,
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ledger.brassDeep,
              mb: 2,
            }}
          >
            The diagnostic delivers
          </Typography>
          <Box sx={{ borderTop: `2px solid ${ledger.ink}` }}>
            {deliverables.map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  py: 1.75,
                  borderBottom: `1px dashed ${ledger.greenLine}`,
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    color: ledger.green,
                    fontWeight: 700,
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  ✓
                </Box>
                <Typography sx={{ color: ledger.ink, fontSize: "0.98rem" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Illustrative findings — "typically", not a claim */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: ledger.greenDeep,
              borderRadius: 2,
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ledger.brassBright,
                mb: 2,
              }}
            >
              What we typically find in Week 2
            </Typography>
            <Box sx={{ display: "grid", gap: 1.75 }}>
              {typicalFindings.map((item) => (
                <Box key={item} sx={{ display: "flex", gap: 1.5 }}>
                  <Box
                    aria-hidden
                    sx={{ color: ledger.brassBright, lineHeight: 1.6 }}
                  >
                    —
                  </Box>
                  <Typography
                    sx={{ color: ledger.paperOnDark, fontSize: "0.98rem" }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography
              sx={{
                mt: 3,
                color: ledger.softOnDark,
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              None of this is unusual. All of it is fixable.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
)
