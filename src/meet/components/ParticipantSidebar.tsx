import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  PanTool as HandIcon,
  PersonRemove as RemoveIcon,
  VolumeOff as MuteIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import type { Participant } from "../../types/meet/meeting.types";
import moment from "moment";
import UserAvatar from "../../shared/UserAvatar";

interface ParticipantsSidebarProps {
  participants: Participant[];
  currentUserId: string;
  onClose: () => void;
  onMuteParticipant?: (participantId: string) => void;
  onRemoveParticipant?: (participantId: string) => void;
}

const ParticipantsSidebar: React.FC<ParticipantsSidebarProps> = ({
  participants,
  currentUserId,
  onClose,
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
          flexGrow: 1,
          overflowY: "auto",
          p: 1,
        }}
      >
        <Stack spacing={1}>
          {participants.map((participant) => (
            <Box
              key={participant.id}
              sx={{
                p: 1,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
                transition: "background-color 0.2s",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* Avatar */}
                <Box position="relative">
                  <UserAvatar username={participant?.name} width={40} />

                  {/* Connection status indicator */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor:
                        participant.connectionStatus === "connected"
                          ? "success.main"
                          : participant.connectionStatus === "connecting"
                          ? "warning.main"
                          : "error.main",
                      border: "2px solid white",
                    }}
                  />
                </Box>

                {/* Participant Info */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
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
                          fontSize: "0.7rem",
                          backgroundColor: "primary.main",
                          color: "white",
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
                          sx={{ color: "warning.main", fontSize: 16 }}
                        />
                      </Tooltip>
                    )}

                    <Tooltip title={participant.isMuted ? "Muted" : "Unmuted"}>
                      {participant.isMuted ? (
                        <MicOffIcon
                          sx={{ color: "error.main", fontSize: 16 }}
                        />
                      ) : (
                        <MicIcon sx={{ color: "success.main", fontSize: 16 }} />
                      )}
                    </Tooltip>

                    <Tooltip
                      title={participant.isVideoOn ? "Camera on" : "Camera off"}
                    >
                      {participant.isVideoOn ? (
                        <VideocamIcon
                          sx={{ color: "success.main", fontSize: 16 }}
                        />
                      ) : (
                        <VideocamOffIcon
                          sx={{ color: "text.secondary", fontSize: 16 }}
                        />
                      )}
                    </Tooltip>

                    {participant.isScreenSharing && (
                      <Chip
                        label="Presenting"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: "0.6rem",
                          backgroundColor: "primary.main",
                          color: "white",
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
