import { faker } from "@faker-js/faker";
import type { EventStatus } from "./event.types";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import {
  generateEventInteractions,
  type EventInteraction,
} from "./eventInteraction.types";

import {
  generateEventReminderNotificationSettings,
  type EventReminderNotificationSettings,
} from "./eventReminderNotificationSettings.types";

export interface EventGuest extends UserReference {
  status: EventStatus;
  userId: string;
  isOptional?: boolean;
  isOrganizer: boolean;
  responseTime: string;
  interactions: EventInteraction[];
  reminders: EventReminderNotificationSettings[];
}

export const generateEventGuest = (): EventGuest => {
  return {
    ...generateUserReference(),
    userId: faker.string.uuid(),
    status: faker.helpers.arrayElement([
      "tentative",
      "confirmed",
      "cancelled",
      "draft",
    ]),
    isOptional: faker.datatype.boolean(),
    isOrganizer: false,
    responseTime: faker.date.recent().toISOString(),
    interactions: [generateEventInteractions()],
    reminders: [generateEventReminderNotificationSettings()],
  };
};
