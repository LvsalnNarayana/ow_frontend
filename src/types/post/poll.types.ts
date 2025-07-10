import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import type { PostUserInterface } from "./postUser.types";
import { faker } from "@faker-js/faker";

export interface PollOption {
  id: string;
  text: string;
  vote_count: number;
  voters: PostUserInterface[];
  user_voted: boolean;
}

export interface PollData extends BaseEntity {
  question: string;
  options: PollOption[];
  total_votes: number;
  allow_multiple: boolean;
  expires_at?: string;
  is_expired: boolean;
  user_has_voted: boolean;
}
export const generatePollOption = (): PollOption => {
  return {
    id: faker.string.uuid(),
    text: faker.lorem.sentence(),
    vote_count: faker.number.int({ min: 0, max: 100 }),
    voters: [],
    user_voted: false,
  };
};

export const generatePoll = (): PollData => {
  return {
    ...generateBaseEntity(),
    question: faker.lorem.sentence(),
    options: Array.from(
      { length: faker.number.int({ min: 2, max: 5 }) },
      generatePollOption
    ),
    total_votes: faker.number.int({ min: 0, max: 100 }),
    allow_multiple: faker.datatype.boolean(),
    expires_at: faker.date.future().toISOString(),
    is_expired: faker.datatype.boolean(),
    user_has_voted: faker.datatype.boolean(),
  };
};
