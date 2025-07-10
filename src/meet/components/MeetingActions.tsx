import React, { useState } from "react";
import {
  Stack,
  Button,
  Divider,
  Alert,
  Collapse,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  VideoCall as VideoCallIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import TextInput from "../../shared/inputs/TextInput";

interface MeetingActionsProps {
  roomId: string;
  isCreatingMeeting: boolean;
  isJoiningMeeting: boolean;
  error: string | null;
  onCreateMeeting: () => void;
  onJoinMeeting: (roomId: string) => void;
  onRoomIdChange: (roomId: string) => void;
  onClearError: () => void;
}

const MeetingActions: React.FC<MeetingActionsProps> = ({
  roomId,
  isCreatingMeeting,
  isJoiningMeeting,
  error,
  onCreateMeeting,
  onJoinMeeting,
  onRoomIdChange,
  onClearError,
}) => {
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleJoinClick = () => {
    if (showJoinForm && roomId.trim()) {
      onJoinMeeting(roomId);
    } else {
      setShowJoinForm(true);
    }
  };

  const handleRoomIdChange = (value: string) => {
    onRoomIdChange(value);
    if (error) onClearError();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && roomId.trim()) {
      onJoinMeeting(roomId);
    }
  };

  return (
    <Stack spacing={2} width="100%">
      <Collapse in={!!error}>
        <Alert severity="error" onClose={onClearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Button
        variant="contained"
        size="large"
        startIcon={
          isCreatingMeeting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <VideoCallIcon />
          )
        }
        onClick={onCreateMeeting}
        disabled={isCreatingMeeting || isJoiningMeeting}
        sx={{
          py: 1.5,
          fontWeight: 600,
          fontSize: "16px",
        }}
      >
        {isCreatingMeeting ? "Creating Meeting..." : "Create New Meeting"}
      </Button>

      <Divider>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
      </Divider>

      <Stack spacing={showJoinForm ? 2 : 0}>
        <Collapse in={showJoinForm}>
          <TextInput
            value={roomId}
            onChange={(meetingRoomIdValue) =>
              handleRoomIdChange(meetingRoomIdValue as string)
            }
            onKeyPress={handleKeyPress}
            name="meeting_room_id_input"
            label="Meeting Room ID"
            placeholder="Enter Meeting Room ID (e.g., room_123456)"
            disabled={isJoiningMeeting}
            autoFocus={showJoinForm}
          />
        </Collapse>
        <Button
          variant="outlined"
          size="large"
          startIcon={
            isJoiningMeeting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <LoginIcon />
            )
          }
          onClick={handleJoinClick}
          disabled={
            isCreatingMeeting ||
            isJoiningMeeting ||
            (showJoinForm && !roomId.trim())
          }
          sx={{
            py: 1.5,
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          {isJoiningMeeting
            ? "Joining Meeting..."
            : showJoinForm
            ? "Join Meeting"
            : "Join Existing Meeting"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default MeetingActions;
