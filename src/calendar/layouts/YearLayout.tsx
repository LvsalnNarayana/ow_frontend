// External
import moment, { type Moment } from "moment";
import React, { useRef, useState, useEffect } from "react";


// MUI
import { type PickersDayProps } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Box, Stack, Paper, Typography } from "@mui/material";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";


// Parent, Sibling, Index
import { generateRecurrency, generateMonthlyRecurrence } from "../../types/event/eventRecurrence.types";

interface YearLayoutProps {
  children?: React.ReactNode;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onYearSelect?: (year: Date) => void;
  events?: Array<{
    id: string;
    startTime: Date;
    endTime: Date;
    color?: string;
  }>;
  minDate?: Date;
  maxDate?: Date;
}

const YearLayout: React.FC<YearLayoutProps> = ({
  minDate,
  maxDate,
  children,
  events = [],
  onDateSelect = () => {},
  onYearSelect = () => {},
  selectedDate = new Date(),
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const currentYearRef = useRef<HTMLDivElement>(null);

  const [currentYear, setCurrentYear] = useState<Moment>(moment(selectedDate));

  const [selectedMonth, setSelectedMonth] = useState<Moment | null>(null);

  console.log(generateRecurrency());
  console.log(generateMonthlyRecurrence())
  
  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [selectedDate]);

  const handleYearChange = (year: Moment | null) => {
    if (year && year.isValid()) {
      setCurrentYear(year);
      onYearSelect(year.toDate());
      setSelectedMonth(null); // Reset month selection when year changes
    }
  };

  const handleMonthSelect = (month: Moment) => {
    setSelectedMonth(month);
  };

  const handleDateSelect = (date: Moment | null) => {
    if (date && date.isValid()) {
      onDateSelect(date.toDate());
    }
  };

  // Generate months for the selected year
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(currentYear.clone().month(i));
  }

  // Check if a date has events
  const hasEvents = (date: Moment) => {
    return events.some((event) => date.isSame(moment(event.startTime), "day"));
  };

  const getEventColor = (date: Moment) => {
    const dayEvents = events.filter((event) =>
      date.isSame(moment(event.startTime), "day")
    );
    return dayEvents.length > 0 ? dayEvents[0].color || "#1976d2" : undefined;
  };

  // Custom Day Component for mini calendars
  const CustomDay = (props: PickersDayProps) => {
    const { outsideCurrentMonth, day, ...other } = props;

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
          onClick={() => handleDateSelect(day)}
          sx={{
            width: "28px",
            height: "28px",
            fontSize: "12px",
            fontWeight: isSelected || isToday ? "bold" : "normal",
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            },
            "&.MuiPickersDay-today": {
              color: "#f44336",
              backgroundColor: "#ffebee",
              border: "2px solid #f44336",
              "&:hover": {
                backgroundColor: "#ffcdd2",
              },
            },
          }}
        />
        {hasEventIndicator && (
          <Box
            sx={{
              width: 4,
              bottom: 2,
              height: 4,
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

  return (
    <Stack
      ref={containerRef}
      width="100%"
      sx={{
        p: 2,
        gap: 3,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Year Header */}
      {/* <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: "text.primary",
            mb: 2,
          }}
        >
          {currentYear.format('YYYY')}
        </Typography>
      </Box> */}

      {/* Year Selector */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 2,
          maxHeight: "300px",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: "center",
            color: "text.primary",
          }}
        >
          Select Year
        </Typography>
        <YearCalendar
          value={currentYear}
          onChange={handleYearChange}
          minDate={minDate ? moment(minDate) : moment().subtract(100, "years")}
          maxDate={maxDate ? moment(maxDate) : moment().add(100, "years")}
          // ref={currentYear.isSame(moment(), "year") ? currentYearRef : null}
          sx={{
            width: "100%",
            height: "250px",
            "& .MuiPickersYear-yearButton": {
              fontWeight: 500,
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "&.Mui-selected": {
                color: "white",
                fontWeight: 700,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              },
            },
          }}
        />
      </Paper>

      {/* Monthly Grid */}
      <Box
        sx={{
          width: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 3,
          display: "grid",
        }}
      >
        {months.map((month, index) => {
          const isCurrentMonth =
            month.isSame(moment(), "month") && month.isSame(moment(), "year");

          const isSelectedMonth =
            selectedMonth && month.isSame(selectedMonth, "month");

          return (
            <Paper
              key={index}
              elevation={isCurrentMonth ? 4 : 2}
              onClick={() => handleMonthSelect(month)}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                border: isCurrentMonth ? "2px solid" : "1px solid",
                borderColor: isCurrentMonth ? "primary.main" : "divider",
                bgcolor: isSelectedMonth ? "primary.light" : "background.paper",
                "&:hover": {
                  boxShadow: 6,
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  textAlign: "center",
                  color: isCurrentMonth ? "primary.main" : "text.primary",
                }}
              >
                {month.format("MMMM")}
              </Typography>

              <DateCalendar
                value={month}
                onChange={() => {}} // Handled by CustomDay onClick
                slots={{
                  day: CustomDay,
                }}
                sx={{
                  width: "100%",
                  "& .MuiDayCalendar-monthContainer": {
                    minHeight: "180px",
                  },
                  "& .MuiPickersCalendarHeader-root": {
                    display: "none", // Hide header since we show month name above
                  },
                  "& .MuiPickersDay-root": {
                    width: "24px",
                    height: "24px",
                    fontSize: "11px",
                  },
                  "& .MuiDayCalendar-header": {
                    "& .MuiTypography-root": {
                      fontWeight: 600,
                      fontSize: "10px",
                      color: "text.secondary",
                    },
                  },
                }}
              />
            </Paper>
          );
        })}
      </Box>

      {/* Children overlay - for events, modals, etc. */}
      {children && (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            position: "absolute",
            pointerEvents: "none",
            "& > *": {
              pointerEvents: "auto",
            },
          }}
        >
          {children}
        </Box>
      )}
    </Stack>
  );
};

export default YearLayout;
