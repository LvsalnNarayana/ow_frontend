import { faker } from "@faker-js/faker";
import {
  generatePostAuthorInterface,
  type PostAuthorInterface,
} from "../post/postUser.types";

export interface PostReference {
  postId: string;
  author: PostAuthorInterface;
}

export const generatePostReference = () => {
  return {
    postId: faker.string.uuid(),
    author: generatePostAuthorInterface(),
  };
};
