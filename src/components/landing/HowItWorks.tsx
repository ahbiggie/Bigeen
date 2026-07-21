import { Box, Container, Typography, Grid } from "@mui/material"
import { ledger, monoFont } from "../../theme/theme"
import { SectionMark, Stamp } from "./LedgerElements"

// ============================================
// SECTION 3 — THE BIGEEN ANSWER
// Plain steps. The emphasis is Carnegie #4: the
// reader's team ends up running it, not us.
// ============================================

const steps = [
  {
    title: "Diagnose",
    duration: "2–4 weeks",
    body: "We sit inside your operation — not in a boardroom — and trace where cash, time and decisions actually leak. You get a written picture of your business you've never had before.",
  },
  {
    title: "Build with your team",
    duration: "together, not for you",
    body: "SOPs your staff helped write, a financial rhythm you can read in ten minutes a week, and right-sized tools — all designed around power cuts, patchy internet and how Nigerian business really runs.",
  },
  {
    title: "Hand over — and stay",
    duration: "until it runs",
    body: "We train your people until they run it without us. Then we step back. What happens after that is your choice — not a dependency we built.",
  },
]

export const HowItWorks: React.FC = () => (
  <Box
    component="section"
    id="how"
    aria-labelledby="how-heading"
    sx={{
      py: { xs: 7, md: 10 },
      backgroundColor: ledger.greenDeep,
      color: ledger.paperOnDark,
    }}
  >
    <Container maxWidth="lg">
      <SectionMark label="How we work" onDark />

      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            id="how-heading"
            variant="h2"
            sx={{
              fontSize: { xs: "1.85rem", md: "2.4rem" },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Your team runs the system. We make sure of it.
          </Typography>
          <Typography
            sx={{ color: ledger.softOnDark, fontSize: "1.05rem", maxWidth: 620 }}
          >
            Plenty of consultants write you a beautiful document. We stay until
            your people run the new way of working — without us in the room.
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "center" } }}
        >
          <Stamp lines={["We stay until", "your team runs it"]} onDark />
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 1, md: 3 } }}>
        {steps.map((step, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={step.title}>
            <Box
              sx={{
                height: "100%",
                p: { xs: 3, md: 3.5 },
                border: `1px solid ${ledger.lineOnDark}`,
                borderRadius: 2,
              }}
            >
              {/* True sequence — the one place numbering earns its keep */}
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontWeight: 500,
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: ledger.brassBright,
                  mb: 1,
                }}
              >
                Step {i + 1} · {step.duration}
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontSize: "1.25rem", color: ledger.paperOnDark, mb: 1.5 }}
              >
                {step.title}
              </Typography>
              <Typography sx={{ color: ledger.softOnDark, fontSize: "0.95rem" }}>
                {step.body}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)
