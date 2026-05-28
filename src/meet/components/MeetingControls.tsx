// External
import React, { useState } from "react";


// MUI
import {
  Box,
  Menu,
  Stack,
  Tooltip,
  Divider,
  MenuItem,
  useTheme,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Mic as MicIcon,
  Chat as ChatIcon,
  Stop as StopIcon,
  PanTool as HandIcon,
  MicOff as MicOffIcon,
  People as PeopleIcon,
  CallEnd as CallEndIcon,
  Videocam as VideocamIcon,
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  GridView as GridViewIcon,
  Fullscreen as FullscreenIcon,
  ViewAgenda as ViewAgendaIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  FiberManualRecord as RecordIcon,
  StopScreenShare as StopScreenShareIcon,
} from "@mui/icons-material";


// Parent, Sibling, Index
import type { MeetingSettings } from "../../types/meet/meeting.types";

interface MeetingControlsProps {
  settings: MeetingSettings;
  participantCount: number;
  unreadMessages: number;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleRecording: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  onLeaveMeeting: () => void;
  onChangeLayout: (layout: "grid" | "spotlight" | "sidebar") => void;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({
  onToggleVideo,
  settings,
  onToggleMute,
  onToggleChat,
  unreadMessages,
  onLeaveMeeting,
  onChangeLayout,
  participantCount,
  onToggleRecording,
  onToggleScreenShare,
  onToggleParticipants,
}) => {
  const theme = useTheme();

  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const [layoutMenuAnchor, setLayoutMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleLayoutMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLayoutMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreMenuAnchor(null);
    setLayoutMenuAnchor(null);
  };

  const controlButtonStyle = {
    width: 40,
    height: 40,
    color: "white",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  };

  const activeButtonStyle = {
    ...controlButtonStyle,
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  };

  const dangerButtonStyle = {
    ...controlButtonStyle,
    backgroundColor: "error.main",
    "&:hover": {
      backgroundColor: "error.dark",
    },
  };

  return (
    <Box
      sx={{
        p: 1.5,
        bottom: 20,
        left: "50%",
        zIndex: 1000,
        borderRadius: 4,
        position: "fixed",
        backdropFilter: "blur(10px)",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Mute/Unmute */}
        <Tooltip title={settings.isMuted ? "Unmute" : "Mute"}>
          <IconButton
            onClick={onToggleMute}
            sx={settings.isMuted ? dangerButtonStyle : controlButtonStyle}
          >
            {settings.isMuted ? (
              <MicOffIcon fontSize="small" />
            ) : (
              <MicIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        {/* Video On/Off */}
        <Tooltip
          title={settings.isVideoOn ? "Turn off camera" : "Turn on camera"}
        >
          <IconButton
            onClick={onToggleVideo}
            sx={!settings.isVideoOn ? dangerButtonStyle : controlButtonStyle}
          >
            {settings.isVideoOn ? (
              <VideocamIcon fontSize="small" />
            ) : (
              <VideocamOffIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip
          title={settings.isScreenSharing ? "Stop sharing" : "Share screen"}
        >
          <IconButton
            onClick={onToggleScreenShare}
            sx={
              settings.isScreenSharing ? activeButtonStyle : controlButtonStyle
            }
          >
            {settings.isScreenSharing ? (
              <StopScreenShareIcon fontSize="small" />
            ) : (
              <ScreenShareIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        />

        {/* Participants */}
        <Tooltip title="Show participants">
          <IconButton
            onClick={onToggleParticipants}
            sx={
              settings.isParticipantsOpen
                ? activeButtonStyle
                : controlButtonStyle
            }
          >
            <Stack alignItems="center" position="relative">
              <PeopleIcon fontSize="small" />
              {participantCount > 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    minWidth: 16,
                    top: -16,
                    right: -16,
                    height: 16,
                    display: "flex",
                    fontSize: "0.7rem",
                    borderRadius: "50%",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "primary.main",
                  }}
                >
                  {participantCount}
                </Typography>
              )}
            </Stack>
          </IconButton>
        </Tooltip>

        {/* Chat */}
        <Tooltip title="Show chat">
          <IconButton
            onClick={onToggleChat}
            sx={settings.isChatOpen ? activeButtonStyle : controlButtonStyle}
          >
            <Stack alignItems="center" position="relative">
              <ChatIcon fontSize="small" />
              {unreadMessages > 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    minWidth: 16,
                    top: -8,
                    right: -8,
                    height: 16,
                    display: "flex",
                    fontSize: "0.7rem",
                    borderRadius: "50%",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "error.main",
                  }}
                >
                  {unreadMessages > 9 ? "9+" : unreadMessages}
                </Typography>
              )}
            </Stack>
          </IconButton>
        </Tooltip>

        {/* Layout Options */}
        <Tooltip title="Change layout">
          <IconButton onClick={handleLayoutMenuOpen} sx={controlButtonStyle}>
            <GridViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* More Options */}
        <Tooltip title="More options">
          <IconButton onClick={handleMoreMenuOpen} sx={controlButtonStyle}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        />

        {/* Leave Meeting */}
        <Tooltip title="Leave meeting">
          <IconButton
            onClick={onLeaveMeeting}
            sx={{
              ...dangerButtonStyle,
              width: 56,
              height: 40,
              borderRadius: 3,
            }}
          >
            <CallEndIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* More Options Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            color: "white",
            backdropFilter: "blur(10px)",
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onToggleRecording();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            {settings.isRecording ? (
              <StopIcon sx={{ color: "error.main" }} />
            ) : (
              <RecordIcon sx={{ color: "error.main" }} />
            )}
          </ListItemIcon>
          <ListItemText>
            {settings.isRecording ? "Stop recording" : "Start recording"}
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <HandIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Raise hand</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <FullscreenIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Fullscreen</ListItemText>
        </MenuItem>

        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }} />

        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
      </Menu>

      {/* Layout Menu */}
      <Menu
        anchorEl={layoutMenuAnchor}
        open={Boolean(layoutMenuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 180,
            color: "white",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            onChangeLayout("grid");
            handleMenuClose();
          }}
          selected={settings.layout === "grid"}
        >
          <ListItemIcon>
            <GridViewIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Grid view</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onChangeLayout("spotlight");
            handleMenuClose();
          }}
          selected={settings.layout === "spotlight"}
        >
          <ListItemIcon>
            <ViewAgendaIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Spotlight</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            onChangeLayout("sidebar");
            handleMenuClose();
          }}
          selected={settings.layout === "sidebar"}
        >
          <ListItemIcon>
            <ViewAgendaIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Sidebar</ListItemText>
        </MenuItem>
      </Menu>

      {/* Recording Indicator */}
      {settings.isRecording && (
        <Box
          sx={{
            px: 2,
            gap: 1,
            py: 0.5,
            top: -40,
            left: "50%",
            color: "white",
            borderRadius: 2,
            display: "flex",
            position: "absolute",
            alignItems: "center",
            transform: "translateX(-50%)",
            backgroundColor: "error.main",
          }}
        >
          <RecordIcon sx={{ fontSize: 16, animation: "pulse 2s infinite" }} />
          <Typography variant="caption" fontWeight={600}>
            Recording
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MeetingControls;
