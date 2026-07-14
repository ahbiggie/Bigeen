import { Box, Container, Typography, Grid } from "@mui/material"
import { ledger, monoFont, tabularNums } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"
import { INDUSTRY_STATS } from "../../data/site"

// ============================================
// SECTION 2 — PROBLEM AGITATION
// The one approved statistic, dramatised as the
// three concrete leaks (trimmed per CEO review),
// then broadened past finance with two non-money
// leaks so operations/people-led founders self-
// identify too. Ends without blaming the reader.
// ============================================

const leaks = [
  {
    tag: "Margin",
    title: "The margin you can't name",
    body: "₦4M came in last month. The account is empty. If you can't name what you keep on each sale, every pricing decision is a guess.",
  },
  {
    tag: "Receivables",
    title: "Money outside, quietly ageing",
    body: "Customers owe you. Nobody tracks who, how much, or since when. Untracked receivables become bad debt nobody approved.",
  },
  {
    tag: "Cash",
    title: "One account, two lives",
    body: "School fees and supplier payments share one account. Until they're separated, you cannot know if the business itself makes money.",
  },
]

// Non-financial leaks — broadens the aperture beyond money (CEO audit)
const softLeaks = [
  {
    tag: "People",
    title: "You are the system",
    body: "Every real decision waits for you. The business doesn't run — it queues behind one person.",
  },
  {
    tag: "Standards",
    title: "No one knows what good looks like",
    body: "Staff do the job the way they each learned it. Quality swings, because the standard lives in your head, not on paper.",
  },
]

export const Problem: React.FC = () => (
  <Box
    component="section"
    id="problem"
    aria-labelledby="problem-heading"
    sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.card }}
  >
    <Container maxWidth="lg">
      <SectionMark label="The pattern" />

      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            id="problem-heading"
            variant="h2"
            sx={{
              fontSize: { xs: "1.85rem", md: "2.4rem" },
              color: ledger.ink,
              mb: 2,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
            }}
          >
            <Box
              component="span"
              sx={{
                ...tabularNums,
                fontFamily: monoFont,
                fontWeight: 500,
                color: ledger.brassDeep,
              }}
            >
              80%
            </Box>{" "}
            of Nigerian SMEs fail within their first 4–5 years.
          </Typography>
          <Typography
            sx={{ color: ledger.ink, fontSize: "1.15rem", fontWeight: 600, mb: 1 }}
          >
            Not from bad ideas. From missing systems.
          </Typography>
          <Typography sx={{ color: ledger.inkSoft, fontSize: "1.05rem" }}>
            It usually shows up the same few ways.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: "grid", gap: 3 }}>
            {leaks.map((leak) => (
              <Box
                key={leak.title}
                sx={{
                  display: "flex",
                  gap: 2.5,
                  pb: 3,
                  borderBottom: `1px solid ${ledger.greenLine}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: monoFont,
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: ledger.brassDeep,
                    lineHeight: 2.4,
                    minWidth: 96,
                  }}
                >
                  {leak.tag}
                </Typography>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "1.2rem", color: ledger.ink, mb: 1 }}
                  >
                    {leak.title}
                  </Typography>
                  <Typography sx={{ color: ledger.inkSoft }}>
                    {leak.body}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* And it isn't only about money */}
            <Grid container spacing={3}>
              {softLeaks.map((leak) => (
                <Grid size={{ xs: 12, sm: 6 }} key={leak.title}>
                  <Typography
                    sx={{
                      fontFamily: monoFont,
                      fontWeight: 500,
                      fontSize: "0.72rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: ledger.brassDeep,
                      mb: 0.75,
                    }}
                  >
                    {leak.tag}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "1.05rem", color: ledger.ink, mb: 0.75 }}
                  >
                    {leak.title}
                  </Typography>
                  <Typography sx={{ color: ledger.inkSoft, fontSize: "0.95rem" }}>
                    {leak.body}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Industry data — authority without needing client names */}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          mt: { xs: 5, md: 7 },
          pt: { xs: 4, md: 5 },
          borderTop: `2px solid ${ledger.ink}`,
        }}
      >
        {INDUSTRY_STATS.map((stat) => (
          <Grid size={{ xs: 12, sm: 4 }} key={stat.source}>
            <Typography
              sx={{
                ...tabularNums,
                fontFamily: monoFont,
                fontWeight: 500,
                fontSize: { xs: "2rem", md: "2.4rem" },
                color: ledger.green,
                lineHeight: 1,
                mb: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Typography sx={{ color: ledger.inkSoft, fontSize: "0.95rem" }}>
              {stat.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: ledger.brassDeep,
                mt: 0.75,
              }}
            >
              Source: {stat.source}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: { xs: 5, md: 6 },
          p: { xs: 3, md: 4 },
          backgroundColor: ledger.paper,
          borderLeft: `4px solid ${ledger.brass}`,
          borderRadius: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.05rem", md: "1.15rem" },
            color: ledger.ink,
            maxWidth: 720,
          }}
        >
          None of this means you're a bad operator. It means you built a
          business faster than you built its systems.{" "}
          <Box component="strong">That's common — and it's fixable.</Box>
        </Typography>
      </Box>
    </Container>
  </Box>
)
