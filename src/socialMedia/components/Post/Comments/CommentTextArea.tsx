/* eslint-disable no-console */
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { TextField, InputAdornment } from "@mui/material";

const CommentTextArea = ({ type }: { type: string }) => {
  const [textInput, setTextInput] = useState("");

  const handleTextInputAction = () => {
    if (type === "comment") {
      console.log(`Comment Submitted : ${textInput}`);
    } else if (type === "reply") {
      console.log(`Reply Submitted : ${textInput}`);
    }
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      id="comment_input"
      multiline
      maxRows={3}
      value={textInput}
      InputProps={{
        sx: {
          p: 0,
        },
        endAdornment: (
          <InputAdornment
            sx={{ cursor: "pointer" }}
            position="start"
            onClick={handleTextInputAction}
          >
            <SendIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        return setTextInput(e.target.value);
      }}
      placeholder={type === "reply" ? "Add a reply..." : "Add a comment..."}
      sx={{
        width: "100%",
        border: "none",
        outline: "none",
        "& .MuiInputBase-root": {
          fontSize: 12,
        },
        "& .MuiInputBase-root:placeholder": {
          fontSize: 14,
        },
      }}
    />
  );
};

export default CommentTextArea;
