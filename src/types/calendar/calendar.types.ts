import { faker } from "@faker-js/faker";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import {
  generateCalendarSettings,
  type CalendarSettings,
} from "./calendarSettings.types";

// Calendar interface

export interface Calendar {
  id: string;
  name: string;
  description?: string;
  color: string;
  owner: UserReference;
  isDefault: boolean;
  isVisible: boolean;
  timezone: string;
  // Settings
  settings: CalendarSettings;

  // Metadata
  createdAt: string;
  updatedAt: string;
  totalEventCount: number;

  // Sharing
  isShared: boolean;
  isPublic: boolean;
  shareUrl?: string;
}

export const generateCalendar = (): Calendar => {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    color: faker.internet.color(),
    owner: generateUserReference(),
    isDefault: faker.datatype.boolean(),
    isVisible: faker.datatype.boolean(),
    timezone: faker.location.timeZone(),
    settings: generateCalendarSettings(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
    totalEventCount: faker.number.int({ min: 0, max: 100 }),
    isShared: faker.datatype.boolean(),
    isPublic: faker.datatype.boolean(),
    shareUrl: faker.internet.url(),
  };
};
