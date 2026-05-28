// External
import React from "react";
import { useNavigate } from "react-router";


// MUI
import StarIcon from "@mui/icons-material/Star";
import MessageIcon from "@mui/icons-material/Message";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, Stack, useTheme, IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";


// Shared
import UserAvatar from "../../shared/UserAvatar";
import ButtonMenu from "../../shared/ButtonMenu";
interface FriendCardProps {
  id: string;
  fullName: string;
  username?: string;
  statusMessage?: string;
  lastSeen?: Date;
  onlineStatus?: "online" | "offline" | "away" | "busy";
  mutualFriendsCount?: number;
  isFavorite?: boolean;
}

const statusColorMap: Record<string, string> = {
  busy: "red",
  away: "orange",
  online: "green",
  offline: "gray",
};

const FriendCard: React.FC<FriendCardProps> = ({
  fullName,
  username,
  mutualFriendsCount,
  isFavorite = false,
  onlineStatus = "offline",
}) => {
  const theme = useTheme();

  const navigate = useNavigate();

  const menu = [
    {
      value: "View Profile",
      icon: <VisibilityIcon />,
      onClick: () => navigate(`/profile/${username}`),
    },
    {
      value: "Share",
      onClick: () => {},
      icon: <QrCode2OutlinedIcon />,
    },
    {
      value: "Message",
      onClick: () => {},
      icon: <MessageIcon />,
    },
    {
      value: "Block",
      onClick: () => {},
      icon: <BlockOutlinedIcon />,
    },
    {
      value: "Remove",
      onClick: () => {},
      icon: <RemoveCircleOutlineOutlinedIcon />,
    },
  ];
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      p={2}
      sx={{
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Stack direction="row" width={"100%"} alignItems="flex-start" spacing={2}>
        <Box position="relative">
          <UserAvatar username={username || "Invalid"} width={60} />
          <Box
            position="absolute"
            bottom={0}
            right={0}
            width={15}
            height={15}
            borderRadius="50%"
            bgcolor={statusColorMap[onlineStatus]}
            border="2px solid white"
          />
        </Box>

        <Stack flexGrow={1} spacing={0.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography
              fontWeight={600}
              fontSize={22}
              variant="body1"
              color="text.primary"
              sx={{
                maxWidth: 200,
                cursor: "pointer",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "inline-block",
                textOverflow: "ellipsis",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => navigate(`/profile/${username}`)}
            >
              {fullName}
            </Typography>
            <IconButton onClick={() => {}} size="small">
              {isFavorite ? (
                <StarIcon fontSize="small" color="warning" />
              ) : (
                <StarBorderIcon fontSize="small" />
              )}
            </IconButton>
          </Stack>
          {username && (
            <Typography variant="body1" fontSize={18} color="text.secondary">
              @{username}
            </Typography>
          )}
          {mutualFriendsCount !== undefined && (
            <Typography variant="caption" color="text.secondary">
              {mutualFriendsCount} mutual friend
              {mutualFriendsCount !== 1 ? "s" : ""}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <ButtonMenu
            value={
              <MoreVertOutlinedIcon
                sx={{
                  fontSize: 16,
                }}
              />
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            menu={menu}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FriendCard;
