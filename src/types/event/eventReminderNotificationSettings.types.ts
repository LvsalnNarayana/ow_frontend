import type { EventReminderNotificationType } from "./event.types";
import { faker } from "@faker-js/faker";

export interface EventReminderNotificationSettings {
  id: string;
  type: EventReminderNotificationType;
  timeBeforeEvent: number;
  isEnabled: boolean;
  customMessage?: string;
  recurring?: boolean;
}

export const generateEventReminderNotificationSettings =
  (): EventReminderNotificationSettings => {
    return {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement([
        "email",
        "push",
        "sms",
      ]) as EventReminderNotificationType,
      timeBeforeEvent: faker.number.int({ min: 5, max: 60 }),
      isEnabled: faker.datatype.boolean(),
      customMessage: faker.helpers.maybe(() => faker.lorem.sentence()),
      recurring: faker.datatype.boolean(),
    };
  };
