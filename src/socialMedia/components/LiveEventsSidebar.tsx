// MUI
import { Box, Chip, Stack, Paper, Typography } from "@mui/material";

const LiveEventsSidebar = () => (
  <Paper
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
      // top: 20,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      🔴 Live Now
    </Typography>
    <Stack spacing={2}>
      {[
        {
          viewers: 1234,
          host: "TechCorp",
          title: "Tech Conference 2024",
          thumbnail: "/images/tech-conference.png",
        },
        {
          viewers: 567,
          host: "Chef Maria",
          title: "Cooking with Chef Maria",
          thumbnail: "/images/tech-conference.png",
        },
      ].map((event, index) => (
        <Stack
          direction={"row"}
          key={index}
          alignItems={"center"}
          spacing={2}
          justifyContent={"space-between"}
          sx={{
            p: 1,
            gap: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              position: "relative",
              // overflow: "hidden",
            }}
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Chip
              label="LIVE"
              size="small"
              sx={{
                top: -2,
                right: -10,
                height: 16,
                color: "white",
                fontSize: "8px",
                position: "absolute",
                backgroundColor: "error.main",
              }}
            />
          </Box>
          <Stack flex={1}>
            <Typography variant="caption" fontWeight={600} noWrap>
              {event.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {event.viewers.toLocaleString()} watching
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </Paper>
);

export default LiveEventsSidebar;