import { Box } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { WHATSAPP_URL } from "../../data/site"

// ============================================
// FLOATING WHATSAPP — visible at every scroll depth
// WhatsApp is the default business channel for Nigerian
// SME owners; both CEO reviews flag this as priority #1.
// ============================================

export const FloatingWhatsApp: React.FC = () => (
  <Box
    component="a"
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Bigeen on WhatsApp (opens WhatsApp)"
    sx={{
      position: "fixed",
      bottom: { xs: 20, md: 28 },
      right: { xs: 20, md: 28 },
      zIndex: 1200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      backgroundColor: "#25D366",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "scale(1.06)",
        boxShadow: "0 8px 26px rgba(0, 0, 0, 0.3)",
      },
    }}
  >
    <WhatsAppIcon sx={{ fontSize: 30 }} />
  </Box>
)
