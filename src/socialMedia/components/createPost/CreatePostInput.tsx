 
/* eslint-disable import/no-extraneous-dependencies */
 
// MUI
import { TextField } from "@mui/material";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";


// Parent, Sibling, Index
import { generateUser } from "../../../types/user/user.types";

const CreatePostInput = () => {
  const {
    actions: { setText },
    data: {
      content: { text },
    },
  } = useCreatePostContext();

  return (
    <TextField
      multiline
      rows={6}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      sx={{
        width: "100%",
        border: "none",
        outline: "none",
        "& .MuiInputBase-root": {
          fontSize: "14px",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "16px",
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
      placeholder={`What's on your mind? ${generateUser()?.firstName} ${generateUser()?.lastName}!!`}
    />
  );
};

export default CreatePostInput;
