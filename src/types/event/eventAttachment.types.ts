import { faker } from "@faker-js/faker";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";

// Enhanced attachment interface

export interface EventAttachment {
  id: string;
  name: string;
  url: string;
  type: "file" | "image" | "document";
  size?: number; // in bytes
  mimeType?: string;
  uploadedBy: UserReference;
  uploadedAt: string;
}

export const generateEventAttachment = (): EventAttachment => {
  return {
    id: faker.string.uuid(),
    name: faker.system.fileName(),
    url: faker.internet.url(),
    type: faker.helpers.arrayElement(["file", "image", "document"]),
    size: faker.number.int({ min: 100, max: 1000000 }),
    mimeType: faker.system.mimeType(),
    uploadedBy: generateUserReference(),
    uploadedAt: faker.date.past().toISOString(),
  };
};
