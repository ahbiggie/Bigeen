import { createTheme } from "@mui/material/styles"

const PRIMARY_NAVY = "#1a237e"
const SECONDARY_BLUE = "#032967"
// const ACCENT_PURPLE = "#7C3AED"
const SUCCESS_GREEN = "#10B981"
const WARNING_AMBER = "#F59E0B"

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY_NAVY,
      light: "#1f0ed7",
      dark: "#000051",
      contrastText: "#ffffff",
    },
    secondary: {
      main: SECONDARY_BLUE,
      light: "#6CB4FF",
      dark: "#0053BF",
      contrastText: "#ffffff",
    },
    success: {
      main: SUCCESS_GREEN,
    },
    warning: {
      main: WARNING_AMBER,
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif', // Clean Body Font
    h1: {
      fontFamily: '"Outfit", sans-serif', // "SaaS" Heading Font
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "1rem",
      fontWeight: 600,
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
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
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
        },
        body: {
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: `
            radial-gradient(at 0% 0%, hsla(253,16%,7%,0.05) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(225,39%,30%,0.05) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(339,49%,30%,0.05) 0, transparent 50%)
          `,
          backgroundAttachment: "fixed",
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
