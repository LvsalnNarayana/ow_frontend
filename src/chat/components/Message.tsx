/* eslint-disable multiline-ternary */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useRef, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import {
  Stack,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import UserAvatar from "../../shared/UserAvatar";
import CustomTooltip from "../../shared/CustomTooltip";
import ReactionsTooltip from "../../shared/ReactionsTooltip";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const Message = ({
  message = {
    id: "message_1234",
    mentions: [],
    attachments: [],
    message:
      "Hey John, how are you?dskjdklajbfkljbdfklbsdklfbdbvkflsbjlklkvsfklbfdfdfkjbdfbdjfbsjbhghjbgjfhgjfhbjshgjjbgfsjhgjfbgfsuhgsfhjgbfjhbvfhjsbvfjshbklbflkbsgbkgjbfskgfsjkhgbfsjkgbfsj",
    timestamp: "2023-06-24T10:00:00Z",
    user: {
      id: "user_1",
      is_logged_in: true,
      firstname: "Harry",
      lastname: "Potter",
      username: "harry_potter",
      profile_picture: "https://example.com/harry_profile.jpg",
    },
    read_status: {
      unread_by: [],
      read_by: [
        {
          id: "user_1234",
          lastname: "Doe",
          firstname: "John",
          username: "jhon_doe",
          profile_picture: "https://example.com/profile.jpg",
        },
      ],
    },
    engagement: {
      reacted: true,
      reaction_type: "like",
      reacted_at: "2023-06-24T10:05:00Z",
      reactions: [
        {
          id: "user_1234",
          lastname: "Doe",
          reaction: "like",
          firstname: "John",
          username: "jhon_doe",
          mutual_friends_count: 5,
          friendship_status: "friends",
          profile_picture: "https://example.com/profile.jpg",
        },
        {
          id: "user_1224",
          lastname: "Doe",
          reaction: "love",
          firstname: "John",
          username: "jhon_doe",
          mutual_friends_count: 5,
          friendship_status: "friends",
          profile_picture: "https://example.com/profile.jpg",
        },
      ],
    },
  },
}) => {
  const theme = useTheme();
  const messageRef = useRef(null);
  const [showMessageReaction, setShowMessageReaction] =
    useState<boolean>(false);

  const [messageMenuAnchorEl, setMessageMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const messageMenuOpen = Boolean(messageMenuAnchorEl);

  const handleMessageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMessageMenuAnchorEl(event.currentTarget);
  };

  const handleMessageMenuClose = () => {
    setMessageMenuAnchorEl(null);
  };
  return (
    <Stack
      direction={message?.user?.is_logged_in ? `row-reverse` : `row`}
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={1}
      sx={{
        p: 1,
        width: "70%",
        maxWidth: "70%",
        ml: message?.user?.is_logged_in ? `auto` : ``,
      }}
      ref={messageRef}
      onMouseEnter={() => {
        return setShowMessageReaction(true);
      }}
      onMouseLeave={() => {
        setShowMessageReaction(false);
      }}
    >
      <UserAvatar username={message?.user?.username} width={32} />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems={message?.user?.is_logged_in ? `flex-end` : `flex-start`}
        sx={{
          mt: -1,
          width: "100%",
          height: "fit-content",
        }}
      >
        <Stack
          direction={message?.user?.is_logged_in ? `row` : `row-reverse`}
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={2}
        >
          {showMessageReaction ? (
            <Stack
              direction={message?.user?.is_logged_in ? `row` : `row-reverse`}
              justifyContent="flex-start"
              alignItems="center"
              gap={1}
            >
              {message?.user?.is_logged_in ? (
                <>
                  <IconButton
                    disableTouchRipple
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={handleMessageMenuClick}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    open={messageMenuOpen}
                    onClose={handleMessageMenuClose}
                    anchorEl={messageMenuAnchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <ContentCopyOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Copy</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <EditOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <DeleteOutlineOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div
                  style={{
                    flexShrink: 0,
                    width: "30px",
                    height: "30px",
                  }}
                />
              )}
              <ReactionsTooltip width={28} type="message">
                <EmojiEmotionsOutlinedIcon
                  fontSize="small"
                  sx={{
                    mt: 1,
                    cursor: "pointer",
                    color: theme.palette.text.disabled,
                  }}
                />
              </ReactionsTooltip>
            </Stack>
          ) : (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={1}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "30px",
                  height: "30px",
                }}
              />
              <div
                style={{
                  flexShrink: 0,
                  width: "20px",
                  height: "20px",
                }}
              />
            </Stack>
          )}
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems={message?.user?.is_logged_in ? `flex-start` : `flex-end`}
          >
            <Typography
              variant="body1"
              sx={{
                px: 2,
                py: 1.5,
                fontSize: 14,
                borderRadius: theme.shape.radius.xs,
                backgroundColor: theme.palette.background.paper,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                width: "100%",
              }}
            >
              {message?.message}
            </Typography>

            <Stack
              direction="row"
              justifyContent={
                // eslint-disable-next-line multiline-ternary
                message?.engagement?.reactions?.length > 0
                  ? `space-between`
                  : `flex-start`
              }
              alignItems="center"
              sx={{ my: 0.5, width: "100%" }}
            >
              <Typography
                variant="body1"
                sx={{
                  pl: 1,
                  fontSize: "10px",
                }}
              >
                11:20 PM
              </Typography>
              <Stack sx={{ flexShrink: 0 }} direction={`row`} gap={1}>
                {message?.engagement?.reactions?.map((reaction, index) => {
                  return (
                    <CustomTooltip
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      margin={10}
                      padding={4}
                      title={`${reaction?.firstname} ${reaction?.lastname}`}
                      position="bottom"
                    >
                      <Stack
                        direction="row"
                        gap={0.5}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          sx={{ width: 18, height: 18 }}
                          alt="like"
                          src={`/images/reactions/${reaction?.reaction}.png`}
                        />
                        <Typography variant="body1" fontSize={12}>
                          2
                        </Typography>
                      </Stack>
                    </CustomTooltip>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Message;
