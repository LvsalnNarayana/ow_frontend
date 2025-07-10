import React from "react";
import {
  Stack,
  useTheme,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import moment from "moment";
import type { Event } from "../../types/event/event.types";
const formatDate = (date: Date) => {
  return date.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
const EventCard: React.FC<{ event: Event; showDate?: boolean }> = ({
  event,
  showDate = false,
}) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        mb: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `4px solid ${
          event?.eventColor || theme.palette.primary.main
        }`,
        "&:hover": {
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack flex={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              {event.title}
            </Typography>
            {event.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {event.description}
              </Typography>
            )}
            <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {showDate &&
                  `${formatDate(moment(event.startTime).toDate())} • `}
                {formatDate(moment(event.startTime).toDate())} -{" "}
                {formatDate(moment(event.endTime).toDate())}
              </Typography>
            </Stack>
            {event.location && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                📍 {event.location.name}
              </Typography>
            )}
          </Stack>
          <Chip
            size="small"
            label={
              event.isAllDay
                ? "All Day"
                : `${Math.round(
                    // (moment(event.endTime) - event.startTime.getTime()) /
                    (new Date(event.endTime).getTime() -
                      new Date(event.startTime).getTime()) /
                      (1000 * 60)
                  )}m`
            }
            sx={{
              backgroundColor: `${event.eventColor}20`,
              color: event.eventColor,
              fontWeight: 500,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventCard;
