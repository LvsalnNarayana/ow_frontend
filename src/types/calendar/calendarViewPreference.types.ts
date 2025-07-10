import type { CalendarViewType } from "./calendarViewType.types";

// User's calendar view preferences
export interface CalendarViewPreferences {
  defaultView: CalendarViewType;
  compactMode: boolean;
  showAllDayEvents: boolean;
  showEventDetails: boolean;
  colorBy: "calendar" | "category" | "priority" | "status";
  timeSlotDuration: 15 | 30 | 60; // minutes
  dayStartHour: number;
  dayEndHour: number;
  showTimeZone: boolean;
  showWeatherInfo: boolean;
  showLunarCalendar: boolean;
}

// Default calendar view preferences
export const defaultCalendarViewPreferences: CalendarViewPreferences = {
  defaultView: "month",
  compactMode: false,
  showAllDayEvents: true,
  showEventDetails: true,
  colorBy: "calendar",
  timeSlotDuration: 30,
  dayStartHour: 12,
  dayEndHour: 12,
  showTimeZone: true,
  showWeatherInfo: true,
  showLunarCalendar: false,
};
