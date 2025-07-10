import { faker } from "@faker-js/faker";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import type { Coordinates } from "../place/place.types";

export interface Sessions extends BaseEntity {
  sessionId: string;
  device: string;
  ipAddress: string;
  lastActive: string;
  location: Coordinates;
  isCurrent: boolean;
}

export const generateSession = (): Sessions => {
  return {
    ...generateBaseEntity(),
    sessionId: faker.string.uuid(),
    device: faker.internet.userAgent(),
    ipAddress: faker.internet.ip(),
    lastActive: faker.date.past().toISOString(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      accuracy: faker.number.int({ min: 1, max: 100 }),
    },
    isCurrent: faker.datatype.boolean(),
  };
};
