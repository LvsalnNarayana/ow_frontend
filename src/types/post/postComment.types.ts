import { faker } from "@faker-js/faker";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import {
  generatePostCommentReply,
  type PostCommentReply,
} from "./postCommentReply.types";
import {
  generatePostUserInterface,
  type PostUserInterface,
} from "./postUser.types";
import { generateReactionData, type ReactionData } from "./reactionData.types";

export interface PostComment extends BaseEntity {
  content: string;
  commented_at: string;
  user: PostUserInterface;
  mentions: PostUserInterface[];
  reactions: ReactionData;
  replies: {
    items: PostCommentReply[];
    total_count: number;
    has_more: boolean;
  };
  is_edited: boolean;
  edited_at?: string;
  status: {
    is_deleted: boolean;
    is_reported: boolean;
    is_hidden: boolean;
    is_pinned: boolean;
  };
}

export const generatePostComment = (): PostComment => {
  return {
    ...generateBaseEntity(),
    content: faker.lorem.sentence(),
    commented_at: faker.date.recent().toISOString(),
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
    replies: {
      items: Array.from(
        { length: faker.number.int({ min: 0, max: 10 }) },
        () => ({
          ...generatePostCommentReply(),
        })
      ),
      total_count: faker.number.int({ min: 0, max: 100 }),
      has_more: faker.datatype.boolean(),
    },
    is_edited: faker.datatype.boolean(),
    edited_at: faker.date.recent().toISOString(),
    status: {
      is_deleted: faker.datatype.boolean(),
      is_reported: faker.datatype.boolean(),
      is_hidden: faker.datatype.boolean(),
      is_pinned: faker.datatype.boolean(),
    },
  };
};
