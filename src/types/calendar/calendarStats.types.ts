// User's calendar statistics
import { faker } from "@faker-js/faker";

export interface CalendarStats {
  totalEvents: number;
  upcomingEvents: number;
  eventsThisWeek: number;
  eventsThisMonth: number;
  meetingHoursThisWeek: number;
  averageMeetingDuration: number;
  mostActiveDay: string;
  mostActiveHour: number;
  responseRate: {
    accepted: number;
    declined: number;
    tentative: number;
  };
}

export const generateCalendarStats = (): CalendarStats => {
  return {
    totalEvents: faker.number.int({ min: 0, max: 100 }),
    upcomingEvents: faker.number.int({ min: 0, max: 10 }),
    eventsThisWeek: faker.number.int({ min: 0, max: 10 }),
    eventsThisMonth: faker.number.int({ min: 0, max: 10 }),
    meetingHoursThisWeek: faker.number.int({ min: 0, max: 10 }),
    averageMeetingDuration: faker.number.int({ min: 30, max: 180 }),
    mostActiveDay: faker.date.weekday(),
    mostActiveHour: faker.number.int({ min: 0, max: 23 }),
    responseRate: {
      accepted: faker.number.int({ min: 0, max: 100 }),
      declined: faker.number.int({ min: 0, max: 100 }),
      tentative: faker.number.int({ min: 0, max: 100 }),
    },
  };
};
