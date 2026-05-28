// import { hours } from "../../types/base/hours.types";
// External
import moment from "moment";
import React, { useRef, useEffect } from "react";


// MUI
import { Box, Stack, Divider, Typography } from "@mui/material";


// Parent, Sibling, Index
import { generateTimeSlots } from "../../types/base/hours.types";

interface WeekLayoutProps {
  children?: React.ReactNode;
  selectedDate?: Date;
}

const WeekLayout: React.FC<WeekLayoutProps> = ({ 
  children, 
  selectedDate = new Date() 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const nineAmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nineAmRef.current) {
      nineAmRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedDate]);

  // Get the start and end of the week
  const startOfWeek = moment(selectedDate).startOf('week');

  const weekDays: moment.Moment[] = [];
  
  // Generate 7 days of the week
  for (let i = 0; i < 7; i++) {
    weekDays.push(startOfWeek.clone().add(i, 'days'));
  }

  return (
    <Stack
      ref={containerRef}
      width="100%"
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Week header with dates */}
      <Stack
        direction="row"
        sx={{
          top: 0,
          zIndex: 2,
          borderBottom: 1,
          position: "sticky",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {/* Time column header */}
        <Box
          sx={{
            width: "80px",
            p: 1,
            borderRight: 1,
            display: "flex",
            alignItems: "center",
            borderColor: "divider",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "10px",
              color: "text.secondary",
            }}
          >
            GMT+5
          </Typography>
        </Box>

        {/* Day headers */}
        {weekDays.map((day, index) => {
          const isToday = day.isSame(moment(), 'day');

          const isSelected = day.isSame(moment(selectedDate), 'day');

          return (
            <Box
              key={day.format('YYYY-MM-DD')}
              sx={{
                p: 1,
                flex: 1,
                textAlign: "center",
                borderColor: "divider",
                borderRight: index < 6 ? 1 : 0,
                bgcolor: isSelected ? "primary.light" : "transparent",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  fontSize: "10px",
                  color: "text.secondary",
                  textTransform: "uppercase",
                }}
              >
                {day.format('ddd')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  minWidth: "28px",
                  width: isToday ? "28px" : "auto",
                  mx: "auto",
                  display: "flex",
                  fontSize: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: isToday ? "50%" : 0,
                  height: isToday ? "28px" : "auto",
                  fontWeight: isToday || isSelected ? 700 : 600,
                  color: isToday ? "primary.main" : "text.primary",
                  bgcolor: isToday ? "primary.main" : "transparent",
                }}
              >
                {day.format('D')}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Time grid with week columns */}
      <Stack sx={{ flex: 1 }}>
        {generateTimeSlots().map((timeSlot, hourIndex) => {
          const isNineAm = timeSlot?.label === "9 AM";

          return (
            <Stack
              key={hourIndex}
              direction="row"
              ref={isNineAm ? nineAmRef : null}
              sx={{
                borderBottom: 1,
                minHeight: "48px",
                borderColor: "divider",
                "&:last-child": {
                  borderBottom: 0,
                },
              }}
            >
              {/* Time label */}
              <Box
                sx={{
                  width: "80px",
                  p: 1,
                  borderRight: 1,
                  display: "flex",
                  borderColor: "divider",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  bgcolor: "background.default",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mt: -0.5,
                    fontWeight: 600,
                    fontSize: "10px",
                    color: "text.secondary",
                  }}
                >
                  {timeSlot?.label}
                </Typography>
              </Box>

              {/* Week day columns */}
              {weekDays.map((day, dayIndex) => {
                const isToday = day.isSame(moment(), 'day');

                return (
                  <Box
                    key={`${day.format('YYYY-MM-DD')}-${timeSlot?.label}`}
                    onClick={(event) => {
                      const target = event.currentTarget;

                      const rect = target.getBoundingClientRect();

                      const yPosition = event.clientY - rect.top;
                      let hourInt = parseInt(timeSlot?.label.split(" ")[0], 10);

                      if (timeSlot?.label?.split(" ")[1].toLowerCase() === "pm" && hourInt !== 12) {
                        hourInt += 12;
                      } else if (timeSlot?.label?.split(" ")[1].toLowerCase() === "am" && hourInt === 12) {
                        hourInt = 0;
                      }

                      let startMinutes = 0;
                      if (yPosition < 12) {
                        startMinutes = 0;
                      } else if (yPosition < 24) {
                        startMinutes = 15;
                      } else if (yPosition < 36) {
                        startMinutes = 30;
                      } else if (yPosition < 48) {
                        startMinutes = 45;
                      }

                      console.log('Clicked on:', day.format('YYYY-MM-DD'), 'at', hourInt, ':', startMinutes);
                    }}
                    sx={{
                      flex: 1,
                      minHeight: "48px",
                      cursor: "pointer",
                      userSelect: "none",
                      position: "relative",
                      borderColor: "divider",
                      borderRight: dayIndex < 6 ? 1 : 0,
                      bgcolor: isToday ? "primary.light" : "transparent",
                      "&:hover": {
                        opacity: 0.8,
                        bgcolor: isToday ? "primary.main" : "action.hover",
                      },
                    }}
                  >
                    {/* Half-hour divider */}
                    <Divider
                      sx={{
                        left: 0,
                        right: 0,
                        top: "24px",
                        opacity: 0.3,
                        position: "absolute",
                        borderColor: "divider",
                      }}
                    />

                    {/* Quarter-hour guides (subtle) */}
                    <Box
                      sx={{
                        left: 0,
                        right: 0,
                        top: "12px",
                        opacity: 0.1,
                        height: "1px",
                        bgcolor: "divider",
                        position: "absolute",
                      }}
                    />
                    <Box
                      sx={{
                        left: 0,
                        right: 0,
                        top: "36px",
                        opacity: 0.1,
                        height: "1px",
                        bgcolor: "divider",
                        position: "absolute",
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          );
        })}
      </Stack>

      {/* Children overlay - for events, modals, etc. */}
      {children && (
        <Box
          sx={{
            right: 0,
            bottom: 0,
            zIndex: 1,
            top: "60px", // Account for header height
            left: "80px", // Account for time column
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

export default WeekLayout;
