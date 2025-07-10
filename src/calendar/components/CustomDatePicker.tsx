import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  Popover,
  TextField,
} from "@mui/material";
import { ChevronLeft, ChevronRight, CalendarToday } from "@mui/icons-material";
import moment from "moment";

interface CustomDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label = "Select Date",
  placeholder = "Click to select date",
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentMonth, setCurrentMonth] = useState(moment(value || new Date()));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateClick = (date: moment.Moment) => {
    onChange(date.toDate());
    handleClose();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const renderCalendar = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const startDate = startOfMonth.clone().startOf("week");
    const endDate = endOfMonth.clone().endOf("week");

    const rows = [];
    let days = [];
    let day = startDate.clone();

    while (day.isSameOrBefore(endDate, "day")) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = day.isSame(currentMonth, "month");
        const isSelected = value && day.isSame(moment(value), "day");
        const isToday = day.isSame(moment(), "day");

        days.push(
          <Grid key={day.format("YYYY-MM-DD")}>
            <Button
              variant={isSelected ? "contained" : "text"}
              color={isToday ? "primary" : "inherit"}
              onClick={() => handleDateClick(day.clone())}
              sx={{
                minWidth: 32,
                height: 32,
                borderRadius: "50%",
                opacity: isCurrentMonth ? 1 : 0.3,
                fontSize: "0.875rem",
                fontWeight: isSelected ? "bold" : "normal",
              }}
            >
              {day.date()}
            </Button>
          </Grid>
        );
        day.add(1, "day");
      }
      rows.push(
        <Grid container spacing={0} key={day.format("YYYY-MM-DD")}>
          {days}
        </Grid>
      );
      days = [];
    }

    return rows;
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        value={value ? moment(value).format("MMM DD, YYYY") : ""}
        placeholder={placeholder}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton onClick={handleClick} disabled={disabled}>
              <CalendarToday />
            </IconButton>
          ),
        }}
        disabled={disabled}
        sx={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 2, minWidth: 280 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <IconButton onClick={handlePrevMonth} size="small">
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {currentMonth.format("MMMM YYYY")}
            </Typography>
            <IconButton onClick={handleNextMonth} size="small">
              <ChevronRight />
            </IconButton>
          </Box>
          <Grid container spacing={0} mb={1}>
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <Grid key={day}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ fontWeight: "bold", color: "text.secondary", mb: 1 }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {renderCalendar()}
        </Paper>
      </Popover>
    </Box>
  );
};

export default CustomDatePicker;
