// MUI
import { Close } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/material";


// Shared
import UserAvatar from "../../../../shared/UserAvatar";


// Parent, Sibling, Index
import CommentTextArea from "./CommentTextArea";

const CommentInput = ({
  type,
  closeReply,
}: {
  type: string;
  closeReply?: () => void;
}) => {
  return (
    <Stack
      justifyContent="flex-start"
      sx={{ width: "100%" }}
      alignItems="center"
      direction="row"
      gap={1}
    >
      <UserAvatar username={"user.username"} width={30} height={30} />
      <CommentTextArea type={type} />
      {type === "reply" && (
        <IconButton onClick={closeReply} aria-label="add" size="small">
          <Close fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

export default CommentInput;
