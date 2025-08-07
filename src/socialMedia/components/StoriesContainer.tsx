import { Stack, Box, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { Story } from "../../types/story/story.types";
import UserAvatar from "../../shared/UserAvatar";
const StoriesContainer = ({ stories }: { stories: Story[] }) => (
  <Stack
    sx={{
      width: "100%",
      p: 2,
      backgroundColor: "background.paper",
      borderRadius: 2,
      boxShadow: 1,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      Stories
    </Typography>
    <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
      {/* Add Story Button */}
      <Stack alignItems="center" spacing={1} sx={{ minWidth: 80 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          onClick={() => console.log("Add story")}
        >
          <AddIcon sx={{ color: "white" }} />
        </Box>
        <Typography
          variant="caption"
          sx={{ textAlign: "center", maxWidth: 80 }}
        >
          Your Story
        </Typography>
      </Stack>

      {/* Stories */}
      {stories.map((story, index) => (
        <Stack
          key={story.id}
          alignItems="center"
          spacing={1}
          sx={{ minWidth: 80 }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              padding: "2px",
              background: story.isViewed
                ? "linear-gradient(45deg, #ccc, #999)"
                : "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
              },
              transition: "transform 0.2s ease",
            }}
            onClick={() => {}}
          >
            <UserAvatar username={story.user.username} width={64} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              maxWidth: 80,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {story.user.username}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Stack>
);

export default StoriesContainer;
