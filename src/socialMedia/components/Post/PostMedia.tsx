import type { PostInterface } from "../../../types/post/post.types";

const PostMedia = ({ post }: { post: PostInterface }) => {
  return (
    <div
      style={{
        height: 250,
        width: "100%",
        backgroundColor: "gray.900",
      }}
    />
  );
};

export default PostMedia;
