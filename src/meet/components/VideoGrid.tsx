import React from "react";
import { Box, Grid } from "@mui/material";
import ParticipantVideo from "./ParticipantVideo";
import type { Participant } from "../../types/meet/meeting.types";

interface VideoGridProps {
  participants: Participant[];
  layout: "grid" | "spotlight" | "sidebar";
  currentUserId: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  participants,
  layout,
  currentUserId,
}) => {
  const getGridColumns = (participantCount: number) => {
    if (participantCount <= 1) return 1;
    if (participantCount <= 4) return 2;
    if (participantCount <= 9) return 3;
    return 4;
  };

  const getGridItemSize = (participantCount: number) => {
    const columns = getGridColumns(participantCount);
    return 12 / columns;
  };

  const renderGridLayout = () => {
    const gridItemSize = getGridItemSize(participants.length);

    return (
      <Grid container spacing={1} sx={{ height: "100%", width: "100%", p: 1 }}>
        {participants.map((participant) => (
          <Grid
            size={gridItemSize}
            key={participant.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ParticipantVideo
              participant={participant}
              isCurrentUser={participant.id === currentUserId}
              size="medium"
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSpotlightLayout = () => {
    const mainParticipant =
      participants.find((p) => p.isScreenSharing) || participants[0];
    const otherParticipants = participants.filter(
      (p) => p.id !== mainParticipant?.id
    );

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main video */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          {mainParticipant && (
            <ParticipantVideo
              participant={mainParticipant}
              isCurrentUser={mainParticipant.id === currentUserId}
              size="large"
            />
          )}
        </Box>

        {/* Thumbnail strip */}
        {otherParticipants.length > 0 && (
          <Box
            sx={{
              height: 150,
              display: "flex",
              gap: 1,
              overflowX: "auto",
              pb: 1,
            }}
          >
            {otherParticipants.map((participant) => (
              <Box key={participant.id} sx={{ flexShrink: 0 }}>
                <ParticipantVideo
                  participant={participant}
                  isCurrentUser={participant.id === currentUserId}
                  size="small"
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  const renderSidebarLayout = () => {
    const mainParticipant =
      participants.find((p) => p.isScreenSharing) || participants[0];
    const otherParticipants = participants.filter(
      (p) => p.id !== mainParticipant?.id
    );

    return (
      <Box sx={{ height: "100%", display: "flex", p: 1, gap: 1 }}>
        {/* Main video */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mainParticipant && (
            <ParticipantVideo
              participant={mainParticipant}
              isCurrentUser={mainParticipant.id === currentUserId}
              size="large"
            />
          )}
        </Box>

        {/* Sidebar with other participants */}
        {otherParticipants.length > 0 && (
          <Box
            sx={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowY: "auto",
            }}
          >
            {otherParticipants.map((participant) => (
              <ParticipantVideo
                key={participant.id}
                participant={participant}
                isCurrentUser={participant.id === currentUserId}
                size="small"
              />
            ))}
          </Box>
        )}
      </Box>
    );
  };

  switch (layout) {
    case "spotlight":
      return renderSpotlightLayout();
    case "sidebar":
      return renderSidebarLayout();
    default:
      return renderGridLayout();
  }
};

export default VideoGrid;
