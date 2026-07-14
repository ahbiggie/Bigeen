import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { ledger } from "../theme/theme"
import { BOOKING_URL } from "../data/site"
import bigeenLogo from "../assets/images/bigeen-logo-160.png"

// ============================================
// NAVBAR — lightweight, one CTA, no blur effects
// ============================================

const navItems = [
  { label: "The problem", path: "#problem" },
  { label: "Who it's for", path: "#fit" },
  { label: "How we work", path: "#how" },
  { label: "Services", path: "#services" },
  { label: "FAQ", path: "#faq" },
]

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeDrawer = () => setMobileMenuOpen(false)

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        aria-label="Main navigation"
        sx={{
          backgroundColor: ledger.paper,
          borderBottom: `1px solid ${ledger.greenLine}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", minHeight: { xs: 60, sm: 68 } }}
          >
            <Box
              component="a"
              href="#top"
              aria-label="Bigeen Solutions — back to top"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={bigeenLogo}
                alt=""
                width={44}
                height={44}
                sx={{ objectFit: "contain" }}
              />
              <Typography
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: ledger.ink,
                }}
              >
                Bigeen
              </Typography>
            </Box>

            {/* Desktop links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  component="a"
                  href={item.path}
                  sx={{
                    color: ledger.inkSoft,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    px: 1.75,
                    py: 1,
                    borderRadius: 1.5,
                    "&:hover": {
                      color: ledger.green,
                      backgroundColor: "rgba(23, 82, 57, 0.06)",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              <Button
                component="a"
                href={BOOKING_URL}
                variant="contained"
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  backgroundColor: ledger.green,
                  px: 3,
                  "&:hover": { backgroundColor: ledger.greenDeep },
                }}
              >
                Book a call
              </Button>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                sx={{ display: { md: "none" }, color: ledger.ink }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: "85%", maxWidth: 320, backgroundColor: ledger.paper },
        }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "1.1rem",
                color: ledger.ink,
              }}
            >
              Bigeen
            </Typography>
            <IconButton onClick={closeDrawer} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.path}
                  onClick={closeDrawer}
                  sx={{ borderRadius: 1.5 }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Button
            component="a"
            href={BOOKING_URL}
            onClick={closeDrawer}
            fullWidth
            variant="contained"
            size="large"
            sx={{
              backgroundColor: ledger.green,
              py: 1.5,
              "&:hover": { backgroundColor: ledger.greenDeep },
            }}
          >
            Book a free diagnostic call
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
