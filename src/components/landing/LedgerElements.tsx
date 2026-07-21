import { Box, Typography } from "@mui/material"
import { ledger, monoFont } from "../../theme/theme"

// ============================================
// SIGNATURE ELEMENTS — "Operations Ledger"
// Mono eyebrow marks and the hand-stamped
// guarantee. Numbering is reserved for content
// that is genuinely sequential (the 3-step
// process) — section marks carry labels only.
// ============================================

interface SectionMarkProps {
  label: string
  onDark?: boolean
}

/** Brass ledger rule with a mono eyebrow label, e.g. "THE PATTERN" */
export const SectionMark: React.FC<SectionMarkProps> = ({
  label,
  onDark = false,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Box
      aria-hidden
      sx={{
        width: 28,
        height: "2px",
        backgroundColor: onDark ? ledger.brassBright : ledger.brass,
      }}
    />
    <Typography
      component="span"
      sx={{
        fontFamily: monoFont,
        fontWeight: 500,
        fontSize: "0.8rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: onDark ? ledger.brassBright : ledger.brassDeep,
      }}
    >
      {label}
    </Typography>
  </Box>
)

interface StampProps {
  lines: string[]
  onDark?: boolean
}

/** The rotated rubber-stamp block for the delivery guarantee */
export const Stamp: React.FC<StampProps> = ({ lines, onDark = false }) => {
  const color = onDark ? ledger.brassBright : ledger.brassDeep
  return (
    <Box
      sx={{
        display: "inline-block",
        transform: "rotate(-3deg)",
        border: `4px double ${color}`,
        borderRadius: "6px",
        px: 2.5,
        py: 1.5,
        textAlign: "center",
      }}
    >
      {lines.map((line) => (
        <Typography
          key={line}
          sx={{
            fontFamily: monoFont,
            fontWeight: 500,
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            lineHeight: 1.7,
            color,
          }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  )
}
