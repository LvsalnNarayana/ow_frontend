/* eslint-disable import/no-extraneous-dependencies */
import { TextField } from "@mui/material";

import type { PostUserInterface } from "../../../types/post/postUser.types";
import { useCreatePostContext } from "../../context/CreatePostContext";

const PostInput = ({ user }: { user: PostUserInterface }) => {
  const {
    actions: { setShowCreatePostDialog, setCreatePostScreen },
  } = useCreatePostContext();

  return (
    <TextField
      size="small"
      id="whats_on_you_mind_input"
      placeholder={`what's on your mind, ${user?.firstName}?`}
      onFocus={() => {
        setShowCreatePostDialog(true);
        setCreatePostScreen("draft");
      }}
      sx={{
        width: "100%",
        border: "none",
        outline: "none",
        "& .MuiInputBase-root": {
          fontSize: "20px",
        },
        "& .MuiInputBase-root:placeholder": {
          fontSize: "20px",
        },
        "& .MuiInputBase-root:focus": {
          border: 0,
          outline: "none",
        },
        "& .MuiInputBase-root:focusVisible": {
          border: 0,
          outline: "none",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 1,
            borderColor: "dodgerblue",
          },
      }}
    />
  );
};

export default PostInput;
