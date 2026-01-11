import { Box, Typography, Button } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import { motion } from "framer-motion"
import type { FeatureCardProps } from "../../types"
import { glassStyles } from "../../theme/theme"

// Create motion-enabled Box
const MotionBox = motion.create(Box)

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = "#667eea",
  showLearnMore = false,
}) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 17 },
    }}
    whileTap={{ scale: 0.98 }}
    sx={{
      height: "100%",
      borderRadius: 4,
      p: 4,
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      ...glassStyles.light,
      transition: "box-shadow 0.3s ease",
      "&:hover": {
        boxShadow: `0 20px 50px ${color}25`,
        border: `1px solid ${color}40`,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)`,
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      },
      "&:hover::before": {
        opacity: 1,
      },
    }}
  >
    {/* Icon Container with glow effect */}
    <MotionBox
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      sx={{
        width: 56,
        height: 56,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 3,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: -4,
          borderRadius: 4,
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
      }}
    >
      {icon}
    </MotionBox>

    <Typography
      variant="h6"
      sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.secondary", lineHeight: 1.7 }}
    >
      {description}
    </Typography>

    {showLearnMore && (
      <Button
        endIcon={<ArrowForward sx={{ fontSize: "1rem" }} />}
        sx={{
          mt: 2,
          color: color,
          fontWeight: 600,
          fontSize: "0.875rem",
          textTransform: "none",
          p: 0,
          "&:hover": {
            backgroundColor: "transparent",
            "& .MuiButton-endIcon": {
              transform: "translateX(4px)",
            },
          },
          "& .MuiButton-endIcon": {
            transition: "transform 0.2s",
          },
        }}
      >
        See features
      </Button>
    )}
  </MotionBox>
)
