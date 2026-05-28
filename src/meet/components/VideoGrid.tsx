// External
import React from "react";


// MUI
import { Box, Grid } from "@mui/material";


// Parent, Sibling, Index
import ParticipantVideo from "./ParticipantVideo";
import type { Participant } from "../../types/meet/meeting.types";

interface VideoGridProps {
  participants: Participant[];
  layout: "grid" | "spotlight" | "sidebar";
  currentUserId: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  layout,
  participants,
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
      <Grid container spacing={1} sx={{ width: "100%", p: 1, height: "100%" }}>
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
            mb: 1,
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

        {/* Thumbnail strip */}
        {otherParticipants.length > 0 && (
          <Box
            sx={{
              pb: 1,
              gap: 1,
              height: 150,
              display: "flex",
              overflowX: "auto",
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
      <Box sx={{ p: 1, gap: 1, height: "100%", display: "flex" }}>
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
              gap: 1,
              display: "flex",
              overflowY: "auto",
              flexDirection: "column",
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
