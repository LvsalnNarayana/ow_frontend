// External
import React from "react";


// MUI
import { Box, Chip, Stack, Avatar, Typography } from "@mui/material";
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  // Videocam as VideocamIcon,
  // VideocamOff as VideocamOffIcon,
  // MoreVert as MoreVertIcon,
} from "@mui/icons-material";


// Parent, Sibling, Index
import type { Participant } from "../../types/meet/meeting.types";

interface ParticipantVideoProps {
  participant: Participant;
  isCurrentUser?: boolean;
  size?: "small" | "medium" | "large";
}

const ParticipantVideo: React.FC<ParticipantVideoProps> = ({
  participant,
  size = "medium",
  isCurrentUser = false,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { width: 200, height: "100%" };
      case "large":
        return { width: "100%", height: "100%" };
      default:
        return { width: "100%", height: "100%" };
    }
  };

  return (
    <Box
      sx={{
        ...getSizeStyles(),
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "grey.900",
        borderColor: "primary.main",
        border: participant.isScreenSharing ? "2px solid" : "none",
      }}
    >
      {/* Video/Avatar Display */}
      {participant.isVideoOn ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey.800",
          }}
        >
          {/* Placeholder for actual video stream */}
          <Typography color="white" variant="h6">
            📹 Video Stream
          </Typography>
        </Box>
      ) : (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "grey.700" }}
        >
          <Avatar
            sx={{
              width: size === "large" ? 80 : 60,
              height: size === "large" ? 80 : 60,
              fontSize: size === "large" ? "2rem" : "1.5rem",
            }}
          >
            {participant.name.charAt(0).toUpperCase()}
          </Avatar>
        </Stack>
      )}

      {/* Participant Info Overlay */}
      <Box
        sx={{
          px: 2,
          left: 0,
          py: 1.5,
          right: 0,
          bottom: 0,
          position: "absolute",
          background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body1"
              fontSize={14}
              color="white"
              sx={{
                fontWeight: 500,
              }}
            >
              {isCurrentUser ? "You" : participant.name}
            </Typography>

            {participant.isHost && (
              <Chip
                label="Host"
                size="small"
                sx={{
                  height: 20,
                  color: "white",
                  fontSize: "0.7rem",
                  backgroundColor: "primary.main",
                }}
              />
            )}
          </Stack>

          <Stack direction="row" gap={1} alignItems={"center"}>
            {participant.isHandRaised && (
              // <HandIcon sx={{ color: "warning.main", fontSize: 16 }} />
              <Typography fontSize={18}>👋🏼</Typography>
            )}

            {participant.isMuted ? (
              <MicOffIcon sx={{ fontSize: 18, color: "error.main" }} />
            ) : (
              <MicIcon sx={{ fontSize: 18, color: "success.main" }} />
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Connection Status Indicator */}
      {participant.connectionStatus !== "connected" && (
        <Box
          sx={{
            px: 1,
            top: 8,
            py: 0.5,
            right: 8,
            borderRadius: 1,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <Typography variant="caption" color="warning.main">
            {participant.connectionStatus}
          </Typography>
        </Box>
      )}

      {/* Screen Sharing Indicator */}
      {participant.isScreenSharing && (
        <Box
          sx={{
            px: 1,
            top: 8,
            left: 8,
            py: 0.5,
            borderRadius: 1,
            position: "absolute",
            backgroundColor: "primary.main",
          }}
        >
          <Typography variant="caption" color="white" fontSize="0.7rem">
            Presenting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ParticipantVideo;
