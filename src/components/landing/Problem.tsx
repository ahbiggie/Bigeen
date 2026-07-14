import { Box, Container, Typography, Grid } from "@mui/material"
import { ledger, tabularNums } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"

// ============================================
// SECTION 2 — PROBLEM AGITATION
// The one approved statistic, dramatised as the
// three concrete leaks. Ends without blaming the
// reader (Carnegie #6).
// ============================================

const leaks = [
  {
    title: "The margin you can't name",
    body: "₦4M came in last month — so why is the account empty? If you can't say what you keep on each sale within a minute, pricing and cost decisions are guesses.",
  },
  {
    title: "Money outside, quietly ageing",
    body: "Customers owe you, but nobody tracks who, how much, or since when. Untracked receivables become discounts nobody approved — and then bad debt.",
  },
  {
    title: "One account, two lives",
    body: "School fees and supplier payments leave the same account. Until business and personal cash are separated, you cannot know whether the business itself makes money.",
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
      <SectionMark number="01" label="The pattern" />

      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            id="problem-heading"
            variant="h2"
            sx={{
              fontSize: { xs: "1.85rem", md: "2.4rem" },
              color: ledger.ink,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            About{" "}
            <Box component="span" sx={{ color: ledger.brassDeep, ...tabularNums }}>
              80%
            </Box>{" "}
            of Nigerian SMEs fail within their first 4–5 years.
          </Typography>
          <Typography sx={{ color: ledger.inkSoft, fontSize: "1.05rem", mb: 2 }}>
            Not from lack of capital. Not from bad ideas. They fail from
            missing systems, weak financial visibility, leadership gaps,
            regulatory confusion, and tools that never got adopted.
          </Typography>
          <Typography sx={{ color: ledger.inkSoft, fontSize: "1.05rem" }}>
            In practice, it usually starts as three quiet leaks.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: "grid", gap: 3 }}>
            {leaks.map((leak, i) => (
              <Box
                key={leak.title}
                sx={{
                  display: "flex",
                  gap: 2.5,
                  pb: 3,
                  borderBottom:
                    i < leaks.length - 1
                      ? `1px solid ${ledger.greenLine}`
                      : "none",
                }}
              >
                <Typography
                  aria-hidden
                  sx={{
                    ...tabularNums,
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: ledger.brass,
                    lineHeight: 1.5,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
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
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: { xs: 5, md: 7 },
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
