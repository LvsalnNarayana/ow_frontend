// External
import React from "react";
import moment from "moment";


// MUI
import { Box, Stack, Tooltip, Typography, IconButton } from "@mui/material";
import {
  Info as InfoIcon,
  ContentCopy as CopyIcon,
  // Security as SecurityIcon,
} from "@mui/icons-material";


// Parent, Sibling, Index
import type { MeetingInfo } from "../../types/meet/meeting.types";

interface MeetingHeaderProps {
  meetingInfo: MeetingInfo;
  roomId: string;
  isRecording: boolean;
  onCopyRoomId: () => void;
  onShowInfo: () => void;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  roomId,
  onShowInfo,
  meetingInfo,
  isRecording,
  onCopyRoomId,
}) => {
  const getDuration = () => {
    const duration = moment().diff(meetingInfo.startTime);
    return moment.utc(duration).format("HH:mm:ss");
  };

  return (
    <Box
      sx={{
        pt: 1,
        pl: 3,
        pr: 7,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        position: "absolute",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h6" color="white" fontWeight={600}>
            {meetingInfo.title}
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            {getDuration()}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {isRecording && (
            <Box
              sx={{
                px: 2,
                gap: 1,
                py: 0.5,
                color: "white",
                display: "flex",
                borderRadius: 2,
                alignItems: "center",
                backgroundColor: "error.main",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  animation: "pulse 2s infinite",
                }}
              />
              <Typography variant="caption" fontWeight={600}>
                REC
              </Typography>
            </Box>
          )}

          <Tooltip title="Copy room ID">
            <IconButton
              onClick={onCopyRoomId}
              size="small"
              sx={{ color: "white" }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Meeting info">
            <IconButton
              onClick={onShowInfo}
              size="small"
              sx={{ color: "white" }}
            >
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Room: {roomId}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MeetingHeader;
