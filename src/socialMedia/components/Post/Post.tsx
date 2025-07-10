import { useState } from "react";

import { Stack, Divider, useTheme } from "@mui/material";

import PostMedia from "./PostMedia";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostReactions from "./PostReactions";
import PostDescription from "./PostDescription";
import CommentContainer from "./Comments/CommentContainer";
import type { PostInterface } from "../../../types/post/post.types";

const Post = ({ post }: { post: PostInterface }) => {
  const theme = useTheme();
  const [commentInputField, setCommentInputField] = useState(false);

  return (
    <Stack
      width={"100%"}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
      sx={{
        p: 2,
        boxShadow: theme.shadows[3],
        maxWidth: 500,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <PostHeader post={post} />
      <PostDescription post={post} />
      <PostMedia post={post} />
      <PostReactions post={post} />
      <Divider sx={{ width: "100%" }} />
      <PostActions enableCommentInput={setCommentInputField} />
      <CommentContainer post={post} enableCommentInput={commentInputField} />
    </Stack>
  );
};

export default Post;
