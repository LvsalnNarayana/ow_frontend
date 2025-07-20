import React, { useEffect, useRef } from "react";
import { Stack, Box, Typography, Divider } from "@mui/material";
// import { hours } from "../../types/base/hours.types";
import moment from "moment";
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
  const weekDays = [];
  
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
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {/* Time column header */}
        <Box
          sx={{
            width: "80px",
            p: 1,
            borderRight: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "10px",
              fontWeight: 600,
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
                flex: 1,
                p: 1,
                textAlign: "center",
                borderRight: index < 6 ? 1 : 0,
                borderColor: "divider",
                bgcolor: isSelected ? "primary.light" : "transparent",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                {day.format('ddd')}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: isToday || isSelected ? 700 : 600,
                  fontSize: "16px",
                  color: isToday ? "primary.main" : "text.primary",
                  bgcolor: isToday ? "primary.main" : "transparent",
                  borderRadius: isToday ? "50%" : 0,
                  width: isToday ? "28px" : "auto",
                  height: isToday ? "28px" : "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  minWidth: "28px",
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
                minHeight: "48px",
                borderBottom: 1,
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
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  bgcolor: "background.default",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "text.secondary",
                    mt: -0.5,
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
                      borderRight: dayIndex < 6 ? 1 : 0,
                      borderColor: "divider",
                      position: "relative",
                      cursor: "pointer",
                      userSelect: "none",
                      bgcolor: isToday ? "primary.light" : "transparent",
                      "&:hover": {
                        bgcolor: isToday ? "primary.main" : "action.hover",
                        opacity: 0.8,
                      },
                    }}
                  >
                    {/* Half-hour divider */}
                    <Divider
                      sx={{
                        position: "absolute",
                        top: "24px",
                        left: 0,
                        right: 0,
                        borderColor: "divider",
                        opacity: 0.3,
                      }}
                    />

                    {/* Quarter-hour guides (subtle) */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "12px",
                        left: 0,
                        right: 0,
                        height: "1px",
                        bgcolor: "divider",
                        opacity: 0.1,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "36px",
                        left: 0,
                        right: 0,
                        height: "1px",
                        bgcolor: "divider",
                        opacity: 0.1,
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
            position: "absolute",
            top: "60px", // Account for header height
            left: "80px", // Account for time column
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 1,
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
