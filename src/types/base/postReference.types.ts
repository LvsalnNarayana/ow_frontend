import type { PostAuthorInterface } from "../post/postUser.types";

export interface PostReference {
  postId: string;
  author: PostAuthorInterface;
}
