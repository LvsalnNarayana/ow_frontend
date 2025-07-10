import React, { useState, useEffect } from "react";
import {
  Stack,
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Today as TodayIcon,
  NavigateNext as NavigateNextIcon,
  Settings,
} from "@mui/icons-material";
import { generateEvent, type Event } from "../../types/event/event.types";
import EventCard from "../../calendar/components/EventCard";
import { useNavigate } from "react-router";
import moment from "moment";
import DayHoursLayout from "../../calendar/layouts/DayHoursLayout";
import {
  generateTimeSlots,
  PIXEL_RATIO_CONSTANTS,
} from "../../types/base/hours.types";

const mockTodayEvents: Event[] = Array.from({ length: 5 }, generateEvent);

const mockUpcomingEvents: Event[] = Array.from({ length: 5 }, generateEvent);

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
    const currentTime = new Date();
    const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);

    const hoursDiff = currentTime.getHours() - threeHoursAgo.getHours();
    const minutesDiff = currentTime.getMinutes() - threeHoursAgo.getMinutes();
    const totalMinutes = hoursDiff * 60 + minutesDiff;

    const adjustedTotalMinutes = Math.max(0, totalMinutes);

    console.log("Total Minutes from past three hours:", adjustedTotalMinutes);

    return PIXEL_RATIO_CONSTANTS.RATIOS["15min"].pixelsPerMinute * totalMinutes;
  };

  console.log(getCurrentTimePosition());

  const timelinePosition = getCurrentTimePosition();

  const TimelineView: React.FC = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        minHeight: 400,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 3 }}
      >
        <ScheduleIcon />
        Today's Timeline
      </Typography>

      <Box sx={{ position: "relative" }}>
        <DayHoursLayout
          slots={generateTimeSlots({
            startHour: new Date().getHours() - 3,
            endHour: new Date().getHours() + 3,
            interval: 15,
          })}
        />
        {timelinePosition !== null && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: `${getCurrentTimePosition() + 8}PX`,
                left: 0,
                right: 0,
                height: 2,
                backgroundColor: theme.palette.error.main,
                zIndex: 10,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: -4,
                  top: -4,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
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
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        maxWidth: 1200,
        mx: "auto",
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
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
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
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
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
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
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
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                  textAlign: "center",
                  py: 4,
                  color: "text.secondary",
                }}
              >
                <EventIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
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
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
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
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                  textAlign: "center",
                  py: 4,
                  color: "text.secondary",
                }}
              >
                <EventIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
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
