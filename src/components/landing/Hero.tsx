import { useEffect, useRef, useState } from "react"
import { Box, Container, Typography, Button, Stack, Grid } from "@mui/material"
import { ledger, monoFont } from "../../theme/theme"
import { BOOKING_URL, WHATSAPP_URL, CTA_LABEL } from "../../data/site"
import heroOffice from "../../assets/images/hero-office.jpg"

// ============================================
// SECTION 1 — HERO
// Pain-led question in the reader's voice, one
// promise, one CTA. The page's one orchestrated
// motion moment lives here: a staggered rise on
// load (CSS-only; global reduced-motion guard
// in the theme disables it).
// ============================================

const checklistItems = [
  { label: "Personal & business cash separated", state: "done" },
  { label: "Margin known per product", state: "done" },
  { label: "Receivables reviewed every week", state: "active" },
  { label: "Payroll runs without the founder", state: "pending" },
] as const

const stateStyles = {
  done: { mark: "✓", color: ledger.green, note: "handed over" },
  active: { mark: "—", color: ledger.brassDeep, note: "in training" },
  pending: { mark: "", color: ledger.inkSoft, note: "up next" },
} as const

// Staggered entrance: each hero child rises once on load.
// Transform-only, never opacity: if the animation clock stalls
// (blocked, unsupported, frozen webview), the worst case is a
// 14px offset — the content is never invisible.
const rise = (order: number) => ({
  "@keyframes heroRise": {
    from: { transform: "translateY(14px)" },
    to: { transform: "none" },
  },
  animation: `heroRise 0.5s ease-out ${order * 0.09}s both`,
})

// The handover sheet ticks its rows off one by one the first time it
// scrolls into view — the signature widget, made to "show, not tell"
// (CEO review). Falls back to the fully-checked state if Intersection
// Observer is unavailable or motion is reduced.
const doneCount = checklistItems.filter((i) => i.state === "done").length

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const useSheetReveal = () => {
  const ref = useRef<HTMLDivElement>(null)
  // Start fully revealed when motion is reduced — no in-effect setState,
  // and the sheet is correct on first paint for those users.
  const [revealed, setRevealed] = useState(() =>
    prefersReducedMotion() ? checklistItems.length : 0,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    let done = false
    const runReveal = () => {
      if (done) return
      done = true
      checklistItems.forEach((_, i) =>
        window.setTimeout(() => setRevealed(i + 1), 260 * (i + 1)),
      )
    }

    // If the sheet is already on screen at mount (desktop, above the fold),
    // start straight away rather than waiting for a scroll.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) runReveal()

    // Safety net: the sheet must never sit stuck in its dimmed state. If
    // IntersectionObserver never fires (unsupported, or an environment that
    // doesn't drive it), this timer reveals it anyway.
    const fallback = window.setTimeout(runReveal, 1600)

    let io: IntersectionObserver | undefined
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          runReveal()
          io?.disconnect()
        },
        // Low threshold: the sheet is tall (~480px), so on a phone it may
        // never reach a high visible fraction — 0.15 fires reliably on both.
        { threshold: 0.15 },
      )
      io.observe(el)
    }

    return () => {
      window.clearTimeout(fallback)
      io?.disconnect()
    }
  }, [])

  return { ref, revealed }
}

export const Hero: React.FC = () => {
  const { ref: sheetRef, revealed } = useSheetReveal()
  const progress = Math.min(revealed, doneCount) / checklistItems.length

  return (
  <Box
    component="section"
    aria-labelledby="hero-heading"
    sx={{
      backgroundColor: ledger.paper,
      borderBottom: `1px solid ${ledger.greenLine}`,
      py: { xs: 7, md: 12 },
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography
            id="hero-heading"
            variant="h1"
            sx={{
              ...rise(0),
              fontSize: { xs: "2.4rem", sm: "3rem", md: "3.55rem", lg: "3.9rem" },
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: ledger.ink,
              mb: 3,
              maxWidth: "14ch",
            }}
          >
            If you took two weeks off, would your business still run?
          </Typography>

          <Typography
            sx={{
              ...rise(1),
              fontSize: { xs: "1.05rem", md: "1.15rem" },
              color: ledger.inkSoft,
              maxWidth: 540,
              mb: 4,
            }}
          >
            Most owners can't. We build the systems that change that answer —
            and we don't leave until your team runs them without us.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            sx={rise(2)}
          >
            <Button
              component="a"
              href={BOOKING_URL}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: ledger.green,
                color: "#fff",
                px: 4,
                py: 1.75,
                fontSize: "1.05rem",
                "&:hover": { backgroundColor: ledger.greenDeep },
              }}
            >
              {CTA_LABEL}
            </Button>
            <Typography
              component="a"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: ledger.green,
                fontWeight: 600,
                fontSize: "0.95rem",
                textAlign: { xs: "center", sm: "left" },
                textDecorationColor: ledger.brass,
                textUnderlineOffset: "4px",
              }}
            >
              or chat with us on WhatsApp
            </Typography>
          </Stack>

          <Typography
            sx={{
              ...rise(3),
              mt: 4,
              fontFamily: monoFont,
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              color: ledger.inkSoft,
            }}
          >
            CAC-registered · Founder-led · Abuja, Nigeria
          </Typography>
        </Grid>

        {/* Office photo with the handover sheet floating over it */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              ...rise(4),
              position: "relative",
              maxWidth: { xs: 460, md: "none" },
              mx: { xs: "auto", md: 0 },
            }}
          >
            {/* On-brand: organised, ledger-lined office */}
            <Box
              component="img"
              src={heroOffice}
              alt="A business owner reviewing her systems dashboard in an organised, ledger-lined office"
              width={1000}
              height={558}
              loading="eager"
              fetchPriority="high"
              sx={{
                width: "100%",
                height: { xs: 240, sm: 300, md: 512 },
                display: "block",
                borderRadius: 2,
                objectFit: "cover",
                objectPosition: "32% center",
                boxShadow: "0 20px 44px rgba(12, 46, 33, 0.16)",
              }}
            />

            {/* Handover sheet — ticks off on scroll; floats over lower-left */}
            <Box
              ref={sheetRef}
              role="img"
              aria-label="Sample client handover sheet: personal and business cash separated (handed over), margin known per product (handed over), receivables reviewed every week (in training), payroll runs without the founder (up next)."
              sx={{
                position: { xs: "relative", md: "absolute" },
                left: { md: -24 },
                bottom: { md: 24 },
                mt: { xs: -5, md: 0 },
                mx: { xs: "auto", md: 0 },
                width: { xs: "90%", md: 322 },
                zIndex: 2,
                backgroundColor: ledger.card,
                border: `1px solid ${ledger.greenLine}`,
                borderTop: `4px solid ${ledger.green}`,
                borderRadius: 2,
                p: { xs: 2.5, md: 2.75 },
                boxShadow: "0 16px 40px rgba(12, 46, 33, 0.18)",
              }}
            >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: ledger.brassDeep,
                }}
              >
                Sample handover sheet
              </Typography>
              <Typography
                sx={{
                  fontFamily: monoFont,
                  fontSize: "0.7rem",
                  color: ledger.inkSoft,
                }}
              >
                wk 09
              </Typography>
            </Box>

            {/* Progress bar — fills as items hand over */}
            <Box
              aria-hidden
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: ledger.greenLine,
                mb: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${progress * 100}%`,
                  backgroundColor: ledger.green,
                  transition: "width 0.5s ease",
                }}
              />
            </Box>

            <Stack spacing={0}>
              {checklistItems.map((item, i) => {
                const style = stateStyles[item.state]
                const shown = i < revealed
                return (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 1.5,
                      py: 1.1,
                      borderBottom: `1px dashed ${ledger.greenLine}`,
                      opacity: shown ? 1 : 0.35,
                      transform: shown ? "none" : "translateX(6px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        flexShrink: 0,
                        border: `2px solid ${style.color}`,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: style.color,
                        alignSelf: "center",
                      }}
                    >
                      {shown ? style.mark : ""}
                    </Box>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: "0.95rem",
                        color:
                          item.state === "pending"
                            ? ledger.inkSoft
                            : ledger.ink,
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: monoFont,
                        fontSize: "0.7rem",
                        letterSpacing: "0.04em",
                        color: style.color,
                        whiteSpace: "nowrap",
                        opacity: shown ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {style.note}
                    </Typography>
                  </Box>
                )
              })}
            </Stack>

            <Typography
              sx={{
                mt: 1.75,
                fontSize: "0.8rem",
                color: ledger.inkSoft,
                fontStyle: "italic",
              }}
            >
              We leave at "runs without us" — not at "report submitted."
            </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </Box>
  )
}
