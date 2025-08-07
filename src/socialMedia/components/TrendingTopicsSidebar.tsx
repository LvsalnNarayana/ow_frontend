import { Stack, Box, Typography, Paper } from "@mui/material";

interface TrendingTopic {
  id: string;
  hashtag: string;
  postCount: number;
  category: string;
}

const mockTrendingTopics: TrendingTopic[] = [
  { id: "1", hashtag: "#TechNews", postCount: 1234, category: "Technology" },
  {
    id: "2",
    hashtag: "#MondayMotivation",
    postCount: 856,
    category: "Lifestyle",
  },
  {
    id: "3",
    hashtag: "#WebDevelopment",
    postCount: 642,
    category: "Technology",
  },
  { id: "4", hashtag: "#Photography", postCount: 423, category: "Art" },
  { id: "5", hashtag: "#Fitness", postCount: 389, category: "Health" },
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
