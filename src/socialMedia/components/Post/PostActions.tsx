import { Stack, Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import ReactionsTooltip from "../../../shared/ReactionsTooltip";

const PostActions = ({
  enableCommentInput,
}: {
  enableCommentInput: (value: boolean) => void;
}) => {
  const enableComment = () => {
    enableCommentInput(true);
  };

  return (
    <Stack
      gap={2}
      width="100%"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <ReactionsTooltip width={32} type="post">
        <Button
          variant="text"
          sx={{
            py: 1,
            gap: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
          Like
        </Button>
      </ReactionsTooltip>
      <Button
        variant="text"
        onClick={enableComment}
        sx={{
          py: 1,
          gap: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ChatBubbleOutlineIcon fontSize="small" />
        Comment
      </Button>
      <Button
        variant="text"
        sx={{
          py: 1,
          gap: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShareIcon fontSize="small" />
        Share
      </Button>
    </Stack>
  );
};

export default PostActions;
