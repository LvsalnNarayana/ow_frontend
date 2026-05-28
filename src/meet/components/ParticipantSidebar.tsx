// External
import moment from "moment";
import React, { useState } from "react";


// MUI
import {
  Box,
  Menu,
  Chip,
  Stack,
  Paper,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Mic as MicIcon,
  Close as CloseIcon,
  PanTool as HandIcon,
  MicOff as MicOffIcon,
  VolumeOff as MuteIcon,
  MoreVert as MoreVertIcon,
  Videocam as VideocamIcon,
  PersonRemove as RemoveIcon,
  VideocamOff as VideocamOffIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";


// Shared
import UserAvatar from "../../shared/UserAvatar";


// Parent, Sibling, Index
import type { Participant } from "../../types/meet/meeting.types";

interface ParticipantsSidebarProps {
  participants: Participant[];
  currentUserId: string;
  onClose: () => void;
  onMuteParticipant?: (participantId: string) => void;
  onRemoveParticipant?: (participantId: string) => void;
}

const ParticipantsSidebar: React.FC<ParticipantsSidebarProps> = ({
  onClose,
  participants,
  currentUserId,
  onMuteParticipant,
  onRemoveParticipant,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    participant: Participant
  ) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedParticipant(participant);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedParticipant(null);
  };

  const handleMuteParticipant = () => {
    if (selectedParticipant && onMuteParticipant) {
      onMuteParticipant(selectedParticipant.id);
    }
    handleMenuClose();
  };

  const handleRemoveParticipant = () => {
    if (selectedParticipant && onRemoveParticipant) {
      onRemoveParticipant(selectedParticipant.id);
    }
    handleMenuClose();
  };

  const currentUser = participants.find((p) => p.id === currentUserId);

  const isCurrentUserHost = currentUser?.isHost || false;

  return (
    <Paper
      elevation={3}
      sx={{
        width: 350,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Typography variant="h6" fontWeight={600}>
          Participants ({participants.length})
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Participants List */}
      <Box
        sx={{
          p: 1,
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Stack spacing={1}>
          {participants.map((participant) => (
            <Box
              key={participant.id}
              sx={{
                p: 1,
                borderRadius: 2,
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* Avatar */}
                <Box position="relative">
                  <UserAvatar username={participant?.name} width={40} />

                  {/* Connection status indicator */}
                  <Box
                    sx={{
                      width: 12,
                      right: -2,
                      bottom: -2,
                      height: 12,
                      borderRadius: "50%",
                      position: "absolute",
                      border: "2px solid white",
                      backgroundColor:
                        participant.connectionStatus === "connected"
                          ? "success.main"
                          : participant.connectionStatus === "connecting"
                          ? "warning.main"
                          : "error.main",
                    }}
                  />
                </Box>

                {/* Participant Info */}
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {participant.id === currentUserId
                        ? "You"
                        : participant.name}
                    </Typography>

                    {participant.isHost && (
                      <Chip
                        label="Host"
                        size="small"
                        icon={<AdminIcon />}
                        sx={{
                          height: 20,
                          color: "white",
                          fontSize: "0.7rem",
                          backgroundColor: "primary.main",
                        }}
                      />
                    )}
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    Joined {moment(participant.joinedAt).fromNow()}
                  </Typography>

                  {/* Status indicators */}
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    {participant.isHandRaised && (
                      <Tooltip title="Hand raised">
                        <HandIcon
                          sx={{ fontSize: 16, color: "warning.main" }}
                        />
                      </Tooltip>
                    )}

                    <Tooltip title={participant.isMuted ? "Muted" : "Unmuted"}>
                      {participant.isMuted ? (
                        <MicOffIcon
                          sx={{ fontSize: 16, color: "error.main" }}
                        />
                      ) : (
                        <MicIcon sx={{ fontSize: 16, color: "success.main" }} />
                      )}
                    </Tooltip>

                    <Tooltip
                      title={participant.isVideoOn ? "Camera on" : "Camera off"}
                    >
                      {participant.isVideoOn ? (
                        <VideocamIcon
                          sx={{ fontSize: 16, color: "success.main" }}
                        />
                      ) : (
                        <VideocamOffIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                      )}
                    </Tooltip>

                    {participant.isScreenSharing && (
                      <Chip
                        label="Presenting"
                        size="small"
                        sx={{
                          height: 16,
                          color: "white",
                          fontSize: "0.6rem",
                          backgroundColor: "primary.main",
                        }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Actions Menu */}
                {isCurrentUserHost && participant.id !== currentUserId && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, participant)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Host Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { minWidth: 180 },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {selectedParticipant && (
          <>
            <MenuItem onClick={handleMuteParticipant}>
              <ListItemIcon>
                <MuteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {selectedParticipant.isMuted ? "Unmute" : "Mute"} participant
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={handleRemoveParticipant}>
              <ListItemIcon>
                <RemoveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove from meeting</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
    </Paper>
  );
};

export default ParticipantsSidebar;
