/* eslint-disable max-lines */
import { useState } from "react";

import { Close } from "@mui/icons-material";
import {
  Stack,
  Avatar,
  Dialog,
  Divider,
  Typography,
  IconButton,
  AvatarGroup,
} from "@mui/material";

import ReactionUserCard from "./ReactionUserCard";
import type { PostInterface } from "../../../types/post/post.types";

const PostReactions = ({ post }: { post: PostInterface }) => {
  const [reactionCategory, setReactionCategory] = useState(0);
  const [reactionsDialogOpen, setReactionsDialogOpen] = useState(false);

  const handleReactionsDialogOpen = () => {
    setReactionsDialogOpen(true);
  };
  const handleReactionsDialogClose = () => {
    setReactionsDialogOpen(false);
  };

  return (
    <>
      <Stack
        onClick={handleReactionsDialogOpen}
        component="div"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={0.3}
      >
        <AvatarGroup
          max={4}
          sx={{
            [`& .MuiAvatar-root`]: {
              borderColor: "transparent",
            },
          }}
        >
          {post?.engagement?.reactions?.recent_reactions
            ?.slice(0, 4)
            .map((user, index) => {
              return (
                <Avatar
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sx={{ width: 18, height: 18 }}
                  alt="Remy Sharp"
                  src={`/images/reactions/${user?.reaction_type}.png`}
                />
              );
            })}
        </AvatarGroup>
        {post?.engagement?.reactions?.total_count > 0 ? (
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {`${post?.engagement?.reactions?.recent_reactions?.[0]?.firstName} ${post?.engagement?.reactions?.recent_reactions?.[0]?.lastName}`}{" "}
            and {post?.engagement?.reactions?.total_count} others reacted
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Be the first to like this
          </Typography>
        )}
      </Stack>
      <Dialog
        PaperProps={{
          elevation: 0,
          sx: {
            pb: 2,
            width: "35vw",
            maxWidth: "80vw",
            position: "relative",
          },
        }}
        onClose={handleReactionsDialogClose}
        open={reactionsDialogOpen}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            p: 2,
            pb: 0,
            top: 0,
            zIndex: 1000,
            width: "100%",
            position: "sticky",
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={3}
            sx={{
              pb: 2,
              position: "relative",
              "& >div": {
                minWidth: "50px",
              },
            }}
          >
            <Stack
              component="div"
              onClick={() => {
                setReactionCategory(0);
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                All
              </Typography>
            </Stack>
            <Stack
              component="div"
              onClick={() => {
                setReactionCategory(1);
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 24, height: 24, overflow: "visible" }}
                alt="Remy Sharp"
                src="/images/reactions/like.png"
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                {post?.engagement?.reactions?.reaction_counts?.like}
              </Typography>
            </Stack>
            <Stack
              component="div"
              onClick={() => {
                setReactionCategory(2);
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 24, height: 24, overflow: "visible" }}
                alt="Remy Sharp"
                src="/images/reactions/love.png"
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                {post?.engagement?.reactions?.reaction_counts?.love}
              </Typography>
            </Stack>
            <Stack
              component="div"
              onClick={() => {
                setReactionCategory(3);
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 24, height: 24, overflow: "visible" }}
                alt="Remy Sharp"
                src="/images/reactions/haha.png"
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                {post?.engagement?.reactions?.reaction_counts?.haha}
              </Typography>
            </Stack>
            <Stack
              component="div"
              onClick={() => {
                setReactionCategory(4);
              }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
              sx={{
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{ width: 24, height: 24, overflow: "visible" }}
                alt="Remy Sharp"
                src="/images/reactions/sad.png"
              />
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                {post?.engagement?.reactions?.reaction_counts?.sad}
              </Typography>
            </Stack>
            <span
              style={{
                bottom: 0,
                width: "50px",
                height: "4px",
                position: "absolute",
                borderRadius: "10px",
                backgroundColor: "dodgerblue",
                transition: "all 0.1s ease-in",
                left: `calc(${reactionCategory * 50}px + ${
                  reactionCategory * 24
                }px)`,
              }}
            />
          </Stack>
          <IconButton onClick={handleReactionsDialogClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Stack>
        <Divider sx={{ width: "100%" }} />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={3}
          sx={{
            p: 2,
            pb: 0,
            width: "100%",
            height: "80vh",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <>
            {reactionCategory === 0 && (
              <>
                {post?.engagement?.reactions?.recent_reactions.map(
                  (user, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <ReactionUserCard key={index} user={user} />;
                  }
                )}
              </>
            )}
            {reactionCategory === 1 && (
              <>
                {post?.engagement?.reactions?.recent_reactions
                  ?.filter((user) => {
                    return user?.reaction_type === "like";
                  })
                  ?.map((user, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <ReactionUserCard key={index} user={user} />;
                  })}
              </>
            )}
            {reactionCategory === 2 && (
              <>
                {post?.engagement?.reactions?.recent_reactions
                  ?.filter((user) => {
                    return user?.reaction_type === "love";
                  })
                  ?.map((user, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <ReactionUserCard key={index} user={user} />;
                  })}
              </>
            )}
            {reactionCategory === 3 && (
              <>
                {post?.engagement?.reactions?.recent_reactions
                  ?.filter((user) => {
                    return user?.reaction_type === "haha";
                  })
                  ?.map((user, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <ReactionUserCard key={index} user={user} />;
                  })}
              </>
            )}
            {reactionCategory === 4 && (
              <>
                {post?.engagement?.reactions?.recent_reactions
                  ?.filter((user) => {
                    return user?.reaction_type === "sad";
                  })
                  ?.map((user, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <ReactionUserCard key={index} user={user} />;
                  })}
              </>
            )}
          </>
        </Stack>
      </Dialog>
    </>
  );
};

export default PostReactions;
