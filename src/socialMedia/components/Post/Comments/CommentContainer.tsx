import { Stack } from "@mui/material";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import type { PostInterface } from "../../../../types/post/post.types";

const CommentContainer = ({
  post,
  enableCommentInput,
}: {
  post: PostInterface;
  enableCommentInput: boolean;
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      {enableCommentInput && <CommentInput type="comment" />}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
        sx={{ my: 2, width: "100%" }}
      >
        {post?.comments?.items?.map((comment, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <Comment key={index} comment={comment} />;
        })}
      </Stack>
    </Stack>
  );
};

export default CommentContainer;
