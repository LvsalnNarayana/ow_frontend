import React, { useEffect, useRef } from "react";
import { Stack, Box, Typography, Divider } from "@mui/material";
import moment from "moment";

// Weather icons mapping
const weatherIcons = {
  sunny: "☀️",
  cloudy: "☁️",
  rainy: "🌧️",
  stormy: "⛈️",
  snowy: "❄️",
  foggy: "🌫️",
  windy: "💨",
  partlyCloudy: "⛅",
} as const;

type WeatherType = keyof typeof weatherIcons;

interface WeatherData {
  date: string;
  type: WeatherType;
  temp: number;
}

interface MonthLayoutProps {
  children?: React.ReactNode;
  selectedDate?: Date;
}

// Mock weather data generator for 10 days forecast
const generateWeatherForecast = (): WeatherData[] => {
  const forecast: WeatherData[] = [];
  const today = moment();

  const weatherTypes: WeatherType[] = [
    "sunny",
    "cloudy",
    "rainy",
    "stormy",
    "snowy",
    "foggy",
    "windy",
    "partlyCloudy",
  ];

  for (let i = 0; i < 10; i++) {
    const date = today.clone().add(i, "days");
    forecast.push({
      date: date.format("YYYY-MM-DD"),
      type: weatherTypes[Math.floor(Math.random() * weatherTypes.length)],
      temp: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
    });
  }

  return forecast;
};

const MonthLayout: React.FC<MonthLayoutProps> = ({
  children,
  selectedDate = new Date(),
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWeekRef = useRef<HTMLDivElement>(null);

  // Generate weather forecast for 10 days
  const weatherForecast = generateWeatherForecast();

  useEffect(() => {
    if (currentWeekRef.current) {
      currentWeekRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedDate]);

  // Get the start of the month and create calendar grid
  const startOfMonth = moment(selectedDate).startOf("month");
  const endOfMonth = moment(selectedDate).endOf("month");
  const startOfCalendar = startOfMonth.clone().startOf("week");
  const endOfCalendar = endOfMonth.clone().endOf("week");

  // Generate all days for the calendar grid
  const calendarDays = [];
  const current = startOfCalendar.clone();

  while (current.isSameOrBefore(endOfCalendar)) {
    calendarDays.push(current.clone());
    current.add(1, "day");
  }

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Days of week headers
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Check if current week contains today
  const isCurrentWeek = (week: moment.Moment[]) => {
    const today = moment();
    return week.some((day) => day.isSame(today, "day"));
  };

  // Get weather data for a specific date
  const getWeatherForDate = (date: moment.Moment): WeatherData | null => {
    const dateStr = date.format("YYYY-MM-DD");
    return weatherForecast.find((weather) => weather.date === dateStr) || null;
  };

  // Check if date is within 10 days from today
  const isWithinForecastRange = (date: moment.Moment): boolean => {
    const today = moment();
    const daysDiff = date.diff(today, "days");
    return daysDiff >= 0 && daysDiff < 10;
  };

  return (
    <Stack
      ref={containerRef}
      width="100%"
      flexGrow={1}
      flex={1}
      sx={{
        // height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        bgcolor: "background.paper",
      }}
    >
      {/* Days of week header */}
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
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            sx={{
              flex: 1,
              p: 1,
              textAlign: "center",
              borderRight: 1,
              borderColor: "divider",
              "&:last-child": {
                borderRight: 0,
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "12px",
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Calendar grid */}
      <Stack sx={{ flex: 1 }}>
        {weeks.map((week, weekIndex) => {
          const isCurrentWeekRow = isCurrentWeek(week);

          return (
            <Stack
              key={weekIndex}
              direction="row"
              ref={isCurrentWeekRow ? currentWeekRef : null}
              sx={{
                flex: 1,
                minHeight: "120px",
                borderBottom: 1,
                borderColor: "divider",
                "&:last-child": {
                  borderBottom: 0,
                },
              }}
            >
              {week.map((day, dayIndex) => {
                const isToday = day.isSame(moment(), "day");
                const isCurrentMonth = day.isSame(
                  moment(selectedDate),
                  "month"
                );
                const isSelected = day.isSame(moment(selectedDate), "day");
                const weatherData = getWeatherForDate(day);
                const showWeather = isWithinForecastRange(day) && weatherData;

                return (
                  <Box
                    key={day.format("YYYY-MM-DD")}
                    onClick={(event) => {
                      // Similar click handling as DayHoursLayout
                      const target = event.currentTarget;
                      const rect = target.getBoundingClientRect();
                      const yPosition = event.clientY - rect.top;

                      // You can add event creation logic here
                      console.log(
                        "Clicked on:",
                        day.format("YYYY-MM-DD"),
                        "at position:",
                        yPosition
                      );
                    }}
                    sx={{
                      flex: 1,
                      minHeight: "120px",
                      borderRight: 1,
                      borderColor: "divider",
                      position: "relative",
                      cursor: "pointer",
                      userSelect: "none",
                      bgcolor: isCurrentMonth
                        ? "background.paper"
                        : "action.hover",
                      "&:hover": {
                        bgcolor: isCurrentMonth
                          ? "action.hover"
                          : "action.selected",
                      },
                      "&:last-child": {
                        borderRight: 0,
                      },
                    }}
                  >
                    {/* Date number and weather container */}
                    <Box
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      {/* Date number */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight:
                            isToday || isSelected
                              ? 700
                              : isCurrentMonth
                              ? 600
                              : 400,
                          fontSize: "14px",
                          color: isToday
                            ? "white"
                            : isCurrentMonth
                            ? "text.primary"
                            : "text.disabled",
                          bgcolor: isToday ? "primary.main" : "transparent",
                          borderRadius: isToday ? "50%" : 0,
                          width: isToday ? "24px" : "auto",
                          height: isToday ? "24px" : "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "24px",
                        }}
                      >
                        {day.format("D")}
                      </Typography>

                      {/* Weather icon and temperature */}
                      {showWeather && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "16px",
                              lineHeight: 1,
                            }}
                          >
                            {weatherIcons[weatherData.type]}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "10px",
                              color: "text.secondary",
                              fontWeight: 500,
                            }}
                          >
                            {weatherData.temp}°
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Events container - where children/events will be rendered */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: showWeather ? "40px" : "32px", // Adjust top position if weather is shown
                        left: "4px",
                        right: "4px",
                        bottom: "4px",
                        overflow: "hidden",
                      }}
                    >
                      {/* This is where events for this specific day would be rendered */}
                    </Box>
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
            top: 0,
            left: 0,
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

export default MonthLayout;
