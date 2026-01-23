import React from "react"
import { ThemeProvider, CssBaseline, Box } from "@mui/material"
import { theme } from "./theme/theme"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { RoadmapPage } from "./pages/RoadmapPage"
import { ContactPage } from "./pages/ContactPage"
import { AboutPage } from "./pages/AboutPage"

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box component="main" sx={{ flex: 1 }}>
          <div id="home">
            <HomePage />
          </div>
          <div id="about">
            <AboutPage />
          </div>
          <div id="roadmap">
            <RoadmapPage />
          </div>
          <div id="contact">
            <ContactPage />
          </div>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
