import { Box, Container, Typography, Grid, Button } from "@mui/material"
import { ledger, monoFont, tabularNums, cardHover } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"
import { BOOKING_URL, CTA_LABEL } from "../../data/site"

// ============================================
// SECTION 4 — SERVICES
// The three revenue engines as scannable offers
// with draft naira ranges (founder to approve).
// ============================================

const offers = [
  {
    name: "Consulting & systems",
    forWho: "For the founder who is the system",
    body: "Business diagnostics, SOP and process design, financial planning and team training — the structure that lets you step out of daily firefighting.",
    priceLines: [
      { label: "Projects", value: "₦150K – ₦2M" },
      { label: "Retainers", value: "₦100K – ₦700K /mo" },
    ],
  },
  {
    name: "Software that sticks",
    forWho: "For the tool graveyard",
    body: "The subscriptions you already bought and abandoned — Zoho, QuickBooks, Monday.com, SeamlessHR — selected properly, configured for your workflow, and trained into daily habit.",
    priceLines: [{ label: "Enablement", value: "₦15K – ₦75K /mo" }],
  },
  {
    name: "Equity partnership",
    forWho: "Rare, by invitation",
    body: "For a small number of businesses we deeply believe in, we take part of our fee in equity and build alongside you. Founder-approved, case by case.",
    priceLines: [{ label: "Structure", value: "Discussed directly" }],
  },
]

export const Services: React.FC = () => (
  <Box
    component="section"
    id="services"
    aria-labelledby="services-heading"
    sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.paper }}
  >
    <Container maxWidth="lg">
      <SectionMark label="What we do" />

      <Typography
        id="services-heading"
        variant="h2"
        sx={{
          fontSize: { xs: "1.85rem", md: "2.4rem" },
          color: ledger.ink,
          mb: 1.5,
        }}
      >
        Three ways we work. Real naira, upfront.
      </Typography>
      <Typography
        sx={{ color: ledger.inkSoft, fontSize: "1.05rem", maxWidth: 620, mb: 5 }}
      >
        Every engagement starts with a scoped, written quote — the ranges below
        are so you can decide in ten seconds whether we're in your budget.
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {offers.map((offer) => (
          <Grid size={{ xs: 12, md: 4 }} key={offer.name}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: ledger.card,
                border: `1px solid ${ledger.greenLine}`,
                borderRadius: 2,
                p: { xs: 3, md: 3.5 },
                ...cardHover,
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
                  mb: 1,
                }}
              >
                {offer.forWho}
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: "1.35rem", color: ledger.ink, mb: 1.5 }}
              >
                {offer.name}
              </Typography>
              <Typography
                sx={{ color: ledger.inkSoft, fontSize: "0.95rem", mb: 3, flex: 1 }}
              >
                {offer.body}
              </Typography>

              {/* Ledger lines: label ..... amount */}
              <Box sx={{ borderTop: `2px solid ${ledger.ink}` }}>
                {offer.priceLines.map((line) => (
                  <Box
                    key={line.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      py: 1.25,
                      borderBottom: `1px dashed ${ledger.greenLine}`,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "0.85rem", color: ledger.inkSoft }}
                    >
                      {line.label}
                    </Typography>
                    <Typography
                      sx={{
                        ...tabularNums,
                        fontFamily: monoFont,
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        color: ledger.ink,
                      }}
                    >
                      {line.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography sx={{ color: ledger.inkSoft, fontSize: "0.95rem", mb: 2 }}>
          Not sure which fits? That's exactly what the diagnostic call is for.
        </Typography>
        <Button
          component="a"
          href={BOOKING_URL}
          variant="outlined"
          size="large"
          sx={{
            borderColor: ledger.green,
            borderWidth: 2,
            color: ledger.green,
            px: 4,
            "&:hover": {
              borderWidth: 2,
              borderColor: ledger.greenDeep,
              backgroundColor: "rgba(23, 82, 57, 0.06)",
            },
          }}
        >
          {CTA_LABEL}
        </Button>
      </Box>
    </Container>
  </Box>
)
