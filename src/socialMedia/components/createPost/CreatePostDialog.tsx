/* eslint-disable import/no-extraneous-dependencies */

import { Dialog, Divider } from "@mui/material";

import CreatePostTags from "./CreatePostTags";
import CreatePostDraft from "./CreatePostDraft";
import CreatePostHeader from "./CreatePostHeader";
import type { PostScreen } from "../../../types/createPost/createPost.types";
import CreatePostLocation from "./CreatePostLocation";
import CreatePostFeelings from "./CreatePostFeelings";

const CreatePostDialog = ({
  createPostScreen,
  setCreatePostScreen,
  createPostDialogOpen,
  setCreatePostDialogOpen,
}: {
  createPostScreen: PostScreen;
  setCreatePostScreen: (screen: PostScreen) => void;
  createPostDialogOpen: boolean;
  setCreatePostDialogOpen: (open: boolean) => void;
}) => {
  const draftScreen = () => {
    switch (createPostScreen) {
      case "draft" as PostScreen:
        return <CreatePostDraft />;
      case "location" as PostScreen:
        return <CreatePostLocation />;
      case "tags" as PostScreen:
        return <CreatePostTags />;
      case "feelings" as PostScreen:
        return <CreatePostFeelings />;
      default:
        return <CreatePostDraft />;
    }
  };

  return (
    <Dialog
      autoFocus
      disableRestoreFocus
      disableEscapeKeyDown
      disablePortal
      onClose={() => {
        setCreatePostDialogOpen(false);
        setCreatePostScreen("draft");
      }}
      PaperProps={{
        sx: {
          m: 0,
          width: "35vw",
          height: "90vh",
          maxHeight: "90vh",
          maxWidth: "90vw !important",
          transition: "all 0.1s ease-in",
        },
      }}
      open={createPostDialogOpen}
    >
      <CreatePostHeader
        createPostScreen={createPostScreen}
        setCreatePostScreen={setCreatePostScreen}
        setCreatePostDialogOpen={setCreatePostDialogOpen}
      />
      <Divider sx={{ width: "100%" }} />
      {draftScreen()}
    </Dialog>
  );
};

export default CreatePostDialog;
