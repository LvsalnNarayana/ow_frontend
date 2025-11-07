 
/* eslint-disable import/no-extraneous-dependencies */
 
// External
import { useState, useEffect } from "react";


// MUI
import { TextField } from "@mui/material";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";
import { generateUser } from "../../../types/user/user.types";

const CreatePostInput = () => {
  const {
    actions: { setText },
    data: {
      content: { text },
    },
  } = useCreatePostContext();

  const [mentions, setMentions] = useState<string[]>([]);

  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    const extractEntities = (text: string) => {
      const mentionRegex = /@\w+/g;

      const hashtagRegex = /#\w+/g;

      const mentionsArray = text.match(mentionRegex) || [];

      const hashtagsArray = text.match(hashtagRegex) || [];

      setMentions(mentionsArray);
      setHashtags(hashtagsArray);
    };

    if (text) {
      extractEntities(text);
    }
  }, [text]);

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
