import { faker } from "@faker-js/faker";
import type { ReactionType } from "./post.enums";
import {
  generateReactionUserInterface,
  type ReactionUserInterface,
} from "./postUser.types";
import { REACTIONS } from "../base/reaction.types";

export interface ReactionData {
  has_reacted: boolean;
  user_reaction_type?: ReactionType | null;
  user_reacted_at?: string;
  total_count: number;
  reaction_counts: Record<ReactionType, number>;
  recent_reactions: ReactionUserInterface[];
  has_more_reactions: boolean;
}

export const generateReactionData = (): ReactionData => {
  return {
    has_reacted: faker.datatype.boolean(),
    user_reaction_type: faker.helpers.arrayElement(REACTIONS),
    user_reacted_at: faker.date.recent().toISOString(),
    total_count: faker.number.int({ min: 0, max: 100 }),
    reaction_counts: REACTIONS.reduce(
      (acc, reaction) => ({
        ...acc,
        [reaction]: faker.number.int({ min: 0, max: 100 }),
      }),
      {} as Record<ReactionType, number>
    ),
    recent_reactions: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      generateReactionUserInterface
    ),
    has_more_reactions: faker.datatype.boolean(),
  };
};
