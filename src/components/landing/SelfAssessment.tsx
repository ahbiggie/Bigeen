import { useState } from "react"
import { Box, Container, Typography, Button } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { ledger, monoFont, tabularNums } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"
import { BOOKING_URL, CTA_LABEL } from "../../data/site"

// ============================================
// SECTION — QUICK HEALTH CHECK
// A five-question self-assessment that primes the
// CTA (CEO review "bang" #6). Fully client-side —
// no backend, nothing submitted, nothing stored.
// ============================================

const questions = [
  "I know my exact margin on my top 3 products",
  "I have a list of everyone who owes me money, and how old each debt is",
  "My business runs for a full week without me making decisions",
  "I have written processes for at least half of what my team does",
  "I know my monthly profit within 5% at any point in the month",
]

export const SelfAssessment: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(
    () => questions.map(() => false),
  )
  const [touched, setTouched] = useState(false)

  const score = checked.filter(Boolean).length
  const toggle = (i: number) => {
    setTouched(true)
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <Box
      component="section"
      id="health-check"
      aria-labelledby="health-heading"
      sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.card }}
    >
      <Container maxWidth="md">
        <SectionMark label="Quick health check" />

        <Typography
          id="health-heading"
          variant="h2"
          sx={{
            fontSize: { xs: "1.85rem", md: "2.4rem" },
            color: ledger.ink,
            mb: 1.5,
          }}
        >
          Answer honestly. It takes thirty seconds.
        </Typography>
        <Typography
          sx={{ color: ledger.inkSoft, fontSize: "1.05rem", mb: 4 }}
        >
          Tick the ones that are true today. Nothing is sent or saved — this is
          just for you.
        </Typography>

        <Box role="group" aria-label="Business health self-assessment">
          {questions.map((q, i) => {
            const on = checked[i]
            return (
              <Box
                key={q}
                component="button"
                type="button"
                aria-pressed={on}
                onClick={() => toggle(i)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 2,
                  px: 0,
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${ledger.greenLine}`,
                  font: "inherit",
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 26,
                    height: 26,
                    flexShrink: 0,
                    borderRadius: "5px",
                    border: `2px solid ${on ? ledger.green : ledger.inkSoft}`,
                    backgroundColor: on ? ledger.green : "transparent",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                  }}
                >
                  {on && <CheckIcon sx={{ fontSize: 18 }} />}
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.02rem",
                    color: ledger.ink,
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {q}
                </Typography>
              </Box>
            )
          })}
        </Box>

        {/* Result — appears once the reader engages */}
        <Box
          aria-live="polite"
          sx={{
            mt: 4,
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            backgroundColor: touched ? ledger.paper : "transparent",
            border: touched ? `1px solid ${ledger.greenLine}` : "none",
            minHeight: touched ? "auto" : 0,
          }}
        >
          {touched && (
            <>
              <Typography
                sx={{
                  ...tabularNums,
                  fontFamily: monoFont,
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: ledger.brassDeep,
                  mb: 1,
                }}
              >
                You ticked {score} of {questions.length}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  color: ledger.ink,
                  mb: 3,
                }}
              >
                {score >= 4
                  ? "You're further along than most. A diagnostic call can pressure-test the last gaps — and confirm what's already working."
                  : "If you ticked fewer than three, a diagnostic call costs you nothing and could change everything."}
              </Typography>
              <Button
                component="a"
                href={BOOKING_URL}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: ledger.green,
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  "&:hover": { backgroundColor: ledger.greenDeep },
                }}
              >
                {CTA_LABEL}
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}
