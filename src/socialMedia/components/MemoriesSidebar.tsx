import { Stack, Box, Typography, Paper } from "@mui/material";

const MemoriesSidebar = () => (
  <Paper
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      📅 On This Day
    </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        borderRadius: 1,
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
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <img
          src="/memories/memory1.jpg"
          alt="Memory"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Stack flex={1}>
        <Typography variant="caption" fontWeight={600}>
          2 years ago
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          Beach day with friends
        </Typography>
      </Stack>
    </Box>
  </Paper>
);

export default MemoriesSidebar;
