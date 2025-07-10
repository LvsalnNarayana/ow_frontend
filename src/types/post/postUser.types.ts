import { faker } from "@faker-js/faker";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import type { ReactionType } from "./post.enums";
import { REACTIONS } from "../base/reaction.types";

export interface PostUserInterface extends UserReference {}

export interface PostAuthorInterface extends PostUserInterface {
  is_logged_in_user: boolean;
}

export interface ReactionUserInterface extends PostUserInterface {
  reaction_type: ReactionType;
  reacted_at: string;
}

export interface PostSubscriptionUser extends PostUserInterface {
  subscribed_at: string;
  is_subscribed: boolean;
}

export const generatePostAuthorInterface = (): PostAuthorInterface => {
  return {
    ...generateUserReference(),
    is_logged_in_user: faker.datatype.boolean(),
  };
};
export const generatePostSubscriptionUser = (): PostSubscriptionUser => {
  return {
    ...generatePostUserInterface(),
    subscribed_at: faker.date.recent().toISOString(),
    is_subscribed: faker.datatype.boolean(),
  };
};
export const generatePostUserInterface = (): PostUserInterface => {
  return {
    ...generateUserReference(),
  };
};

export const generateReactionUserInterface = (): ReactionUserInterface => {
  return {
    ...generatePostUserInterface(),
    reaction_type: faker.helpers.arrayElement(REACTIONS),
    reacted_at: faker.date.recent().toISOString(),
  };
};
