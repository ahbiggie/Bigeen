import { Box, Container, Typography, Grid } from "@mui/material"
import { ledger, monoFont, tabularNums } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"

// ============================================
// SECTION 5 — WHO THIS IS FOR
// The ICP as a self-qualifier: right-fit founders
// feel seen, wrong-fit visitors self-select out.
// ============================================

const fitItems = [
  {
    label: "Turnover",
    value: "₦50M – ₦1B a year",
    note: "Formalising, past survival stage",
  },
  {
    label: "Team",
    value: "5 – 100 staff",
    note: "Big enough that 'everyone just knows' has stopped working",
  },
  {
    label: "You",
    value: "Still in daily operations",
    note: "Approving every payment, answering every question",
  },
  {
    label: "Mindset",
    value: "Ready to invest in structure",
    note: "You want a business, not a bigger job",
  },
]

export const WhoItsFor: React.FC = () => (
  <Box
    component="section"
    id="fit"
    aria-labelledby="fit-heading"
    sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.card }}
  >
    <Container maxWidth="lg">
      <SectionMark label="Is this you?" />

      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            id="fit-heading"
            variant="h2"
            sx={{
              fontSize: { xs: "1.85rem", md: "2.4rem" },
              color: ledger.ink,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            We do our best work with a specific kind of business.
          </Typography>
          <Typography sx={{ color: ledger.inkSoft, fontSize: "1.05rem", mb: 2 }}>
            On the ground in Abuja, and working with businesses in Lagos,
            Ibadan and Port Harcourt.
          </Typography>
          <Box
            sx={{
              mt: 3,
              p: 3,
              backgroundColor: ledger.paper,
              borderRadius: 2,
              border: `1px solid ${ledger.greenLine}`,
            }}
          >
            <Typography
              sx={{ fontSize: "0.95rem", color: ledger.inkSoft }}
            >
              <Box component="strong" sx={{ color: ledger.ink }}>
                An honest note:
              </Box>{" "}
              if you're pre-revenue, or you want someone to run the business
              for you, we're not the right fit. We build systems your own team
              runs — that's the whole point.
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ borderTop: `2px solid ${ledger.ink}` }}>
            {fitItems.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "110px 1fr" },
                  gap: { xs: 0.5, sm: 3 },
                  py: 2.5,
                  borderBottom: `1px dashed ${ledger.greenLine}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: ledger.brassDeep,
                    fontWeight: 500,
                    pt: 0.75,
                  }}
                >
                  {item.label}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      ...tabularNums,
                      fontFamily: monoFont,
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      color: ledger.ink,
                    }}
                  >
                    {item.value}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: ledger.inkSoft }}>
                    {item.note}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
)
