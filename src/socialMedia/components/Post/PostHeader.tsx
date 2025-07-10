import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Typography } from "@mui/material";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import UserAvatar from "../../../shared/UserAvatar";
import type { PostInterface } from "../../../types/post/post.types";
import moment from "moment";
import ButtonMenu from "../../../shared/ButtonMenu";

const PostHeader = ({ post }: { post: PostInterface }) => {
  const handlePostSave = () => {
    console.log("Post Saved");
  };
  const handleUnfollowUser = () => {
    console.log("Unfollowed User");
  };
  const hanldeBlockUser = () => {
    console.log("User Blocked");
  };

  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      gap={2}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
      >
        <UserAvatar username={post?.author?.username} width={50} />
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={0.5}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Typography
              variant="body1"
              component="p"
              flexShrink={0}
              sx={{ width: "100%", fontSize: 15 }}
            >
              <span style={{ fontWeight: 600 }}>
                {post.author.firstName} {post.author.lastName}
              </span>
              &nbsp;is at&nbsp;
              <strong style={{ fontWeight: 600 }}>
                {post?.metadata?.location?.name},{" "}
                {post?.metadata?.location?.address?.city},{" "}
                {post?.metadata?.location?.address?.country}
              </strong>
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 400, fontSize: 14 }}
          >
            {moment(post?.createdAt).format("DD MMM, YYYY HH:MM A")}
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <ButtonMenu
          type="icon"
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          value={<MoreVertIcon fontSize="small" />}
          menu={[
            {
              value: "Save",
              icon: <BookmarkBorderIcon fontSize="small" />,
              onClick: handlePostSave,
            },
            {
              value: "Unfollow",
              icon: <CancelPresentationIcon fontSize="small" />,
              onClick: handleUnfollowUser,
            },
            {
              value: "Block",
              icon: <DoNotDisturbIcon fontSize="small" />,
              onClick: hanldeBlockUser,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};

export default PostHeader;
