import { Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import UserAvatar from "../../../../shared/UserAvatar";
import CustomTooltip from "../../../../shared/CustomTooltip";
import type {
  PostCommentReply,
  ReactionUserInterface,
} from "../../../../types/post.types";

const CommentReply = ({ reply }: { reply: PostCommentReply }) => {
  const handleCommentReplyLike = () => {
    // eslint-disable-next-line no-console
    console.log("Liked Comment Reply");
  };

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="column"
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="center"
          direction="row"
          sx={{ my: 1, width: "100%" }}
          gap={1.5}
        >
          <UserAvatar username={reply?.user?.username} width={30} height={30} />
          <Stack
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="column"
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              variant="body1"
              component="p"
            >
              {reply?.user?.firstName} {reply?.user?.lastName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "11px",
              }}
              variant="body1"
              component="p"
            >
              {/* {useDate(reply?.replied_at)} */}
              {reply?.replied_at}
            </Typography>
          </Stack>
        </Stack>
        {reply?.reactions?.total_count > 0 && (
          <CustomTooltip
            position="top"
            title={
              <>
                {reply?.reactions?.recent_reactions?.map(
                  (reaction: ReactionUserInterface, index: number) => {
                    return (
                      <Stack
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        gap={1}
                        sx={{ my: 1 }}
                      >
                        <UserAvatar
                          username={reaction?.username}
                          width={20}
                          height={20}
                        />
                        <Typography sx={{ fontSize: "14px" }}>
                          {reaction?.firstName} {reaction?.lastName}
                        </Typography>
                      </Stack>
                    );
                  }
                )}
              </>
            }
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <FavoriteBorderIcon fontSize="small" sx={{ fontSize: "16px" }} />
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {reply?.reactions?.total_count}
              </Typography>
            </Stack>
          </CustomTooltip>
        )}
      </Stack>
      <Typography
        sx={{
          fontSize: "13px",
        }}
        variant="body1"
      >
        {reply?.content}
      </Typography>
      <Typography
        onClick={handleCommentReplyLike}
        sx={{
          mt: 2,
          gap: 0.5,
          display: "flex",
          fontSize: "13px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            color: "dodgerblue",
            textDecoration: "underline",
          },
        }}
        variant="body1"
      >
        <FavoriteBorderIcon fontSize="small" />
        Like
      </Typography>
    </Stack>
  );
};

export default CommentReply;
