import {
  Divider,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import { useState } from "react";

const sections = [
  "Introduction",
  "Getting Started",
  "Configuration",
  "Usage",
  "Advanced Topics",
  "Conclusion",
];

const TableOfContents = () => {
  const theme: Theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0); // Simulate active

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        width: "100%",
        maxHeight: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.radius.xs,
        position: "sticky",
        flexGrow: 1,
        top: 0,
        zIndex: 100,
      }}
    >
      <Typography variant="h6" textAlign="center">
        Table of Contents
      </Typography>
      <Divider />
      <Stack px={3} sx={{ position: "relative" }}>
        <Stack
          height="100%"
          width="2px"
          bgcolor={`${theme.palette.primary.light}60`}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            borderRadius: theme.shape.radius.xs,
          }}
        >
          <Stack
            width="100%"
            height={32}
            bgcolor={theme.palette.primary.main}
            sx={{
              position: "absolute",
              top: `${activeIndex * 32}px`,
              left: 0,
              borderRadius: theme.shape.radius.xs,
              transition: "top 0.3s ease",
            }}
          />
        </Stack>

        {sections.map((title, index) => (
          <Stack
            key={title}
            height={32}
            width={"100%"}
            justifyContent={"center"}
          >
            <Typography
              variant="body1"
              onClick={() => setActiveIndex(index)}
              sx={{
                cursor: "pointer",
                zIndex: 1,
                fontSize: 14,
                color:
                  activeIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                fontWeight: activeIndex === index ? 600 : 400,
              }}
            >
              {title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default TableOfContents;
