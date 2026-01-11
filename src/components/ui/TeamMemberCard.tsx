import { Box, IconButton, Paper, Stack, Typography } from "@mui/material"
import { LinkedIn, Twitter, GitHub, Email } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import type { TeamMemberProps } from "../../types"
import { glassStyles, gradients } from "../../theme/theme"

const MotionPaper = motion.create(Paper)
const MotionBox = motion.create(Box)

export const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  imageUrl,
  initials,
  gradient = gradients.accent,
  socials,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const socialIcons = {
    linkedin: LinkedIn,
    twitter: Twitter,
    github: GitHub,
    email: Email,
  }

  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={{
        ...glassStyles.light,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          height: 280,
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 3,
                ...glassStyles.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" sx={{ color: "white", fontWeight: 700 }}>
                {initials}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Social Overlay */}
        <AnimatePresence>
          {isHovered && socials && Object.keys(socials).length > 0 && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                ...glassStyles.dark,
                borderRadius: 0,
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Stack direction="row" spacing={1} justifyContent="center">
                {Object.entries(socials).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform as keyof typeof socialIcons]
                  if (!Icon) return null
                  return (
                    <IconButton
                      key={platform}
                      component="a"
                      href={platform === "email" ? `mailto:${url}` : url}
                      target={platform !== "email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        color: "white",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "secondary.light",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  )
                })}
              </Stack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 0.5, color: "text.primary" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            background: gradients.accent,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 500,
          }}
        >
          {role}
        </Typography>
      </Box>
    </MotionPaper>
  )
}
