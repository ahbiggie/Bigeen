import { Box, Container, Typography, Grid, Link } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { ledger, monoFont, cardHover } from "../../theme/theme"
import { SectionMark, Stamp } from "./LedgerElements"
import { FOUNDERS } from "../../data/site"

// ============================================
// SECTION 6 — PROOF / TRUST
// Real founders, real registration, the guarantee.
// Client results are placeholders until real ones
// exist — never invented.
// ============================================

export const Trust: React.FC = () => (
  <Box
    component="section"
    id="trust"
    aria-labelledby="trust-heading"
    sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.paper }}
  >
    <Container maxWidth="lg">
      <SectionMark label="Who you'll work with" />

      <Typography
        id="trust-heading"
        variant="h2"
        sx={{
          fontSize: { xs: "1.85rem", md: "2.4rem" },
          color: ledger.ink,
          mb: 1.5,
        }}
      >
        Two founders. Both in the room, both accountable.
      </Typography>
      <Typography
        sx={{ color: ledger.inkSoft, fontSize: "1.05rem", maxWidth: 620, mb: 5 }}
      >
        Bigeen Solutions Limited is a CAC-registered private limited company in
        Abuja. When you engage us, you work directly with the people whose
        names are on the registration.
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {FOUNDERS.map((founder) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={founder.name}>
            <Box
              sx={{
                height: "100%",
                backgroundColor: ledger.card,
                border: `1px solid ${ledger.greenLine}`,
                borderRadius: 2,
                p: { xs: 3, md: 3.5 },
                ...cardHover,
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: ledger.greenDeep,
                  color: ledger.brassBright,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  mb: 2,
                }}
              >
                {founder.initials}
              </Box>
              <Typography
                variant="h3"
                sx={{ fontSize: "1.2rem", color: ledger.ink }}
              >
                {founder.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: ledger.brassDeep,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {founder.role}
              </Typography>
              <Typography
                sx={{ fontSize: "0.95rem", color: ledger.inkSoft, mb: 2 }}
              >
                {founder.focus}
              </Typography>
              <Link
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: ledger.green,
                  textDecorationColor: ledger.brass,
                }}
              >
                <LinkedInIcon sx={{ fontSize: 18 }} aria-hidden />
                LinkedIn profile
              </Link>
            </Box>
          </Grid>
        ))}

        {/* Guarantee card sits beside the founders */}
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: ledger.greenDeep,
              borderRadius: 2,
              p: { xs: 3, md: 3.5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Typography sx={{ color: ledger.paperOnDark, fontSize: "1rem" }}>
              Our delivery guarantee is written into every engagement: the work
              isn't finished when a document is submitted. It's finished when
              your team runs the systems competently on their own.
            </Typography>
            <Box>
              <Stamp lines={["We stay until", "it runs"]} onDark />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Honest placeholders — real results only, when they exist */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 2, md: 3 } }}>
        {[
          "[CLIENT RESULT — added as engagements complete. We publish real numbers with the client's written permission, or nothing at all.]",
          "[TESTIMONIAL — coming from our first cohort of clients. We don't write these ourselves.]",
        ].map((placeholder) => (
          <Grid size={{ xs: 12, md: 6 }} key={placeholder}>
            <Box
              sx={{
                border: `2px dashed ${ledger.greenLine}`,
                borderRadius: 2,
                p: 3,
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: ledger.inkSoft,
                  fontStyle: "italic",
                }}
              >
                {placeholder}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
)
