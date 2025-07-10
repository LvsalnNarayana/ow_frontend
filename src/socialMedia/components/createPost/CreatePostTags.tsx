/* eslint-disable import/no-duplicates */

import { Stack, Button } from "@mui/material";

import SearchUser from "../../../shared/SearchUser";
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
        p: 2,
        width: "100%",
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
