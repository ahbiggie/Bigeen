import { createTheme } from "@mui/material/styles"

// Bigeen Solutions Design System
const PRIMARY_NAVY = "#1a237e"
const SECONDARY_BLUE = "#3B82F6"
// const ACCENT_PURPLE = "#7C3AED"
const SUCCESS_GREEN = "#10B981"
const WARNING_AMBER = "#F59E0B"

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: PRIMARY_NAVY,
      light: "#534bae",
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
    fontFamily: "'Inter', 'Roboto', 'Segoe UI', 'sans-serif'",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
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
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.95rem",
        },
        contained: {
          boxShadow: "0 4px 14px rgba(26, 35, 126, 0.25)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(26, 35, 126, 0.35)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
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
