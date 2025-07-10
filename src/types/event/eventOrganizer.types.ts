import { generateEventGuest, type EventGuest } from "./eventGuest.types";
// Event organizer with enhanced details

export interface EventOrganizer extends Omit<EventGuest, "responseTime"> {}

export const generateEventOrganizer = (): EventOrganizer => {
  const { responseTime, ...guest } = generateEventGuest();
  return {
    ...guest,
  };
};
