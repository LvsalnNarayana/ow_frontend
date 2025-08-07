import { Stack, Box, Typography, Avatar, Chip, Paper } from "@mui/material";

const FriendSuggestionsSidebar = () => (
  <Paper
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      People You May Know
    </Typography>
    <Stack spacing={2}>
      {[
        { name: "Alex Smith", avatar: "/avatars/alex.jpg", mutualFriends: 5 },
        { name: "Lisa Chen", avatar: "/avatars/lisa.jpg", mutualFriends: 3 },
        {
          name: "David Brown",
          avatar: "/avatars/david.jpg",
          mutualFriends: 8,
        },
      ].map((person, index) => (
        <Box
          key={index}
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
          <Avatar src={person.avatar} sx={{ width: 40, height: 40 }} />
          <Stack flex={1}>
            <Typography variant="caption" fontWeight={600}>
              {person.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {person.mutualFriends} mutual friends
            </Typography>
          </Stack>
          <Chip
            label="Follow"
            size="small"
            color="primary"
            clickable
            onClick={() => console.log(`Follow ${person.name}`)}
          />
        </Box>
      ))}
    </Stack>
  </Paper>
);
export default FriendSuggestionsSidebar;
