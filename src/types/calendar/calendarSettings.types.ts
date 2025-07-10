import { faker } from "@faker-js/faker";
import {
  generateEventReminderNotificationSettings,
  type EventReminderNotificationSettings,
} from "../event/eventReminderNotificationSettings.types";

export interface CalendarSettings {
  defaultEventDuration: number;
  defaultNotifications: EventReminderNotificationSettings[];
  autoAcceptInvites: boolean;
  defaultVisibility: "public" | "private" | "confidential";
  defaultEventColor: string;
  enableNotifications: boolean;
  defaultEventCategory: string;
  defaultEventReminder: number;
  defaultEventReminderTime: number;
}

export const generateCalendarSettings = (): CalendarSettings => {
  return {
    defaultEventDuration: faker.number.int({ min: 30, max: 180 }),
    defaultNotifications: [generateEventReminderNotificationSettings()],
    autoAcceptInvites: faker.datatype.boolean(),
    defaultVisibility: faker.helpers.arrayElement([
      "public",
      "private",
      "confidential",
    ]),
    defaultEventColor: faker.color.rgb(),
    enableNotifications: faker.datatype.boolean(),
    defaultEventCategory: faker.lorem.word(),
    defaultEventReminder: faker.number.int({ min: 5, max: 120 }),
    defaultEventReminderTime: faker.number.int({ min: 5, max: 60 }),
  };
};
