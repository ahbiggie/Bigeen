import { createTheme } from "@mui/material/styles"

// ============================================
// "OPERATIONS LEDGER" DESIGN TOKENS
// Deep ledger green + warm paper + brass accents.
// Brass (#C98A12) fails contrast for small text on
// paper — use brassDeep for text, brass for rules,
// large numerals and decoration only.
// ============================================

export const ledger = {
  paper: "#FAF8F3", // page background
  card: "#FFFFFF",
  ink: "#17251E", // primary text
  inkSoft: "#46554C", // secondary text (7.2:1 on paper)
  green: "#175239", // brand green — buttons, links
  greenDeep: "#0C2E21", // dark sections, footer
  greenLine: "#D8E0D8", // hairline rules on paper
  brass: "#C98A12", // decorative accent only
  brassDeep: "#8A5C06", // brass legible as small text (5.4:1)
  brassBright: "#E3A73C", // accent on dark green sections
  paperOnDark: "#F2EFE7", // text on greenDeep
  softOnDark: "rgba(242, 239, 231, 0.72)",
  lineOnDark: "rgba(242, 239, 231, 0.16)",
}

// Tabular numerals for naira figures — every amount lines up
export const tabularNums = {
  fontVariantNumeric: "tabular-nums",
  fontFeatureSettings: '"tnum"',
}

// Type roles: display carries personality, body carries reading,
// mono carries data — naira figures, eyebrows, ledger annotations.
export const displayFont = '"Space Grotesk", "Inter", sans-serif'
export const monoFont = '"IBM Plex Mono", "Consolas", monospace'

// Shared hover treatment for offer/founder cards — quiet lift, no shadow theatrics
export const cardHover = {
  transition: "border-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    borderColor: ledger.green,
    transform: "translateY(-2px)",
  },
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ledger.green,
      light: "#2C7A57",
      dark: ledger.greenDeep,
      contrastText: "#ffffff",
    },
    secondary: {
      main: ledger.brassDeep,
      light: ledger.brass,
      dark: "#6B4704",
      contrastText: "#ffffff",
    },
    success: {
      main: "#1E7A4A",
    },
    warning: {
      main: ledger.brass,
    },
    divider: ledger.greenLine,
    background: {
      default: ledger.paper,
      paper: ledger.card,
    },
    text: {
      primary: ledger.ink,
      secondary: ledger.inkSoft,
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 6,
  },
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 8,
  //         padding: "10px 24px",
  //         fontSize: "0.95rem",
  //       },
  //       contained: {
  //         boxShadow: "0 4px 14px rgba(26, 35, 126, 0.25)",
  //         "&:hover": {
  //           boxShadow: "0 6px 20px rgba(26, 35, 126, 0.35)",
  //         },
  //       },
  //     },
  //   },
  //   MuiCard: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 16,
  //         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  //       },
  //     },
  //   },
  //   MuiAppBar: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: "transparent",
  //         boxShadow: "none",
  //       },
  //     },
  //   },
  // },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: "100%",
          height: "100%",
          scrollBehavior: "smooth",
          scrollPaddingTop: "80px",
        },
        body: {
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
        },
        // Visible keyboard focus everywhere
        ":focus-visible": {
          outline: `3px solid ${ledger.brass}`,
          outlineOffset: "2px",
        },
        // Respect users who turn motion off
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
          html: {
            scrollBehavior: "auto",
          },
        },
        "#root": {
          width: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        },
        // Global Reset for images to prevent layout breakage
        img: {
          display: "block",
          maxWidth: "100%",
        },
      },
    },
    // ... other component overrides
  },
})

// Gradient utilities for sx prop usage
export const gradients = {
  primary: "linear-gradient(135deg, #1a237e 0%, #3B82F6 100%)",
  accent: "linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)",
  dark: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
}

// ============================================
// GLASSMORPHISM UTILITIES
// ============================================

export const glassStyles = {
  // Light glass - for cards on light backgrounds
  light: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  },
  // Medium glass - more opacity
  medium: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  // Dark glass - for overlays on colorful backgrounds
  dark: {
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  // Navbar glass
  navbar: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
  },
  // Accent glass - for featured elements
  accent: {
    background:
      "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    boxShadow: "0 8px 32px rgba(124, 58, 237, 0.15)",
  },
}

// Animation keyframes for background blobs
export const blobKeyframes = {
  "@keyframes blob": {
    "0%": {
      transform: "translate(0px, 0px) scale(1)",
    },
    "33%": {
      transform: "translate(30px, -50px) scale(1.1)",
    },
    "66%": {
      transform: "translate(-20px, 20px) scale(0.9)",
    },
    "100%": {
      transform: "translate(0px, 0px) scale(1)",
    },
  },
}
