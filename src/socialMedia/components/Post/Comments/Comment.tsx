/* eslint-disable max-statements-per-line */
/* eslint-disable no-shadow */
/* eslint-disable multiline-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react";

import ReplyIcon from "@mui/icons-material/Reply";
import { Chip, Link, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import CommentInput from "./CommentInput";
import CommentReply from "./CommentReply";
// import useDate from "../../../hooks/useDate";
import UserAvatar from "../../../../shared/UserAvatar";
import CustomTooltip from "../../../../shared/CustomTooltip";
import type {
  PostComment,
  PostCommentReply,
} from "../../../../types/post.types";
import moment from "moment";
import { useNavigate } from "react-router";

const Comment = ({ comment }: { comment: PostComment }) => {
  const navigate = useNavigate();
  const [replySlice, setReplySlice] = useState(1);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const renderComment = (comment: PostComment) => {
    if (!comment) return null;

    // eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
    const parts = comment?.content?.split(/(@\w+|#\w+)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <Chip
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            label={part}
            sx={{
              p: 0,
              height: "auto",
              margin: "0 2px",
              cursor: "pointer",
              "& .MuiChip-label": {
                px: "8px",
              },
            }}
            component="span"
          />
        );
      }
      if (part.startsWith("#")) {
        return (
          <Link
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            href={`/hashtag/${part.slice(1)}`}
            sx={{
              color: "blue",
              margin: "0 4px",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {part}
          </Link>
        );
      }

      return part;
    });
  };
  const handleShowReplyInput = () => {
    setShowReplyInput(true);
  };
  const handleCloseReplyInput = () => {
    setShowReplyInput(false);
  };
  const handleViewMoreReplies = () => {
    setReplySlice((prevReplySlice) => {
      const remainingReplies = comment?.replies?.items?.length - prevReplySlice;

      return remainingReplies > 5
        ? prevReplySlice + 5
        : prevReplySlice + remainingReplies;
    });
  };
  const handleCommentLike = () => {
    // eslint-disable-next-line no-console
    console.log("Liked Comment");
  };

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="column"
      sx={{ width: "100%" }}
      gap={0}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 1, width: "100%" }}
      >
        <Stack
          justifyContent="flex-start"
          alignItems="center"
          direction="row"
          gap={1.5}
        >
          <UserAvatar
            username={comment?.user?.username}
            width={32}
            height={32}
          />
          <Stack
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="column"
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              variant="body1"
              component="p"
              onClick={() => {
                navigate(`/profile/${comment?.user?.username}`);
              }}
            >
              {comment?.user?.firstName} {comment?.user?.lastName}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 12,
              }}
              variant="body1"
              component="p"
              color="text.secondary"
            >
              {moment(comment?.createdAt).format("DD MMM YYYY, HH:MM A")}
            </Typography>
          </Stack>
        </Stack>
        {comment?.reactions?.total_count > 0 && (
          <CustomTooltip
            position="top"
            title={
              <>
                {comment?.reactions?.recent_reactions?.map(
                  (reaction, index) => {
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
                {comment?.reactions?.total_count}
              </Typography>
            </Stack>
          </CustomTooltip>
        )}
      </Stack>
      <Typography sx={{ fontSize: 15 }} variant="body1">
        {renderComment(comment)}
      </Typography>
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        direction="row"
        sx={{ my: 2 }}
        gap={2}
      >
        <Typography
          onClick={handleCommentLike}
          sx={{
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
        <Typography
          sx={{
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
          onClick={handleShowReplyInput}
          variant="body1"
        >
          <ReplyIcon fontSize="small" />
          Reply
        </Typography>
      </Stack>
      <Stack sx={{ px: 4, width: "100%" }} gap={2}>
        {showReplyInput && (
          <CommentInput closeReply={handleCloseReplyInput} type="reply" />
        )}
        {comment?.replies?.items?.length > 0 && replySlice >= 1 && (
          <>
            {comment?.replies?.items
              ?.slice(0, replySlice)
              ?.map((reply: PostCommentReply, index: number) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <CommentReply key={index} reply={reply} />
                );
              })}
          </>
        )}
        {
          // eslint-disable-next-line operator-linebreak
          comment?.replies?.items?.length > 0 &&
            replySlice < comment?.replies?.items?.length && (
              <Typography
                onClick={handleViewMoreReplies}
                sx={{
                  my: 1,
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "dodgerblue",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                + View {comment?.replies?.items?.length - replySlice} more
                replies
              </Typography>
            )
        }
      </Stack>
    </Stack>
  );
};

export default Comment;
