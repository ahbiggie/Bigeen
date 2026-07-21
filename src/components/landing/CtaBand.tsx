import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Alert,
} from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import { ledger } from "../../theme/theme"
import {
  WHATSAPP_URL,
  EMAIL,
  CTA_LABEL,
  BOOKING_URL,
} from "../../data/site"

// ============================================
// SECTION 7 — LEAD CAPTURE / CTA BAND
// One ask: the diagnostic call. WhatsApp and email
// as quieter side doors, plus a 3-field fallback
// form so no lead is lost while the scheduler is
// being set up.
// ============================================

export const CtaBand: React.FC = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "landing-cta-band" }),
      })
      if (response.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: ledger.card,
      borderRadius: 1.5,
    },
  }

  return (
    <Box
      component="section"
      id="book"
      aria-labelledby="book-heading"
      sx={{
        py: { xs: 7, md: 10 },
        backgroundColor: ledger.greenDeep,
        color: ledger.paperOnDark,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              id="book-heading"
              variant="h2"
              sx={{
                fontSize: { xs: "1.85rem", md: "2.4rem" },
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Thirty minutes about your business. Not ours.
            </Typography>
            <Typography
              sx={{ color: ledger.softOnDark, fontSize: "1.05rem", mb: 4 }}
            >
              A free diagnostic call: you talk, we listen, and we tell you
              honestly where the leaks are — and whether we're the right people
              to fix them. No slides, no jargon, no obligation.
            </Typography>

            <Button
              component="a"
              href={BOOKING_URL === "#book" ? WHATSAPP_URL : BOOKING_URL}
              target={BOOKING_URL === "#book" ? "_blank" : undefined}
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: ledger.brassBright,
                color: ledger.greenDeep,
                px: 4,
                py: 1.75,
                fontSize: "1.05rem",
                mb: 3,
                "&:hover": { backgroundColor: "#F0BB59" },
              }}
            >
              {CTA_LABEL}
            </Button>

            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Typography
                component="a"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: ledger.paperOnDark,
                  fontSize: "0.95rem",
                  textDecorationColor: ledger.brassBright,
                  textUnderlineOffset: "4px",
                  width: "fit-content",
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 20 }} aria-hidden />
                Prefer WhatsApp? Message us directly
              </Typography>
              <Typography
                component="a"
                href={`mailto:${EMAIL}`}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: ledger.paperOnDark,
                  fontSize: "0.95rem",
                  textDecorationColor: ledger.brassBright,
                  textUnderlineOffset: "4px",
                  width: "fit-content",
                }}
              >
                <MailOutlineIcon sx={{ fontSize: 20 }} aria-hidden />
                {EMAIL}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: ledger.paper,
                borderRadius: 2,
                p: { xs: 3, md: 4 },
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: "1.2rem", color: ledger.ink, mb: 0.5 }}
              >
                Or leave your details — we'll call you
              </Typography>
              <Typography
                sx={{ fontSize: "0.9rem", color: ledger.inkSoft, mb: 3 }}
              >
                Three fields, thirty seconds. We reply within one business day.
              </Typography>

              <Box sx={{ display: "grid", gap: 2.5 }}>
                <TextField
                  label="Your name"
                  required
                  fullWidth
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={status === "loading"}
                  sx={fieldSx}
                />
                <TextField
                  label="Phone or WhatsApp number"
                  required
                  fullWidth
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={status === "loading"}
                  sx={fieldSx}
                />
                <TextField
                  label="What's going on in the business?"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  disabled={status === "loading"}
                  sx={fieldSx}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={status === "loading"}
                  sx={{
                    backgroundColor: ledger.green,
                    py: 1.5,
                    "&:hover": { backgroundColor: ledger.greenDeep },
                  }}
                >
                  {status === "loading" ? "Sending…" : "Request a call back"}
                </Button>

                {status === "success" && (
                  <Alert severity="success">
                    Got it — we'll call you within one business day.
                  </Alert>
                )}
                {status === "error" && (
                  <Alert severity="error">
                    That didn't go through. Please try WhatsApp or email us at{" "}
                    {EMAIL}.
                  </Alert>
                )}

                <Typography sx={{ fontSize: "0.78rem", color: ledger.inkSoft }}>
                  We use your details only to contact you about this enquiry,
                  in line with the NDPR. No lists, no spam.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
