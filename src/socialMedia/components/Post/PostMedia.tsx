// Parent, Sibling, Index
import type { PostInterface } from "../../../types/post/post.types";

const PostMedia = (_props: { post: PostInterface }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 250,
        backgroundColor: "gray.900",
      }}
    />
  );
};

export default PostMedia;
