import { Stack, Box, Typography, Chip, Paper } from "@mui/material";
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
          title: "Tech Conference 2024",
          host: "TechCorp",
          viewers: 1234,
          thumbnail: "/images/tech-conference.png",
        },
        {
          title: "Cooking with Chef Maria",
          host: "Chef Maria",
          viewers: 567,
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
            gap: 1,
            p: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 40,
              height: 40,
              borderRadius: "50%",
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
                position: "absolute",
                top: -2,
                right: -10,
                backgroundColor: "error.main",
                color: "white",
                fontSize: "8px",
                height: 16,
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