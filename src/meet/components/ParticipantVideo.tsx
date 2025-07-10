import React from "react";
import { Box, Typography, Stack, Avatar, Chip } from "@mui/material";
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  // Videocam as VideocamIcon,
  // VideocamOff as VideocamOffIcon,
  // MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import type { Participant } from "../../types/meet/meeting.types";

interface ParticipantVideoProps {
  participant: Participant;
  isCurrentUser?: boolean;
  size?: "small" | "medium" | "large";
}

const ParticipantVideo: React.FC<ParticipantVideoProps> = ({
  participant,
  isCurrentUser = false,
  size = "medium",
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
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "grey.900",
        border: participant.isScreenSharing ? "2px solid" : "none",
        borderColor: "primary.main",
      }}
    >
      {/* Video/Avatar Display */}
      {participant.isVideoOn ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "grey.800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
          px: 2,
          py: 1.5,
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
                  fontSize: "0.7rem",
                  backgroundColor: "primary.main",
                  color: "white",
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
              <MicOffIcon sx={{ color: "error.main", fontSize: 18 }} />
            ) : (
              <MicIcon sx={{ color: "success.main", fontSize: 18 }} />
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Connection Status Indicator */}
      {participant.connectionStatus !== "connected" && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.7)",
            borderRadius: 1,
            px: 1,
            py: 0.5,
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
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "primary.main",
            borderRadius: 1,
            px: 1,
            py: 0.5,
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
