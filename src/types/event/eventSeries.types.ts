import { faker } from "@faker-js/faker";
import type { BaseEntity } from "../base/base.types";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import type { Event } from "./event.types";
import { generateRecurrency, type Recurrence } from "./eventRecurrence.types";

// Event series for managing recurring events

export interface EventSeries extends BaseEntity {
  title: string;
  description?: string;
  recurrence: Recurrence;
  events: Event[];
  createdBy: UserReference;
  isActive: boolean;
}

export const generateEventSeries = () => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    recurrence: generateRecurrency(),
    events: [],
    createdBy: generateUserReference(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
};
