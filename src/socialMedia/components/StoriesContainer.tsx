// MUI
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";


// Shared
import UserAvatar from "../../shared/UserAvatar";


// Parent, Sibling, Index
import type { Story } from "../../types/story/story.types";

const StoriesContainer = ({ stories }: { stories: Story[] }) => (
  <Stack
    sx={{
      width: "100%",
      p: 2,
      boxShadow: 1,
      borderRadius: 2,
      backgroundColor: "background.paper",
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      Stories
    </Typography>
    <Stack direction="row" spacing={2} sx={{ pb: 1, overflowX: "auto" }}>
      {/* Add Story Button */}
      <Stack alignItems="center" spacing={1} sx={{ minWidth: 80 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            display: "flex",
            cursor: "pointer",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.main",
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
          sx={{ maxWidth: 80, textAlign: "center" }}
        >
          Your Story
        </Typography>
      </Stack>

      {/* Stories */}
      {stories.map((story) => (
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
              padding: "2px",
              cursor: "pointer",
              borderRadius: "50%",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              background: story.isViewed
                ? "linear-gradient(45deg, #ccc, #999)"
                : "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
            onClick={() => {}}
          >
            <UserAvatar username={story.user.username} width={64} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              maxWidth: 80,
              overflow: "hidden",
              textAlign: "center",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
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
