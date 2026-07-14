import { Box, Typography } from "@mui/material"
import { ledger, tabularNums } from "../../theme/theme"

// ============================================
// SIGNATURE ELEMENTS — "Operations Ledger"
// Numbered SOP-style section marks and the
// hand-stamped guarantee. Used across the page
// so the whole thing reads like one document.
// ============================================

interface SectionMarkProps {
  number: string
  label: string
  onDark?: boolean
}

/** Brass ledger rule with an entry number, e.g. "01 · The pattern" */
export const SectionMark: React.FC<SectionMarkProps> = ({
  number,
  label,
  onDark = false,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Typography
      component="span"
      sx={{
        ...tabularNums,
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: "0.875rem",
        letterSpacing: "0.12em",
        color: onDark ? ledger.brassBright : ledger.brassDeep,
      }}
    >
      {number}
    </Typography>
    <Typography
      component="span"
      sx={{
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 500,
        fontSize: "0.875rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: onDark ? ledger.softOnDark : ledger.inkSoft,
      }}
    >
      {label}
    </Typography>
    <Box
      aria-hidden
      sx={{
        flex: 1,
        maxWidth: 120,
        height: "2px",
        backgroundColor: onDark ? ledger.lineOnDark : ledger.brass,
        opacity: onDark ? 1 : 0.5,
      }}
    />
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
        border: `3px solid ${color}`,
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
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            lineHeight: 1.6,
            color,
          }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  )
}
