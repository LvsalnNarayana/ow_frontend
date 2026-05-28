// External
import moment from "moment";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";


// MUI
import {
  Box,
  Chip,
  Stack,
  Paper,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Settings,
  Add as AddIcon,
  Event as EventIcon,
  Today as TodayIcon,
  Schedule as ScheduleIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";


// Parent, Sibling, Index
import EventCard from "../../calendar/components/EventCard";
import DayHoursLayout from "../../calendar/layouts/DayHoursLayout";
import { type Event, generateEvent } from "../../types/event/event.types";
import {
  generateTimeSlots,
  PIXEL_RATIO_CONSTANTS,
} from "../../types/base/hours.types";

const mockTodayEvents: Event[] = Array.from({ length: 2 }, generateEvent);

const mockUpcomingEvents: Event[] = Array.from({ length: 2 }, generateEvent);

const CalendarDashboard: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimePosition = () => {
    const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);

    const hoursDiff = currentTime.getHours() - threeHoursAgo.getHours();

    const minutesDiff = currentTime.getMinutes() - threeHoursAgo.getMinutes();

    const totalMinutes = hoursDiff * 60 + minutesDiff;

    const adjustedTotalMinutes = Math.max(0, totalMinutes);

    console.log("Total Minutes from past three hours:", adjustedTotalMinutes);

    return PIXEL_RATIO_CONSTANTS.RATIOS["15min"].pixelsPerMinute * totalMinutes;
  };

  const timelinePosition = getCurrentTimePosition();

  const TimelineView: React.FC = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        minHeight: 400,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ mb: 3, display: "flex", alignItems: "center" }}
      >
        <ScheduleIcon />
        Today's Timeline
      </Typography>

      <Box sx={{ position: "relative" }}>
        <DayHoursLayout
          slots={generateTimeSlots({
            interval: 15,
            startHour: new Date().getHours() - 3,
            endHour:
              new Date().getHours() > 20 ? 24 : new Date().getHours() + 3,
          })}
        />
        {timelinePosition !== null && (
          <>
            <Box
              sx={{
                left: 0,
                right: 0,
                height: 2,
                zIndex: 10,
                position: "absolute",
                top: `${getCurrentTimePosition() + 8}PX`,
                backgroundColor: theme.palette.error.main,
                "&::before": {
                  width: 10,
                  top: -4,
                  left: -4,
                  height: 10,
                  content: '""',
                  borderRadius: "50%",
                  position: "absolute",
                  backgroundColor: theme.palette.error.main,
                },
              }}
            />
          </>
        )}
      </Box>
    </Paper>
  );

  return (
    <Stack
      direction="column"
      spacing={3}
      flexGrow={1}
      sx={{
        width: "100%",
        maxWidth: 1200,
        p: 3,
        mx: "auto",
        height: "100%",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Stack>
          <Typography variant="h4" fontWeight={700}>
            Calendar Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {new Date().toLocaleDateString([], {
              month: "long",
              day: "numeric",
              weekday: "long",
              year: "numeric",
            })}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              navigate("/calendar/settings");
            }}
            variant="contained"
            startIcon={
              <Settings
                sx={{
                  fontSize: 18,
                }}
              />
            }
          >
            Settings
          </Button>
          <Button
            variant="contained"
            startIcon={
              <AddIcon
                sx={{
                  fontSize: 18,
                }}
              />
            }
          >
            New Event
          </Button>
        </Stack>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => console.log("Create meeting")}
          >
            Schedule Meeting
          </Button>
          <Button
            variant="outlined"
            startIcon={<EventIcon />}
            onClick={() => {
              navigate(
                `/calendar/day/${new Date().getFullYear()}/${
                  new Date().getMonth() + 1
                }/${new Date().getDate()}`
              );
            }}
          >
            Full Calendar View
          </Button>
          <Button
            variant="outlined"
            startIcon={<ScheduleIcon />}
            onClick={() => {
              navigate(
                `/calendar/week/${new Date().getFullYear()}/${moment().week()}`
              );
            }}
          >
            Weekly Schedule
          </Button>
        </Stack>
      </Paper>
      {/* Main Content */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={3}
        sx={{ flex: 1 }}
      >
        {/* Left Column - Events */}
        <Stack spacing={3} sx={{ flex: isMobile ? 1 : 0.4 }}>
          {/* Today's Events */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ gap: 1, display: "flex", alignItems: "center" }}
              >
                <TodayIcon />
                Today's Events
              </Typography>
              <Chip
                size="small"
                label={mockTodayEvents.length}
                color="primary"
              />
            </Stack>

            {mockTodayEvents.length > 0 ? (
              <Stack spacing={1}>
                {mockTodayEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </Stack>
            ) : (
              <Box
                sx={{
                  py: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <EventIcon sx={{ mb: 1, fontSize: 48, opacity: 0.5 }} />
                <Typography variant="body2">
                  No events scheduled for today
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Upcoming Events */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{ gap: 1, display: "flex", alignItems: "center" }}
              >
                <NavigateNextIcon />
                Upcoming Events
              </Typography>
              <Button size="small" endIcon={<NavigateNextIcon />}>
                View All
              </Button>
            </Stack>

            {mockUpcomingEvents.length > 0 ? (
              <Stack spacing={1}>
                {mockUpcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} showDate />
                ))}
              </Stack>
            ) : (
              <Box
                sx={{
                  py: 4,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <EventIcon sx={{ mb: 1, fontSize: 48, opacity: 0.5 }} />
                <Typography variant="body2">No upcoming events</Typography>
              </Box>
            )}
          </Paper>
        </Stack>

        {/* Right Column - Timeline */}
        <Stack sx={{ flex: isMobile ? 1 : 0.6 }}>
          <TimelineView />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CalendarDashboard;
