import { faker } from "@faker-js/faker";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import { generateStoryUserInterface, type StoryUserInterface } from "./storyUser.types";

export interface Story extends BaseEntity {
  user: StoryUserInterface;
  mediaUrl: string;
  mediaType: "image" | "video";
  timestamp: Date;
  duration: number; // in seconds
  isViewed?: boolean;
}

export const generateStory = (): Story => {
  return {
    ...generateBaseEntity(),
    user: generateStoryUserInterface(),
    mediaUrl: faker.image.url(),
    mediaType: "image",
    timestamp: faker.date.recent(),
    duration: faker.number.int({ min: 5, max: 30 }),
    isViewed: faker.datatype.boolean(),
  };
};
