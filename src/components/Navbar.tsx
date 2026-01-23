import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material"
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material"
import { useState } from "react"
import { motion } from "framer-motion"
import { glassStyles } from "../theme/theme"
import bigeenLogo from "../assets/images/bigeen-logo.png"

// Create motion-enabled components
const MotionBox = motion.create(Box)

interface NavItem {
  label: string
  path: string
}

export const Navbar: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { label: "Home", path: "#home" },
    { label: "About", path: "#about" },
    { label: "Roadmap", path: "#roadmap" },
    { label: "Contact", path: "#contact" },
  ]

  const handleDrawerToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Mobile Drawer Content
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 3,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box
          component="a"
          href="#home"
          onClick={handleDrawerToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={bigeenLogo}
            alt="Bigeen Logo"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Bigeen
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 1.5 }}>
              <ListItemButton
                component="a"
                href={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      {/* Mobile CTA */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ mb: 3 }} />
        <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            component="a"
            href="#contact"
            onClick={handleDrawerToggle}
            sx={{ py: 1.5, borderRadius: 3 }}
          >
            Get a consult
          </Button>
        </MotionBox>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          ...glassStyles.navbar,
          top: 0,
          zIndex: 1100,
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              py: 1,
              minHeight: { xs: 56, sm: 64 },
            }}
            disableGutters
          >
            <Box
              component="a"
              href="#home"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
              }}
            >
              <MotionBox
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <Box
                  component="img"
                  src={bigeenLogo}
                  alt="Bigeen Logo"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    objectFit: "contain",
                  }}
                />
              </MotionBox>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {navItems.map((item) => (
                  <Box
                    key={item.label}
                    component="a"
                    href={item.path}
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      textDecoration: "none",
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      backgroundColor: "transparent",
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "rgba(102, 126, 234, 0.08)",
                      },
                    }}
                  >
                    <MotionBox
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </MotionBox>
                  </Box>
                ))}
              </Box>
            )}

            {/* CTA Buttons */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <MotionBox
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  component="a"
                  href="#contact"
                >
                  Get in touch
                </Button>
              </MotionBox>
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{ color: "text.primary" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer with Glass Effect */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: "85%",
            maxWidth: 320,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
