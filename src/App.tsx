import React from "react"
import { ThemeProvider, CssBaseline, Box } from "@mui/material"
import { theme } from "./theme/theme"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"

// The landing page is the whole conversion path: one goal
// (book a diagnostic call), one scroll. The former About /
// Roadmap / Contact pages remain in src/pages for reuse but
// are intentionally out of the bundle and the buyer journey.

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        id="top"
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <HomePage />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
