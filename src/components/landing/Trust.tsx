import { Box, Container, Typography, Grid, Link } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { ledger, monoFont, cardHover } from "../../theme/theme"
import { SectionMark, Stamp } from "./LedgerElements"
import { FOUNDERS, DIAGNOSTIC_GUARANTEE } from "../../data/site"

// ============================================
// SECTION — PROOF / TRUST
// The people behind the work (the CEO review's most
// underused asset), the firm's model, and a refund
// guarantee that does the job social proof can't for
// a new firm. Client results stay honest placeholders
// until real ones exist — never invented.
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
        sx={{ color: ledger.inkSoft, fontSize: "1.05rem", maxWidth: 640, mb: 5 }}
      >
        Bigeen Solutions Limited is a CAC-registered private limited company in
        Abuja. You don't hire a faceless firm — you work directly with the two
        people whose names are on the registration.
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {FOUNDERS.map((founder) => (
          <Grid size={{ xs: 12, md: 6 }} key={founder.name}>
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                {/* Monogram is the honest no-photo state.
                    TODO(founder review): drop in headshots via `photo`. */}
                {founder.photo ? (
                  <Box
                    component="img"
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role} of Bigeen Solutions`}
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <Box
                    aria-hidden
                    sx={{
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      borderRadius: "50%",
                      backgroundColor: ledger.greenDeep,
                      color: ledger.brassBright,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: "1.25rem",
                    }}
                  >
                    {founder.initials}
                  </Box>
                )}
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: "1.3rem", color: ledger.ink }}
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
                    }}
                  >
                    {founder.role}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.8rem",
                  color: ledger.green,
                  mb: 1.5,
                }}
              >
                {founder.credentials}
              </Typography>
              <Typography
                sx={{ color: ledger.inkSoft, fontSize: "0.98rem", mb: 2.5 }}
              >
                {founder.bio}
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
      </Grid>

      <Typography
        sx={{
          mt: 4,
          fontSize: { xs: "1.05rem", md: "1.15rem" },
          color: ledger.ink,
          maxWidth: 760,
        }}
      >
        We're not a large firm. We're two people with complementary skills and
        one obsession: businesses that run without their owners holding
        everything together.
      </Typography>

      {/* Guarantee — what a new firm offers in place of testimonials */}
      <Box
        sx={{
          mt: { xs: 5, md: 7 },
          backgroundColor: ledger.greenDeep,
          borderRadius: 2,
          p: { xs: 3, md: 5 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              sx={{
                fontFamily: monoFont,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ledger.brassBright,
                mb: 1.5,
              }}
            >
              Our diagnostic guarantee
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                color: ledger.paperOnDark,
                lineHeight: 1.45,
              }}
            >
              {DIAGNOSTIC_GUARANTEE}
            </Typography>
            <Typography
              sx={{ mt: 2, color: ledger.softOnDark, fontSize: "0.95rem" }}
            >
              We can offer this because we know what we're doing — and because a
              client who sees no value in Week 4 isn't one we should continue
              with anyway.
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "center" } }}
          >
            <Stamp lines={["We stay until", "it runs"]} onDark />
          </Grid>
        </Grid>
      </Box>

      {/* Honest placeholder — real results only, when they exist */}
      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          border: `2px dashed ${ledger.greenLine}`,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography
          sx={{ fontSize: "0.9rem", color: ledger.inkSoft, fontStyle: "italic" }}
        >
          [CLIENT RESULTS &amp; TESTIMONIALS — published here as engagements
          complete. We use real names and numbers with the client's written
          permission, or nothing at all. We don't write these ourselves.]
        </Typography>
      </Box>
    </Container>
  </Box>
)
