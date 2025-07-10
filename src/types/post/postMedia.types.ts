import { faker } from "@faker-js/faker";

export interface PostMedia {
  id: string;
  url: string;
  thumbnail_url?: string;
  metadata: {
    filename: string;
    size: number;
    duration?: number;
    dimensions?: { width: number; height: number };
    format: string;
  };
  alt_text?: string;
  is_processed: boolean;
}

export const generatePostMedia = (): PostMedia => {
  return {
    id: faker.string.uuid(),
    url: faker.image.url(),
    thumbnail_url: faker.image.url(),
    metadata: {
      filename: faker.system.fileName(),
      size: faker.number.int({ min: 1000, max: 1000000 }),
      duration: faker.number.int({ min: 10, max: 60 }),
      dimensions: {
        width: faker.number.int({ min: 100, max: 1000 }),
        height: faker.number.int({ min: 100, max: 1000 }),
      },
      format: faker.system.fileType(),
    },
    alt_text: faker.lorem.sentence(),
    is_processed: faker.datatype.boolean(),
  };
};
