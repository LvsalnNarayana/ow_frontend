import React, { useState, useEffect, useCallback } from "react";
// import { generatePosts } from "../../scripts/GeneratePost.script";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  LinearProgress,
  Fab,
  Chip,
  Grid,
  Paper,
  Fade,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import Post from "../../socialMedia/components/Post/Post";
import {
  generateMultiplePosts,
  type PostInterface,
} from "../../types/post/post.types";
import CreatePost from "../../socialMedia/components/createPost/CreatePost";

// Story interface
interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  timestamp: Date;
  duration: number; // in seconds
  isViewed?: boolean;
}

// Trending topic interface
interface TrendingTopic {
  id: string;
  hashtag: string;
  postCount: number;
  category: string;
}

// Mock stories data
const mockStories: Story[] = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    userAvatar: "/avatars/john.jpg",
    mediaUrl: "/stories/story1.jpg",
    mediaType: "image",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    duration: 5,
    isViewed: false,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Wilson",
    userAvatar: "/avatars/sarah.jpg",
    mediaUrl: "/stories/story2.jpg",
    mediaType: "image",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    duration: 5,
    isViewed: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mike Johnson",
    userAvatar: "/avatars/mike.jpg",
    mediaUrl: "/stories/story3.mp4",
    mediaType: "video",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    duration: 10,
    isViewed: false,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Emma Davis",
    userAvatar: "/avatars/emma.jpg",
    mediaUrl: "/stories/story4.jpg",
    mediaType: "image",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    duration: 5,
    isViewed: false,
  },
];

// Mock trending topics
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

const FeedDashboard = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [stories, setStories] = useState(mockStories);
  const handleStoryClick = useCallback((story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentStoryIndex(index);
    setStoryProgress(0);

    // Mark story as viewed
    setStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, isViewed: true } : s))
    );
  }, []);

  const handleCloseStory = useCallback(() => {
    setSelectedStory(null);
    setStoryProgress(0);
    setCurrentStoryIndex(0);
  }, []);

  const handleNextStory = useCallback(() => {
    const nextIndex = currentStoryIndex + 1;
    if (nextIndex < stories.length) {
      handleStoryClick(stories[nextIndex], nextIndex);
    } else {
      handleCloseStory();
    }
  }, [currentStoryIndex, stories, handleStoryClick, handleCloseStory]);

  const handlePrevStory = useCallback(() => {
    const prevIndex = currentStoryIndex - 1;
    if (prevIndex >= 0) {
      handleStoryClick(stories[prevIndex], prevIndex);
    }
  }, [currentStoryIndex, stories, handleStoryClick]);
  // Preload next story's media
  useEffect(() => {
    if (!selectedStory || currentStoryIndex >= stories.length - 1) return;

    const nextStory = stories[currentStoryIndex + 1];
    if (nextStory) {
      if (nextStory.mediaType === "image") {
        const img = new Image();
        img.src = nextStory.mediaUrl;
      } else {
        const video = document.createElement("video");
        video.src = nextStory.mediaUrl;
        video.preload = "auto";
      }
    }
  }, [selectedStory, currentStoryIndex, stories]);

  // Story timer effect
  useEffect(() => {
    if (!selectedStory) return;

    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        const newProgress = prev + 100 / (selectedStory.duration * 10);
        if (newProgress >= 100) {
          handleNextStory();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [selectedStory, stories.length, handleNextStory]);

  const StoriesSection = () => (
    <Box
      sx={{
        width: "100%",
        mb: 3,
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
              onClick={() => handleStoryClick(story, index)}
            >
              <Avatar
                src={story.userAvatar}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid white",
                }}
              />
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
              {story.userName}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );

  // Sidebar Components
  const TrendingSidebar = () => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        position: "sticky",
        top: 20,
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

  const LiveEventsSidebar = () => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        position: "sticky",
        top: 20,
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
            thumbnail: "/live/tech-conf.jpg",
          },
          {
            title: "Cooking with Chef Maria",
            host: "Chef Maria",
            viewers: 567,
            thumbnail: "/live/cooking.jpg",
          },
        ].map((event, index) => (
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
            <Box
              sx={{
                position: "relative",
                width: 50,
                height: 40,
                borderRadius: 1,
                overflow: "hidden",
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
                  top: 2,
                  left: 2,
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
          </Box>
        ))}
      </Stack>
    </Paper>
  );

  const MemoriesSidebar = () => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        position: "sticky",
        top: 20,
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

  const SuggestedPeopleSidebar = () => (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        position: "sticky",
        top: 20,
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

  const StoryViewer = () => (
    <Dialog
      open={!!selectedStory}
      onClose={handleCloseStory}
      maxWidth={false}
      TransitionComponent={Fade} // Add smooth transition
      TransitionProps={{ timeout: 200 }}
      PaperProps={{
        sx: {
          width: "100vw",
          height: "100vh",
          maxWidth: "none",
          maxHeight: "none",
          margin: 0,
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      {selectedStory && (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          {/* Progress bars */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              right: 20,
              zIndex: 10,
              display: "flex",
              gap: 1,
            }}
          >
            {stories.map((_, index) => (
              <LinearProgress
                key={index}
                variant="determinate"
                value={
                  index < currentStoryIndex
                    ? 100
                    : index === currentStoryIndex
                    ? storyProgress
                    : 0
                }
                sx={{
                  flex: 1,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "white",
                    transition: "width 0.1s linear", // Smooth progress transition
                  },
                }}
              />
            ))}
          </Box>

          {/* Story header */}
          <Box
            sx={{
              position: "absolute",
              top: 40,
              left: 20,
              right: 20,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={selectedStory.userAvatar}
                sx={{ width: 40, height: 40 }}
              />
              <Stack>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  {selectedStory.userName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {new Date(selectedStory.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Stack>
            </Stack>
            <IconButton onClick={handleCloseStory} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Story content with transition */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: 1,
                transition: "opacity 02s ease-in-out", // Smooth media transition
              }}
              key={selectedStory.id} // Key to trigger transition
            >
              {selectedStory.mediaType === "image" ? (
                <img
                  src={selectedStory.mediaUrl}
                  alt="Story"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <video
                  src={selectedStory.mediaUrl}
                  autoPlay
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Navigation areas */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "30%",
              height: "100%",
              cursor: "pointer",
              zIndex: 5,
            }}
            onClick={handlePrevStory}
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "30%",
              height: "100%",
              cursor: "pointer",
              zIndex: 5,
            }}
            onClick={handleNextStory}
          />

          {/* Navigation buttons */}
          {currentStoryIndex > 0 && (
            <IconButton
              onClick={handlePrevStory}
              sx={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <NavigateBefore />
            </IconButton>
          )}
          {currentStoryIndex < stories.length - 1 && (
            <IconButton
              onClick={handleNextStory}
              sx={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <NavigateNext />
            </IconButton>
          )}
        </Box>
      )}
    </Dialog>
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        overflowY: "auto",
        backgroundColor: "background.default",
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        {/* Left Sidebar */}
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <TrendingSidebar />
          <LiveEventsSidebar />
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack alignItems="center" gap={2}>
            {/* Stories Section */}
            <StoriesSection />

            {/* Create Post */}
            <CreatePost />

            {/* Posts Feed */}
            {generateMultiplePosts(10).map((post: PostInterface) => (
              <Post key={post.id} post={post} />
            ))}
          </Stack>
        </Grid>

        {/* Right Sidebar */}
        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <MemoriesSidebar />
          <SuggestedPeopleSidebar />
        </Grid>
      </Grid>

      {/* Story Viewer Dialog */}
      <StoryViewer />

      {/* Floating Action Button for Quick Post */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
        onClick={() => console.log("Quick post")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default FeedDashboard;
