import { Stack, Button } from "@mui/material";
import CreatePostActions from "./CreatePostActions";
import CreatePostUser from "./CreatePostUser";
import CreatePostInput from "./CreatePostInput";
import CreatePostMedia from "./CreatePostMedia";

const CreatePostDraft = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexGrow={1}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexGrow={1}
        gap={2}
        sx={{
          p: 2,
          width: "100%",
          height: "100%",
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <CreatePostUser />
        <CreatePostInput />
        <CreatePostMedia />
        <div style={{ flexGrow: 1, width: "100%" }} />
        <CreatePostActions />
        <Button variant="contained" disableElevation sx={{ width: "100%" }}>
          Post
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreatePostDraft;
