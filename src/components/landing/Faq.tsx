import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { ledger } from "../../theme/theme"
import { SectionMark } from "./LedgerElements"

// ============================================
// SECTION 8 — FAQ
// The questions a careful founder actually asks:
// money, commitment, what "done" means, and data.
// ============================================

const faqs = [
  {
    q: "How do you price your work?",
    a: "In naira, in writing, before we start. Consulting projects range from ₦150K to ₦2M depending on scope; ongoing retainers run ₦100K–₦700K per month; software enablement is ₦15K–₦75K per month. After the free diagnostic call you get a written quote for your exact situation — the number on that paper is the number you pay.",
  },
  {
    q: "Do you take a deposit?",
    a: "Yes — 50% before work starts, with the balance tied to agreed milestones, not to time passing. It keeps both sides committed: you know we deliver before we're fully paid, and we know you're serious before we clear our calendar.",
  },
  {
    q: "What does \"we stay until it runs\" actually mean?",
    a: "Every engagement defines, in writing, what 'your team runs it' looks like — for example: your accountant closes the month without calling us, your operations lead runs the weekly review alone, the tool is used daily without reminders. We train, sit in, correct, and repeat until those checks pass. That's the finish line, not the submission of a document.",
  },
  {
    q: "What happens to our business data?",
    a: "Everything we see — your numbers, your processes, your problems — is treated as confidential and handled in line with the Nigeria Data Protection Regulation (NDPR). We never name a client or publish a figure without written permission. For anything touching tax or legal compliance, we work alongside your accountant or lawyer — please confirm specifics with them.",
  },
  {
    q: "Do we need to buy new software?",
    a: "Usually not. Most businesses we meet are already paying for tools nobody uses. We start with what you have, cut what's dead weight, and only recommend new software when there's a gap the existing tools genuinely can't cover — and it has to work with Nigerian realities: power, internet, and offline moments included.",
  },
]

export const Faq: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false)

  return (
    <Box
      component="section"
      id="faq"
      aria-labelledby="faq-heading"
      sx={{ py: { xs: 7, md: 10 }, backgroundColor: ledger.card }}
    >
      <Container maxWidth="md">
        <SectionMark number="06" label="Straight answers" />
        <Typography
          id="faq-heading"
          variant="h2"
          sx={{
            fontSize: { xs: "1.85rem", md: "2.4rem" },
            color: ledger.ink,
            mb: 4,
          }}
        >
          The questions careful founders ask us
        </Typography>

        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.q}
              expanded={expanded === index}
              onChange={(_, isExpanded) =>
                setExpanded(isExpanded ? index : false)
              }
              elevation={0}
              disableGutters
              sx={{
                backgroundColor: "transparent",
                borderBottom: `1px solid ${ledger.greenLine}`,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: ledger.green }} />}
                sx={{ px: 0, py: 1 }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 500,
                    fontSize: "1.05rem",
                    color: ledger.ink,
                  }}
                >
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 3 }}>
                <Typography sx={{ color: ledger.inkSoft, maxWidth: 640 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
