import { Stack, Grid } from "@mui/material";
import Post from "../../socialMedia/components/Post/Post";
import {
  generateMultiplePosts,
  type PostInterface,
} from "../../types/post/post.types";
import CreatePost from "../../socialMedia/components/createPost/CreatePost";
import { generateStory } from "../../types/story/story.types";
import FriendSuggestionsSidebar from "../../socialMedia/components/FriendSuggestionsSidebar";
import TrendingTopicsSidebar from "../../socialMedia/components/TrendingTopicsSidebar";
import MemoriesSidebar from "../../socialMedia/components/MemoriesSidebar";
import LiveEventsSidebar from "../../socialMedia/components/LiveEventsSidebar";
import StoriesContainer from "../../socialMedia/components/StoriesContainer";

const FeedDashboard = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100%",
        overflowY: "auto",
        backgroundColor: "background.default",
        position: "relative",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        sx={{ p: 2, position: "relative" }}
      >
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 20,
            zIndex: 100,
          }}
        >
          <TrendingTopicsSidebar />
          <LiveEventsSidebar />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack alignItems="center" gap={3}>
            <StoriesContainer
              stories={Array.from({ length: 10 }, generateStory)}
            />
            <CreatePost />
            {generateMultiplePosts(10).map((post: PostInterface) => (
              <Post key={post.id} post={post} />
            ))}
          </Stack>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <MemoriesSidebar />
          <FriendSuggestionsSidebar />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FeedDashboard;
