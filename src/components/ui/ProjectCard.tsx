import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useState } from "react"
import type { Project } from "../../types"
import { glassStyles, gradients } from "../../theme/theme"

const MotionPaper = motion.create(Paper)
const MotionBox = motion.create(Box)

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false)

  const defaultCategoryColors = ["#667eea", "#3B82F6", "#10B981", "#F59E0B"]

  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 30 }}
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image Container with Zoom Effect */}
      <Box
        sx={{
          position: "relative",
          height: 220,
          overflow: "hidden",
        }}
      >
        <MotionBox
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          sx={{
            width: "100%",
            height: "100%",
            background: project.imageUrl
              ? `url("${project.imageUrl}")`
              : gradients.accent,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
          }}
        />

        {/* Category Chips Overlay */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {project.categories.map((category, index) => {
            const color =
              project.categoryColors?.[index] ||
              defaultCategoryColors[index % defaultCategoryColors.length]
            return (
              <Chip
                key={category}
                label={category}
                size="small"
                sx={{
                  ...glassStyles.dark,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: 26,
                  borderColor: `${color}50`,
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />
            )
          })}
        </Stack>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
            mb: 3,
            flexGrow: 1,
          }}
        >
          {project.description}
        </Typography>

        <MotionBox whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Button
            variant="text"
            endIcon={<ArrowForward />}
            href={project.link}
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textTransform: "none",
              p: 0,
              justifyContent: "flex-start",
              "&:hover": {
                backgroundColor: "transparent",
                color: "secondary.main",
              },
            }}
          >
            View Case Study
          </Button>
        </MotionBox>
      </Box>
    </MotionPaper>
  )
}
