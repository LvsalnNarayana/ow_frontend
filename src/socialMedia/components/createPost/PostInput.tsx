/* eslint-disable import/no-extraneous-dependencies */
// MUI
import { TextField } from "@mui/material";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";


// Parent, Sibling, Index
import type { PostUserInterface } from "../../../types/post/postUser.types";

const PostInput = ({ user }: { user: PostUserInterface }) => {
  const {
    actions: { setCreatePostScreen, setShowCreatePostDialog },
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
