import { Box, Paper, Typography } from "@mui/material"
import { motion } from "framer-motion"
import type { StatCardProps } from "../../types"
import { glassStyles, gradients } from "../../theme/theme"

const MotionPaper = motion.create(Paper)

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  suffix,
  icon,
}) => (
  <MotionPaper
    elevation={0}
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }}
    whileHover={{ y: -5 }}
    sx={{
      ...glassStyles.light,
      borderRadius: 4,
      p: 4,
      textAlign: "center",
      cursor: "default",
    }}
  >
    {icon && (
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          background: glassStyles.accent.background,
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
    )}
    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        mb: 1,
        background: gradients.accent,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
    >
      {value}
      {suffix && (
        <Box
          component="span"
          sx={{
            fontSize: "0.6em",
            fontWeight: 600,
            ml: 0.5,
          }}
        >
          {suffix}
        </Box>
      )}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{ color: "text.secondary", fontWeight: 500 }}
    >
      {label}
    </Typography>
  </MotionPaper>
)
