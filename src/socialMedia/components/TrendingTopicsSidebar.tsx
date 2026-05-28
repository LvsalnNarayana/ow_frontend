// MUI
import { Box, Stack, Paper, Typography } from "@mui/material";

interface TrendingTopic {
  id: string;
  hashtag: string;
  postCount: number;
  category: string;
}

const mockTrendingTopics: TrendingTopic[] = [
  { id: "1", postCount: 1234, hashtag: "#TechNews", category: "Technology" },
  {
    id: "2",
    postCount: 856,
    category: "Lifestyle",
    hashtag: "#MondayMotivation",
  },
  {
    id: "3",
    postCount: 642,
    category: "Technology",
    hashtag: "#WebDevelopment",
  },
  { id: "4", postCount: 423, category: "Art", hashtag: "#Photography" },
  { id: "5", postCount: 389, category: "Health", hashtag: "#Fitness" },
];

const TrendingTopicsSidebar = () => (
  <Paper
    sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      Trending Topics
    </Typography>
    <Stack spacing={1}>
      {mockTrendingTopics.slice(0, 5).map((topic) => (
        <Box
          key={topic.id}
          sx={{
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          onClick={() => console.log(`Search for ${topic.hashtag}`)}
        >
          <Typography variant="body2" fontWeight={600}>
            {topic.hashtag}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {topic.postCount.toLocaleString()} posts
          </Typography>
        </Box>
      ))}
    </Stack>
  </Paper>
);

export default TrendingTopicsSidebar;
