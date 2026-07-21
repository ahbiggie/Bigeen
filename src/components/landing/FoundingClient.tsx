import { Box, Container, Typography } from "@mui/material"
import { ledger, monoFont, tabularNums } from "../../theme/theme"
import { FOUNDING_CLIENT } from "../../data/site"

// ============================================
// SECTION — FOUNDING CLIENTS
// Reframes "we're new" as "we're selectively taking
// founding clients" (CEO review alternative 3). True
// to the reality — limited, founder-led capacity.
// TODO(founder review): confirm slot count and terms.
// ============================================

export const FoundingClient: React.FC = () => (
  <Box
    component="section"
    id="founding"
    aria-labelledby="founding-heading"
    sx={{ py: { xs: 6, md: 8 }, backgroundColor: ledger.paper }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          border: `2px solid ${ledger.brass}`,
          borderRadius: 2,
          p: { xs: 3, md: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            ...tabularNums,
            fontFamily: monoFont,
            fontSize: "0.8rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ledger.brassDeep,
            mb: 1.5,
          }}
        >
          {FOUNDING_CLIENT.slots} founding slots
        </Typography>
        <Typography
          id="founding-heading"
          variant="h2"
          sx={{
            fontSize: { xs: "1.6rem", md: "2rem" },
            color: ledger.ink,
            mb: 2,
          }}
        >
          We're taking our first {FOUNDING_CLIENT.slots} founding clients.
        </Typography>
        <Typography
          sx={{
            color: ledger.inkSoft,
            fontSize: "1.05rem",
            maxWidth: 620,
            mx: "auto",
          }}
        >
          {FOUNDING_CLIENT.note} Once the {FOUNDING_CLIENT.slots} are filled,
          these terms won't be offered again.
        </Typography>
      </Box>
    </Container>
  </Box>
)
