/* eslint-disable import/no-duplicates */

// MUI
import { Stack, Button } from "@mui/material";


// Shared
import SearchUser from "../../../shared/SearchUser";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";

const CreatePostTags = () => {
  const {
    data: {
      metadata: { tagged_users },
    },
    actions: { setTaggedUsers, setCreatePostScreen },
  } = useCreatePostContext();
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        width: "100%",
        p: 2,
        height: "65vh",
      }}
    >
      <SearchUser
        selectedUsers={tagged_users}
        setSelectedUsers={(newTaggedUsers) => {
          setTaggedUsers(newTaggedUsers);
        }}
      />
      <Button
        sx={{ mt: 2, ml: "auto" }}
        variant="contained"
        size="small"
        disableElevation
        disableRipple
        onClick={() => {
          setCreatePostScreen("draft");
        }}
      >
        Done
      </Button>
    </Stack>
  );
};

export default CreatePostTags;
