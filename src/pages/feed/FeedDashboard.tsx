// MUI
import { Grid, Stack } from "@mui/material";


// Parent, Sibling, Index
import Post from "../../socialMedia/components/Post/Post";
import { generateStory } from "../../types/story/story.types";
import MemoriesSidebar from "../../socialMedia/components/MemoriesSidebar";
import CreatePost from "../../socialMedia/components/createPost/CreatePost";
import StoriesContainer from "../../socialMedia/components/StoriesContainer";
import LiveEventsSidebar from "../../socialMedia/components/LiveEventsSidebar";
import TrendingTopicsSidebar from "../../socialMedia/components/TrendingTopicsSidebar";
import {
  type PostInterface,
  generateMultiplePosts,
} from "../../types/post/post.types";
import FriendSuggestionsSidebar from "../../socialMedia/components/FriendSuggestionsSidebar";

const FeedDashboard = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: "100%",
        overflowY: "auto",
        position: "relative",
        backgroundColor: "background.default",
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
            md: 3,
            xs: 12,
          }}
          sx={{
            top: 20,
            zIndex: 100,
            position: "sticky",
            display: { xs: "none", md: "block" },
          }}
        >
          <TrendingTopicsSidebar />
          <LiveEventsSidebar />
        </Grid>
        <Grid size={{ md: 5, xs: 12 }}>
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
            md: 3,
            xs: 12,
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
