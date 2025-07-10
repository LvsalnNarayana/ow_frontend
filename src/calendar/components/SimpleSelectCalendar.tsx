import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  Popover,
  Stack,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { dateCalendarClasses } from "@mui/x-date-pickers/DateCalendar";
import {
  YearCalendar,
  yearCalendarClasses,
} from "@mui/x-date-pickers/YearCalendar";
import moment, { type Moment } from "moment";
import { type PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

interface SimpleSelectCalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  highlightedDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  events?: Array<{
    id: string;
    startTime: Date;
    endTime: Date;
    color?: string;
  }>;
}

const SimpleSelectCalendar: React.FC<SimpleSelectCalendarProps> = ({
  selectedDate,
  onDateSelect,
  highlightedDates = [],
  minDate,
  maxDate,
  events = [],
}) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState<Moment>(
    moment(selectedDate || new Date())
  );
  const yearButtonRef = useRef<HTMLButtonElement>(null);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleDateChange = (date: Moment | null) => {
    if (date && date.isValid()) {
      setCurrentDate(date);
      onDateSelect(date.toDate());
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handleYearPickerClose = () => {
    setShowYearPicker(false);
  };

  const handleYearChange = (year: Moment | null) => {
    if (year && year.isValid()) {
      const newDate = currentDate.clone().year(year.year());
      setCurrentDate(newDate);
      handleYearPickerClose();
    }
  };

  const isDateHighlighted = (date: Moment) => {
    return highlightedDates.some((highlightedDate) =>
      date.isSame(moment(highlightedDate), "day")
    );
  };

  const hasEvents = (date: Moment) => {
    return events.some((event) => date.isSame(moment(event.startTime), "day"));
  };

  const getEventColor = (date: Moment) => {
    const dayEvents = events.filter((event) =>
      date.isSame(moment(event.startTime), "day")
    );
    return dayEvents.length > 0
      ? dayEvents[0].color || theme.palette.primary.main
      : undefined;
  };

  // Custom Day Component
  const CustomDay = (props: PickersDayProps) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const isHighlighted = isDateHighlighted(day);
    const hasEventIndicator = hasEvents(day);
    const eventColor = getEventColor(day);
    const isToday = day.isSame(moment(), "day");
    const isSelected = selectedDate && day.isSame(moment(selectedDate), "day");

    return (
      <Box sx={{ position: "relative" }}>
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          sx={{
            fontWeight: isSelected || isToday ? "bold" : "normal",
            backgroundColor: isHighlighted
              ? theme.palette.secondary.main
              : isToday
              ? `${theme.palette.primary.main}30`
              : undefined,
            border: isHighlighted
              ? `1px solid ${theme.palette.secondary.main}`
              : undefined,
            "&:hover": {
              backgroundColor: isHighlighted
                ? `${theme.palette.secondary.main}30`
                : theme.palette.action.hover,
            },
          }}
        />
        {hasEventIndicator && (
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              left: "50%",
              transform: "translateX(-50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: eventColor,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    );
  };

  // Custom Calendar Header
  const CustomCalendarHeader = () => {
    const handleYearPickerOpen = () => {
      setShowYearPicker(true);
    };

    return (
      <Box
        width="100%"
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton
          onClick={handlePrevMonth}
          size="small"
          sx={{
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: `${theme.palette.primary.main}10`,
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Button
          ref={yearButtonRef}
          variant="text"
          onClick={handleYearPickerOpen}
          sx={{
            fontSize: theme.typography.body1.fontSize,
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightMedium,
            textTransform: "none",
            minWidth: "auto",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          endIcon={<KeyboardArrowDown />}
        >
          {currentDate.format("MMMM YYYY")}
        </Button>

        <IconButton
          onClick={handleNextMonth}
          size="small"
          sx={{
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: `${theme.palette.primary.main}10`,
            },
          }}
        >
          <ChevronRight />
        </IconButton>

        <Popover
          disableAutoFocus
          disablePortal
          open={showYearPicker && Boolean(yearButtonRef.current)}
          onClose={handleYearPickerClose}
          anchorEl={yearButtonRef.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1,
              width: "auto",
              maxWidth: "100%",
              border: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <YearCalendar
            value={currentDate}
            onChange={handleYearChange}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
            sx={{
              [`& .${yearCalendarClasses.button}`]: {
                fontSize: theme.typography.h6.fontSize,
              },
            }}
          />
        </Popover>
      </Box>
    );
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <StaticDatePicker
        value={moment(selectedDate)}
        defaultValue={moment()}
        onChange={handleDateChange}
        onMonthChange={(date) => {
          setCurrentDate(moment(date));
          setShowYearPicker(false);
          onDateSelect(date.toDate());
        }}
        onYearChange={(date) => {
          setCurrentDate(moment(date));
          setShowYearPicker(false);
          onDateSelect(date.toDate());
        }}
        minDate={minDate ? moment(minDate) : undefined}
        maxDate={maxDate ? moment(maxDate) : undefined}
        slots={{
          layout: ({ children }) => (
            <Stack
              spacing={2}
              sx={{
                [`& .${dateCalendarClasses.root}`]: {
                  width: "100%",
                  minWidth: "100%",
                },
              }}
            >
              {children}
            </Stack>
          ),
          calendarHeader: CustomCalendarHeader,
          actionBar: () => null,
          toolbar: () => null,
          day: CustomDay,
        }}
      />
    </Stack>
  );
};

export default SimpleSelectCalendar;
