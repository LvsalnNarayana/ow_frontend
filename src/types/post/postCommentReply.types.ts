import { faker } from "@faker-js/faker";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import {
  generatePostUserInterface,
  type PostUserInterface,
} from "./postUser.types";
import { generateReactionData, type ReactionData } from "./reactionData.types";

export interface PostCommentReply extends BaseEntity {
  content: string;
  replied_at: string;
  user: PostUserInterface;
  mentions: PostUserInterface[];
  reactions: ReactionData;
  is_edited: boolean;
  edited_at?: string;
  status: { is_deleted: boolean; is_reported: boolean; is_hidden: boolean };
}

export const generatePostCommentReply = (): PostCommentReply => {
  return {
    ...generateBaseEntity(),
    content: faker.lorem.sentence(),
    replied_at: faker.date.recent().toISOString(),
    user: {
      ...generatePostUserInterface(),
    },
    mentions: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () =>
        ({
          ...generatePostUserInterface(),
        } as PostUserInterface)
    ),
    reactions: generateReactionData(),
    is_edited: faker.datatype.boolean(),
    edited_at: faker.date.recent().toISOString(),
    status: {
      is_deleted: faker.datatype.boolean(),
      is_reported: faker.datatype.boolean(),
      is_hidden: faker.datatype.boolean(),
    },
  };
};
