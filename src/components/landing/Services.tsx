import { Box, Container, Typography, Grid, Button } from "@mui/material"
import { ledger, monoFont, tabularNums, cardHover } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"
import { BOOKING_URL, CTA_LABEL } from "../../data/site"

// ============================================
// SECTION — SERVICES
// Three offers with a tiered pricing ladder set to
// premium positioning (CEO review). The old ₦150K
// floor becomes a named "Starter Diagnostic" product
// instead of the bottom of a confusing range.
// TODO(founder review): all figures are drafts.
// ============================================

const offers = [
  {
    name: "Consulting & systems",
    forWho: "For the founder who is the system",
    body: "Diagnostics, SOP and process design, financial planning and team training — the structure that lets you step out of daily firefighting.",
    priceLines: [
      { label: "Starter Diagnostic", value: "from ₦150K" },
      { label: "Diagnostic engagement", value: "₦800K – ₦3M" },
      { label: "Full transformation", value: "₦3M – ₦12M" },
      { label: "Advisory retainer", value: "₦300K – ₦1.5M /mo" },
    ],
  },
  {
    name: "Software & products",
    forWho: "Beyond the tool graveyard",
    body: "We find the right tools, configure them for your workflow, and train them into daily habit. Where the right tool doesn't exist for how Nigerian businesses run, we build it — because our software advice comes from people who ship software.",
    priceLines: [{ label: "Enablement", value: "₦75K – ₦300K /mo" }],
  },
  {
    name: "Equity partnership",
    forWho: "Rare, by invitation",
    body: "For a few businesses we deeply believe in, we take part of our fee in equity and build alongside you. We look for a proven product, a founder we'd back, and a market with room to grow. It's founder-approved, case by case — and it always starts the same way everyone else does: with a diagnostic call.",
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
        sx={{ color: ledger.inkSoft, fontSize: "1.05rem", maxWidth: 640, mb: 5 }}
      >
        The ranges below are so you can decide in ten seconds whether we're in
        your budget. Every engagement starts with a scoped, written quote.
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
                      gap: 2,
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
                        fontSize: "0.9rem",
                        color: ledger.ink,
                        whiteSpace: "nowrap",
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

      {/* Technology vision — the SaaS half of the hybrid, made visible */}
      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          p: { xs: 3, md: 4 },
          backgroundColor: ledger.greenDeep,
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: monoFont,
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ledger.brassBright,
            mb: 1.5,
          }}
        >
          Where we're headed
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1.15rem", md: "1.35rem" },
            color: ledger.paperOnDark,
            maxWidth: 780,
            lineHeight: 1.5,
          }}
        >
          We build for what we can't find: purpose-built tools designed around
          how Nigerian businesses actually operate. Consulting fixes your
          systems today; our own products are how we intend to scale that fix
          to thousands of businesses we'll never sit inside.
        </Typography>
      </Box>

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
