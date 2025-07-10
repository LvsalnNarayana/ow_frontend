import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";
import moment from "moment";
import SelectInput from "../../shared/inputs/SelectInput";
import { useState } from "react";
import { CALENDAR_VIEW_TYPE_OPTIONS } from "../../types/calendar/calendarViewType.types";

const MonthCalendarHeader = () => {
  return <div>MonthCalendarHeader</div>;
};

const WeekCalendarHeader = () => {
  return <div>WeekCalendarHeader</div>;
};

const DayCalendarHeader = ({
  selectedDate,
  handlePrevDay,
  handleNextDay,
  handleTodayClick,
}: {
  selectedDate: Date;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  handleTodayClick: () => void;
}) => {
  const theme = useTheme();
  const [calendarType, setCalendarType] = useState("day");
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        p: 2,
        pr: 6,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        flexShrink: 0, // Prevent header from shrinking
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={handlePrevDay}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" minWidth={250} textAlign={"center"}>
          {moment(selectedDate).format("dddd, MMMM D, YYYY")}
        </Typography>
        <IconButton onClick={handleNextDay}>
          <ChevronRight />
        </IconButton>
      </Box>
      <Stack
        direction={"row"}
        width={"fit-content"}
        alignItems={"center"}
        gap={2}
        justifyContent={"flex-end"}
      >
        <SelectInput
          name="calendarTypeSelector"
          value={calendarType}
          onChange={(newCalendarTypeValue) =>
            setCalendarType(newCalendarTypeValue as string)
          }
          options={CALENDAR_VIEW_TYPE_OPTIONS?.map((option) => ({
            value: option.value as string,
            label: option.label as string,
          }))}
        />
        <Button
          sx={{
            flexShrink: 0,
          }}
          variant="contained"
          startIcon={
            <Today
              sx={{
                fontSize: 18,
              }}
            />
          }
          onClick={handleTodayClick}
        >
          Today
        </Button>
      </Stack>
    </Stack>
  );
};

const CalendarHeader = ({
  type,
  dayProps,
}: {
  type: "day" | "week" | "month";
  dayProps: {
    selectedDate: Date;
    handlePrevDay: () => void;
    handleNextDay: () => void;
    handleTodayClick: () => void;
  };
}) => {
  return {
    day: <DayCalendarHeader {...dayProps} />,
    week: <WeekCalendarHeader />,
    month: <MonthCalendarHeader />,
  }[type];
};

export default CalendarHeader;
