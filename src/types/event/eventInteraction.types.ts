import { faker } from "@faker-js/faker";

// // User's event interaction history
export interface EventInteraction {
  eventId: string;
  userId: string;
  action:
    | "created"
    | "updated"
    | "deleted"
    | "accepted"
    | "declined"
    | "viewed"
    | "joined";
  timestamp: string;
  details?: Record<string, any>;
}

export const generateEventInteractions = (): EventInteraction => {
  return {
    eventId: faker.string.uuid(),
    userId: faker.string.uuid(),
    action: faker.helpers.arrayElement([
      "created",
      "updated",
      "deleted",
      "accepted",
      "declined",
      "viewed",
      "joined",
    ]),
    timestamp: faker.date.recent().toISOString(),
    details: {
      // Add any additional details specific to the action
    },
  };
};
