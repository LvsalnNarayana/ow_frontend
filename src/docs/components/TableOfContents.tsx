// External
import { useState } from "react";


// MUI
import {
  Stack,
  Divider,
  useTheme,
  Typography,
  type Theme,
} from "@mui/material";

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
        width: "100%",
        p: 1,
        top: 0,
        flexGrow: 1,
        zIndex: 100,
        maxHeight: "100%",
        position: "sticky",
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.paper,
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
            top: 0,
            left: 0,
            position: "absolute",
            borderRadius: theme.shape.radius.xs,
          }}
        >
          <Stack
            width="100%"
            height={32}
            bgcolor={theme.palette.primary.main}
            sx={{
              left: 0,
              position: "absolute",
              transition: "top 0.3s ease",
              top: `${activeIndex * 32}px`,
              borderRadius: theme.shape.radius.xs,
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
                zIndex: 1,
                fontSize: 14,
                cursor: "pointer",
                fontWeight: activeIndex === index ? 600 : 400,
                color:
                  activeIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
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
