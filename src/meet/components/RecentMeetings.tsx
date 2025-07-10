import React from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
} from "@mui/material";
import type { MeetingRoom } from "../../types/meet/meeting.types";
import moment from "moment";

interface RecentMeetingsProps {
  meetings: MeetingRoom[];
  onJoinMeeting: (roomId: string) => void;
}

const RecentMeetings: React.FC<RecentMeetingsProps> = ({
  meetings,
  onJoinMeeting,
}) => {
  if (meetings.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2} width="100%">
      <Typography variant="h6" fontWeight={600}>
        Recent Meetings
      </Typography>

      <Stack spacing={1} maxHeight={200} sx={{ overflowY: "auto" }}>
        {meetings.map((meeting) => (
          <Card
            key={meeting.id}
            variant="outlined"
            sx={{
              "&:hover": {
                boxShadow: 2,
                transform: "translateY(-1px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <CardActionArea onClick={() => onJoinMeeting(meeting.id)}>
              <CardContent sx={{ py: 1.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography variant="body2" fontWeight={500}>
                      {meeting.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {moment(meeting.createdAt).fromNow()}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={`${meeting.participants} participants`}
                      size="small"
                      variant="outlined"
                    />
                    {meeting.isActive && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "success.main",
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default RecentMeetings;
