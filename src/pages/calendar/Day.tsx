import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Add } from "@mui/icons-material";
import moment from "moment";
import SimpleSelectCalendar from "../../calendar/components/SimpleSelectCalendar";
import DayHoursLayout from "../../calendar/layouts/DayHoursLayout";
import CalendarHeader from "../../calendar/components/CalendarHeader";
import {
  generateTimeSlots,
  PIXEL_RATIO_CONSTANTS,
} from "../../types/base/hours.types";

const Day: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams<{ year?: string; month?: string; day?: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (params.year && params.month && params.day) {
      const year = parseInt(params.year, 10);
      const month = parseInt(params.month, 10) - 1;
      const day = parseInt(params.day, 10);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const dateFromUrl = new Date(year, month, day);
        if (dateFromUrl.toString() !== "Invalid Date") {
          setSelectedDate(dateFromUrl);
        }
      }
    }
  }, [params.year, params.month, params.day]);

  const updateUrl = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    navigate(`/calendar/day/${year}/${month}/${day}`, { replace: true });
  };

  const handlePrevDay = () => {
    const newDate = moment(selectedDate).subtract(1, "day").toDate();
    setSelectedDate(newDate);
    updateUrl(newDate);
  };

  const handleNextDay = () => {
    const newDate = moment(selectedDate).add(1, "day").toDate();
    setSelectedDate(newDate);
    updateUrl(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    updateUrl(today);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateUrl(date);
  };

  const getCurrentTimeIndicator = () => {
    const now = moment();
    if (!now.isSame(moment(selectedDate), "day")) return null;

    const hours = now.hours();
    const minutes = now.minutes();
    const totalMinutes = hours * 60 + minutes;
    console.log(
      "Hours:",
      hours,
      "Minutes:",
      minutes,
      "Total Minutes:",
      totalMinutes
    );
    console.log(
      PIXEL_RATIO_CONSTANTS.RATIOS["60min"].pixelsPerMinute * totalMinutes
    );

    return (
      <Box
        sx={{
          position: "absolute",
          top: `${
            PIXEL_RATIO_CONSTANTS.RATIOS["60min"].pixelsPerMinute *
              totalMinutes +
            8
          }px`,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: theme.palette.error.main,
          zIndex: 10,
          "&::before": {
            content: '""',
            position: "absolute",
            left: "-6px",
            top: "-5px",
            width: "12px",
            height: "12px",
            backgroundColor: theme.palette.error.main,
            borderRadius: "50%",
          },
        }}
      />
    );
  };

  return (
    <>
      <Stack
        height={"100%"}
        width={"100%"}
        flexDirection={"row"}
        sx={{
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            width: 320,
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {/* Header */}
          <Stack
            gap={2}
            sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={2}
            >
              <IconButton
                onClick={() => {
                  navigate(`/calendar`);
                }}
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                <ArrowBackIcon
                  sx={{
                    fontSize: 20,
                  }}
                />
              </IconButton>
              <Typography variant="h3" fontWeight="bold">
                Calendar
              </Typography>
            </Stack>
            <Button
              variant="contained"
              startIcon={<Add />}
              fullWidth
              sx={{ mb: 2, borderRadius: 20 }}
            >
              Create Event
            </Button>
          </Stack>

          <Box sx={{ px: 2, py: 1 }}>
            <SimpleSelectCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateChange}
            />
          </Box>
        </Stack>

        <Stack
          height={"100%"}
          width={"100%"}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <CalendarHeader
            type="day"
            dayProps={{
              selectedDate,
              handleNextDay,
              handlePrevDay,
              handleTodayClick,
            }}
          />

          {/* Time Grid */}
          <Stack
            width={"100%"}
            sx={{
              flex: 1,
              minHeight: 0,
            }}
          >
            <Stack
              p={2}
              width={"100%"}
              sx={{
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
                position: "relative",
              }}
            >
              <DayHoursLayout
                slots={generateTimeSlots({
                  interval: 60,
                })}
              >
                {getCurrentTimeIndicator()}
              </DayHoursLayout>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Day;
