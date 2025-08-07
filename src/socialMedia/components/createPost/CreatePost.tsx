import { Stack, Button, Divider, useTheme } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CollectionsIcon from "@mui/icons-material/Collections";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PollIcon from "@mui/icons-material/Poll";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GifBoxIcon from "@mui/icons-material/GifBox";

import PostInput from "./PostInput";
import UserAvatar from "../../../shared/UserAvatar";
import { post } from "../../../sampleData/post";
import CreatePostDialog from "./CreatePostDialog";
import { useCreatePostContext } from "../../context/CreatePostContext";
import { user } from "../../../sampleData/user";
import type { PostScreen } from "../../../types/createPost/createPost.types";

const CreatePost = () => {
  const theme = useTheme();
  const {
    data: {
      ui_state: { show_create_post_dialog, create_post_screen },
    },
    actions: { setShowCreatePostDialog, setCreatePostScreen },
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
          p: 3,
          width: "100%",
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
          <UserAvatar username={user?.username} width={38} />
          <PostInput user={post?.author} />
        </Stack>
        <Divider sx={{ my: 2, width: "100%" }} />
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
