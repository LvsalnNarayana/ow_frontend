/* eslint-disable multiline-ternary */

import { Close } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography, IconButton, useTheme } from "@mui/material";
import type { PostScreen } from "../../../types/createPost/createPost.types";

const CreatePostHeader = ({
  createPostScreen,
  setCreatePostScreen,
  setCreatePostDialogOpen,
}: {
  createPostScreen: PostScreen;
  setCreatePostScreen: (screen: PostScreen) => void;
  setCreatePostDialogOpen: (open: boolean) => void;
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1.5, px: 2, width: "100%" }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={0.5}
      >
        {createPostScreen !== "draft" && (
          <IconButton
            onClick={() => {
              return setCreatePostScreen("draft");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: 20 }}>
          {createPostScreen === "draft"
            ? "Create a new post"
            : createPostScreen === "location"
            ? "Add location"
            : createPostScreen === "tags"
            ? "Tag your friends"
            : createPostScreen === "feelings"
            ? "How are you feelings?"
            : ""}
        </Typography>
      </Stack>
      <IconButton
        size="small"
        onClick={() => {
          setCreatePostDialogOpen(false);
          setCreatePostScreen("draft");
        }}
      >
        <Close
          fontSize="small"
          sx={{
            color: theme?.palette?.text?.primary,
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default CreatePostHeader;
