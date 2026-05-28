// External
import type { JSX } from "react";


// MUI
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Stack, Button, Divider, useTheme } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";


// Shared
import UserAvatar from "../../../shared/UserAvatar";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";


// Parent, Sibling, Index
import PostInput from "./PostInput";
import CreatePostDialog from "./CreatePostDialog";
import { generateUser } from "../../../types/user/user.types";
import { generatePost } from "../../../scripts/GeneratePost.script";
import type { PostScreen } from "../../../types/createPost/createPost.types";

const CreatePost = (): JSX.Element => {
  const theme = useTheme();

  const {
    actions: { setCreatePostScreen, setShowCreatePostDialog },
    data: {
      ui_state: { create_post_screen, show_create_post_dialog },
    },
  } = useCreatePostContext();

  const handlePostTypeClick = (type: string) => {
    setCreatePostScreen(type as PostScreen);
    setShowCreatePostDialog(true);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="column"
        sx={{
          width: "100%",
          p: 3,
          // maxWidth: "600px",
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme?.palette.background.paper,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: "100%",
          }}
          gap={2}
        >
          <UserAvatar username={generateUser()?.username} width={38} />
          <PostInput user={generatePost()?.author} />
        </Stack>
        <Divider sx={{ width: "100%", my: 2 }} />
        {/* Main Action Buttons */}
        <Stack
          gap={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            sx={{
              gap: 1,
              flex: 1,
              color: theme?.palette.text.primary,
              backgroundColor: `${theme?.palette.primary.main}20`,
            }}
            onClick={() => handlePostTypeClick("live")}
          >
            <VideoCallIcon sx={{ color: "red" }} />
            Live Video
          </Button>
          <Button
            variant="contained"
            sx={{
              gap: 1,
              flex: 1,
              color: theme?.palette.text.primary,
              backgroundColor: `${theme?.palette.primary.main}20`,
            }}
            onClick={() => handlePostTypeClick("media")}
          >
            <CollectionsIcon sx={{ color: "green" }} />
            Photo/Video
          </Button>
          <Button
            variant="contained"
            sx={{
              gap: 1,
              flex: 1,
              color: theme?.palette.text.primary,
              backgroundColor: `${theme?.palette.primary.main}20`,
            }}
            onClick={() => handlePostTypeClick("feelings")}
          >
            <InsertEmoticonIcon sx={{ color: "orange" }} />
            Feeling
          </Button>
        </Stack>
      </Stack>
      <CreatePostDialog
        createPostScreen={create_post_screen}
        setCreatePostScreen={setCreatePostScreen}
        createPostDialogOpen={show_create_post_dialog}
        setCreatePostDialogOpen={setShowCreatePostDialog}
      />
    </>
  );
};

export default CreatePost;
