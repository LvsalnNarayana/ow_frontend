import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UserGreeting from "../../meet/components/UserGreetings";
import MeetingActions from "../../meet/components/MeetingActions";
import RecentMeetings from "../../meet/components/RecentMeetings";
import { useMeetingOperations } from "../../meet/hooks/useMeetingOperations";
import type { MeetingRoom, MeetingUser } from "../../types/meet/meeting.types";
import { generatePosts } from "../../scripts/GeneratePost.script";

// Mock data - replace with real data from your auth/API
const mockUser: MeetingUser = {
  id: "1",
  username: "test_username",
  firstName: "John",
  lastName: "Doe",
};

const mockRecentMeetings: MeetingRoom[] = [
  {
    id: "room_1",
    name: "Team Standup",
    createdBy: "user1",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    participants: 5,
    isActive: true,
  },
  {
    id: "room_2",
    name: "Project Review",
    createdBy: "user2",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    participants: 3,
    isActive: false,
  },
];

const MeetDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { state, createMeeting, joinMeeting, setRoomId, clearError } =
    useMeetingOperations();

  // Load recent meetings on component mount
  useEffect(() => {
    // In real implementation, fetch recent meetings from API
    // setRecentMeetings(fetchedMeetings);
  }, []);

  console.log(generatePosts(1));

  return (
    <Container maxWidth="xl" sx={{ height: "100%", py: 2 }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        width="100%"
        height="100%"
        spacing={3}
      >
        {/* Left Panel - Meeting Controls */}
        <Stack
          width={isMobile ? "100%" : "45%"}
          height={isMobile ? "auto" : "100%"}
          component={Paper}
          elevation={1}
          sx={{
            p: 4,
            borderRadius: 2,
            background: theme.palette.background.paper,
          }}
        >
          <Stack
            height="100%"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <UserGreeting user={mockUser} />

            <Box width="100%" maxWidth={400}>
              <MeetingActions
                roomId={state.roomId}
                isCreatingMeeting={state.isCreatingMeeting}
                isJoiningMeeting={state.isJoiningMeeting}
                error={state.error}
                onCreateMeeting={createMeeting}
                onJoinMeeting={joinMeeting}
                onRoomIdChange={setRoomId}
                onClearError={clearError}
              />
            </Box>

            <RecentMeetings
              meetings={mockRecentMeetings}
              onJoinMeeting={joinMeeting}
            />
          </Stack>
        </Stack>

        {/* Right Panel - Hero Image */}
        <Stack
          width={isMobile ? "100%" : "55%"}
          height={isMobile ? "400px" : "100%"}
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="/images/videocall_bg.png"
            alt="Video call illustration"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.9)",
            }}
          />

          {/* Overlay with gradient */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, transparent 50%)`,
              pointerEvents: "none",
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default MeetDashboard;
