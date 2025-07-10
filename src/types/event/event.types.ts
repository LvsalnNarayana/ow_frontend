import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";
import { generatePlace, type Place } from "../place/place.types";
import {
  generateEventAnalytics,
  type EventAnalytics,
} from "./eventAnalytics.types";
import {
  generateEventAttachment,
  type EventAttachment,
} from "./eventAttachment.types";
import { generateEventGuest, type EventGuest } from "./eventGuest.types";
import {
  generateEventGuestPermissions,
  type EventGuestPermissions,
} from "./eventGuestPermissions.types";
import {
  generateEventReminderNotificationSettings,
  type EventReminderNotificationSettings,
} from "./eventReminderNotificationSettings.types";
import {
  generateEventOrganizer,
  type EventOrganizer,
} from "./eventOrganizer.types";
import { generateRecurrency, type Recurrence } from "./eventRecurrence.types";
import {
  TIMEZONE_OPTIONS,
  type TimezoneOptions,
} from "../base/timezones.types";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import { faker } from "@faker-js/faker";

export type EventStatus = "tentative" | "confirmed" | "cancelled" | "draft";

export const EVENT_STATUS_OPTIONS: EventStatus[] = [
  "tentative",
  "confirmed",
  "cancelled",
  "draft",
];

export type EventPriority = "low" | "normal" | "high" | "urgent";
export const EVENT_PRIORITY_OPTIONS: EventPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
];

export type EventType =
  | "meeting"
  | "appointment"
  | "reminder"
  | "task"
  | "birthday"
  | "holiday"
  | "personal"
  | "work"
  | "travel"
  | "health"
  | "education"
  | "social"
  | "custom";
export const EVENT_TYPE_OPTIONS: EventType[] = [
  "meeting",
  "appointment",
  "reminder",
  "task",
  "birthday",
  "holiday",
  "personal",
  "work",
  "travel",
  "health",
  "education",
  "social",
  "custom",
];

export type EventReminderNotificationType =
  | "email"
  | "sms"
  | "push"
  | "desktop";

export const EVENT_REMINDER_NOTIFICATION_TYPE_OPTIONS: EventReminderNotificationType[] =
  ["email", "sms", "push", "desktop"];

export interface Event extends BaseEntity {
  eventId: string;
  title: string;
  description?: string;

  startTime: string;
  endTime: string;
  timezone: TimezoneOptions;
  isAllDay?: boolean;

  status: {
    isOpen: boolean;
    isCompleted: boolean;
    isCancelled: boolean;
    isDeleted: boolean;
    isArchived: boolean;
    isPrivate: boolean;
    isShared: boolean;
    isPublished: boolean;
    isDraft: boolean;
    isScheduled: boolean;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
    isTomorrow: boolean;
    isThisWeek: boolean;
    isThisMonth: boolean;
    isThisYear: boolean;
  };
  visibility: Visibility;
  priority?: EventPriority;
  eventType: EventType;

  recurrence?: Recurrence;
  seriesId?: string;
  isRecurring?: boolean;

  location?: Place;
  isOnline?: boolean;

  organizer: EventOrganizer;
  guests: EventGuest[];
  guestCount: number;
  maxAttendees?: number;

  guestPermissions: EventGuestPermissions;
  attachments?: EventAttachment[];
  reminders: EventReminderNotificationSettings[];

  eventColor: string;
  categories: string[];
  tags?: string[];

  analytics?: EventAnalytics;
  customFields?: Record<string, any>;
  lastModifiedBy: UserReference;
}

export const generateEvent = (): Event => {
  return {
    ...generateBaseEntity(),
    visibility: faker.helpers.arrayElement(
      VISIBILITY_OPTIONS?.map((option) => option.value)
    ) as Visibility,
    eventId: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    startTime: new Date(
      new Date().setHours(
        faker?.number?.int({
          min: 9,
          max: 18,
        })
      )
    ).toISOString(),
    endTime: new Date(
      new Date().setHours(
        faker?.number?.int({
          min: 9,
          max: 18,
        })
      )
    ).toISOString(),
    timezone: faker.helpers.arrayElement(TIMEZONE_OPTIONS),
    isAllDay: faker.datatype.boolean(),
    status: {
      isOpen: faker.datatype.boolean(),
      isCompleted: faker.datatype.boolean(),
      isCancelled: faker.datatype.boolean(),
      isDeleted: faker.datatype.boolean(),
      isArchived: faker.datatype.boolean(),
      isPrivate: faker.datatype.boolean(),
      isShared: faker.datatype.boolean(),
      isPublished: faker.datatype.boolean(),
      isDraft: faker.datatype.boolean(),
      isScheduled: faker.datatype.boolean(),
      isPast: faker.datatype.boolean(),
      isFuture: faker.datatype.boolean(),
      isToday: faker.datatype.boolean(),
      isTomorrow: faker.datatype.boolean(),
      isThisWeek: faker.datatype.boolean(),
      isThisMonth: faker.datatype.boolean(),
      isThisYear: faker.datatype.boolean(),
    },
    priority: faker.helpers.arrayElement(EVENT_PRIORITY_OPTIONS),
    eventType: faker.helpers.arrayElement(EVENT_TYPE_OPTIONS),
    recurrence: generateRecurrency(),
    seriesId: faker.string.uuid(),
    isRecurring: faker.datatype.boolean(),
    location: generatePlace(),
    isOnline: faker.datatype.boolean(),
    organizer: generateEventOrganizer(),
    guests: [generateEventGuest()],
    guestCount: faker.number.int({
      min: 1,
      max: 10,
    }),
    maxAttendees: faker.number.int({
      min: 1,
      max: 10,
    }),
    guestPermissions: generateEventGuestPermissions(),
    attachments: [generateEventAttachment()],
    reminders: [generateEventReminderNotificationSettings()],
    eventColor: faker.color.rgb(),
    categories: [faker.lorem.word()],
    tags: [faker.lorem.word()],
    analytics: generateEventAnalytics(),
    customFields: {},
    lastModifiedBy: generateUserReference(),
  };
};
