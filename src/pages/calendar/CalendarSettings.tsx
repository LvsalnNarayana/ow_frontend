import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { TIMEZONE_OPTIONS } from "../../types/base/timezones.types";
import { generateEventReminderNotificationSettings } from "../../types/event/eventReminderNotificationSettings.types";
import type { CalendarSettings } from "../../types/calendar/calendarSettings.types";
import type { CalendarPreferences } from "../../types/calendar/calendarPreference.types";
import type { DayOfWeek } from "../../types/base/dayOfWeek.types";
import TextInput from "../../shared/inputs/TextInput";
import SelectInput from "../../shared/inputs/SelectInput";

// Default values for settings and preferences
const defaultSettings: CalendarSettings = {
  defaultEventDuration: 30,
  defaultNotifications: [generateEventReminderNotificationSettings()],
  autoAcceptInvites: false,
  defaultVisibility: "private",
  defaultEventColor: "#1976d2",
  enableNotifications: true,
  defaultEventCategory: "Meeting",
  defaultEventReminder: 15,
  defaultEventReminderTime: 15,
};

const defaultPreferences: CalendarPreferences = {
  defaultTimezone: TIMEZONE_OPTIONS[0],
  weekStartsOn: "SUN",
  timeFormat: "12h",
  dateFormat: "MM/DD/YYYY",
  workingHours: {
    start: "09:00",
    end: "17:00",
    days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  },
  showDeclinedEvents: false,
  enableSmartSuggestions: true,
  enableConflictDetection: true,
};

const CalendarSettings: React.FC = () => {
  const [settings, setSettings] = useState<CalendarSettings>(defaultSettings);
  const [preferences, setPreferences] =
    useState<CalendarPreferences>(defaultPreferences);

  // Handle input changes for settings
  const handleSettingsChange = (field: keyof CalendarSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Handle input changes for preferences
  const handlePreferencesChange = (
    field: keyof CalendarPreferences,
    value: any
  ) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  // Handle working hours time changes
  const handleWorkingHoursChange = (field: "start" | "end", value: string) => {
    setPreferences((prev) => ({
      ...prev,
      workingHours: { ...prev.workingHours, [field]: value },
    }));
  };

  // Handle working days toggle
  const handleWorkingDaysChange = (day: DayOfWeek) => {
    setPreferences((prev) => {
      const currentDays = prev.workingHours.days;
      const newDays = currentDays.includes(day)
        ? currentDays.filter((d) => d !== day)
        : [...currentDays, day];
      return {
        ...prev,
        workingHours: { ...prev.workingHours, days: newDays },
      };
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically save settings to a backend
    console.log("Saving settings:", settings, preferences);
    // Add API call or state management logic here
  };

  return (
    <Stack spacing={4} width={"50%"} mx="auto">
      <TextInput
        name="default_event_duration"
        label="Default Event Duration (minutes)"
        type="number"
        value={settings.defaultEventDuration}
        onChange={(eventDurationValue) =>
          handleSettingsChange(
            "defaultEventDuration",
            parseInt(eventDurationValue as string)
          )
        }
      />
      <SelectInput
        name="default_visibility"
        label="Default Visibility"
        options={[
          { value: "public", label: "Public" },
          { value: "private", label: "Private" },
          { value: "confidential", label: "Confidential" },
        ]}
        value={settings.defaultVisibility}
        onChange={(defaultVisibilityValue) =>
          handleSettingsChange("defaultVisibility", defaultVisibilityValue)
        }
      />

      <TextField
        label="Default Event Color"
        type="color"
        value={settings.defaultEventColor}
        onChange={(e) =>
          handleSettingsChange("defaultEventColor", e.target.value)
        }
        className="w-full"
      />

      <TextInput
        name="default_event_category"
        label="Default Event Category"
        value={settings.defaultEventCategory}
        onChange={(defaultEventCategoryValue) =>
          handleSettingsChange(
            "defaultEventCategory",
            defaultEventCategoryValue
          )
        }
      />

      <FormControlLabel
        control={
          <Switch
            checked={settings.autoAcceptInvites}
            onChange={(e) =>
              handleSettingsChange("autoAcceptInvites", e.target.checked)
            }
          />
        }
        label="Auto-accept Invites"
      />

      <FormControlLabel
        control={
          <Switch
            checked={settings.enableNotifications}
            onChange={(e) =>
              handleSettingsChange("enableNotifications", e.target.checked)
            }
          />
        }
        label="Enable Notifications"
      />

      <FormControl fullWidth>
        <InputLabel>Default Timezone</InputLabel>
        <Select
          value={preferences.defaultTimezone}
          onChange={(e) =>
            handlePreferencesChange("defaultTimezone", e.target.value)
          }
        >
          <MenuItem value="UTC">UTC</MenuItem>
          <MenuItem value="America/New_York">America/New_York</MenuItem>
          <MenuItem value="Europe/London">Europe/London</MenuItem>
          <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Week Starts On</InputLabel>
        <Select
          value={preferences.weekStartsOn}
          onChange={(e) =>
            handlePreferencesChange("weekStartsOn", e.target.value)
          }
        >
          <MenuItem value="SUN">Sunday</MenuItem>
          <MenuItem value="MON">Monday</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Time Format</InputLabel>
        <Select
          value={preferences.timeFormat}
          onChange={(e) =>
            handlePreferencesChange("timeFormat", e.target.value)
          }
        >
          <MenuItem value="12h">12-hour</MenuItem>
          <MenuItem value="24h">24-hour</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Date Format</InputLabel>
        <Select
          value={preferences.dateFormat}
          onChange={(e) =>
            handlePreferencesChange("dateFormat", e.target.value)
          }
        >
          <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
          <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
          <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Working Hours Start"
          type="time"
          value={preferences.workingHours.start}
          onChange={(e) => handleWorkingHoursChange("start", e.target.value)}
          className="w-1/2"
        />
        <TextField
          label="Working Hours End"
          type="time"
          value={preferences.workingHours.end}
          onChange={(e) => handleWorkingHoursChange("end", e.target.value)}
          className="w-1/2"
        />
      </Stack>

      <Box>
        <Typography variant="subtitle1">Working Days</Typography>
        <Stack direction="row" spacing={1} className="mt-2">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
            <Chip
              key={day}
              label={day}
              color={
                preferences.workingHours.days.includes(day as DayOfWeek)
                  ? "primary"
                  : "default"
              }
              onClick={() => handleWorkingDaysChange(day as DayOfWeek)}
              clickable
            />
          ))}
        </Stack>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={preferences.showDeclinedEvents}
            onChange={(e) =>
              handlePreferencesChange("showDeclinedEvents", e.target.checked)
            }
          />
        }
        label="Show Declined Events"
      />

      <FormControlLabel
        control={
          <Switch
            checked={preferences.enableSmartSuggestions}
            onChange={(e) =>
              handlePreferencesChange(
                "enableSmartSuggestions",
                e.target.checked
              )
            }
          />
        }
        label="Enable Smart Suggestions"
      />

      <FormControlLabel
        control={
          <Switch
            checked={preferences.enableConflictDetection}
            onChange={(e) =>
              handlePreferencesChange(
                "enableConflictDetection",
                e.target.checked
              )
            }
          />
        }
        label="Enable Conflict Detection"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="mt-4"
      >
        Save Settings
      </Button>
    </Stack>
  );
};

export default CalendarSettings;
