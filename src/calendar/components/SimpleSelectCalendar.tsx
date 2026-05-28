// External
import moment, { type Moment } from "moment";
import React, { useRef, useState } from "react";


// MUI
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { dateCalendarClasses } from "@mui/x-date-pickers/DateCalendar";
import { StaticDatePicker, type PickersDayProps } from "@mui/x-date-pickers";
import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  YearCalendar,
  yearCalendarClasses,
} from "@mui/x-date-pickers/YearCalendar";
import {
  Box,
  Stack,
  Button,
  Popover,
  useTheme,
  IconButton,
} from "@mui/material";

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
  minDate,
  maxDate,
  events = [],
  selectedDate,
  onDateSelect,
  highlightedDates = [],
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
    const { outsideCurrentMonth, day, ...other } = props;

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
            border: isHighlighted
              ? `1px solid ${theme.palette.secondary.main}`
              : undefined,
            "&:hover": {
              backgroundColor: isHighlighted
                ? `${theme.palette.secondary.main}30`
                : theme.palette.action.hover,
            },
            backgroundColor: isHighlighted
              ? theme.palette.secondary.main
              : isToday
              ? `${theme.palette.primary.main}30`
              : undefined,
          }}
        />
        {hasEventIndicator && (
          <Box
            sx={{
              width: 6,
              bottom: 2,
              height: 6,
              zIndex: 1,
              left: "50%",
              borderRadius: "50%",
              position: "absolute",
              backgroundColor: eventColor,
              transform: "translateX(-50%)",
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
          px: 2,
          py: 1,
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "space-between",
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
            minWidth: "auto",
            textTransform: "none",
            color: theme.palette.text.primary,
            fontSize: theme.typography.body1.fontSize,
            fontWeight: theme.typography.fontWeightMedium,
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
              width: "auto",
              maxWidth: "100%",
              mt: 1,
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
          day: CustomDay,
          toolbar: () => null,
          actionBar: () => null,
          calendarHeader: CustomCalendarHeader,
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
        }}
      />
    </Stack>
  );
};

export default SimpleSelectCalendar;
