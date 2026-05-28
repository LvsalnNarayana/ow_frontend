// External
import React from "react";
import { useParams } from "react-router";


// MUI
import { Box, Stack, useTheme, Typography } from "@mui/material";


// Parent, Sibling, Index
import VideoGrid from "../../meet/components/VideoGrid";
import ChatSidebar from "../../meet/components/ChatSidebar";
import MeetingHeader from "../../meet/components/MeetingHeader";
import { useMeetingRoom } from "../../meet/hooks/UseMeetingRoom";
import MeetingControls from "../../meet/components/MeetingControls";
import ParticipantsSidebar from "../../meet/components/ParticipantSidebar";

const MeetRoom: React.FC = () => {
  const theme = useTheme();

  const { roomId } = useParams<{ roomId: string }>();

  const {
    toggleVideo,
    settings,
    toggleMute,
    toggleChat,
    currentUser,
    meetingInfo,
    sendMessage,
    setSettings,
    participants,
    chatMessages,
    leaveMeeting,
    toggleRecording,
    toggleScreenShare,
    toggleParticipants,
  } = useMeetingRoom(roomId || "");

  const handleLayoutChange = (layout: "grid" | "spotlight" | "sidebar") => {
    setSettings((prev) => ({ ...prev, layout }));
  };

  const unreadMessages = chatMessages.filter(
    (msg) => msg.senderId !== currentUser?.id && msg.type === "text"
  ).length;

  if (!currentUser || !meetingInfo) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.900",
        }}
      >
        <Typography variant="h6" color="white">
          Loading meeting...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        height: "100%",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "grey.900",
        borderRadius: theme?.shape?.radius?.xs,
      }}
    >
      {/* Meeting Header */}
      <MeetingHeader
        meetingInfo={meetingInfo}
        roomId={roomId as string}
        isRecording={settings.isRecording}
        onCopyRoomId={() => {}}
        onShowInfo={() => {}}
      />

      {/* Main Content Area */}
      <Stack direction="row" gap={2} sx={{ height: "100%" }}>
        {/* Video Area */}
        <Box
          sx={{
            pb: 5, // Space for controls
            flexGrow: 1,
            height: "100%",
            position: "relative",
            pt: settings.isChatOpen || settings.isParticipantsOpen ? 3 : 3,
          }}
        >
          <VideoGrid
            participants={participants}
            layout={settings.layout}
            currentUserId={currentUser.id}
          />
        </Box>

        {/* Chat Sidebar */}
        {settings.isChatOpen && (
          <ChatSidebar
            messages={chatMessages}
            onSendMessage={sendMessage}
            onClose={toggleChat}
          />
        )}

        {/* Participants Sidebar */}
        {settings.isParticipantsOpen && (
          <ParticipantsSidebar
            participants={participants}
            currentUserId={currentUser.id}
            onClose={toggleParticipants}
            onMuteParticipant={(participantId) => {
              // Handle mute participant (host action)
              console.log("Mute participant:", participantId);
            }}
            onRemoveParticipant={(participantId) => {
              // Handle remove participant (host action)
              console.log("Remove participant:", participantId);
            }}
          />
        )}
      </Stack>

      {/* Meeting Controls */}
      <MeetingControls
        settings={settings}
        participantCount={participants.length}
        unreadMessages={settings.isChatOpen ? 0 : unreadMessages}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onToggleRecording={toggleRecording}
        onToggleChat={toggleChat}
        onToggleParticipants={toggleParticipants}
        onLeaveMeeting={leaveMeeting}
        onChangeLayout={handleLayoutChange}
      />

      {/* Keyboard Shortcuts Overlay (Optional) */}
      {/* You can add a help overlay showing keyboard shortcuts */}

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default MeetRoom;
