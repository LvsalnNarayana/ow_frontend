import {
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UserAvatar from "../../shared/UserAvatar";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import UserGroup from "../../shared/UserGroup";
import type { JSX } from "react";
import type React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate, type NavigateFunction } from "react-router";
import DocSettingsMenu from "./DocSettingsMenu";

const DocToolbar: React.ElementType = (): JSX.Element => {
  const theme: Theme = useTheme();
  const navigate: NavigateFunction = useNavigate();
  return (
    <Stack
      minHeight={40}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mr={6}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={1}
      >
        {/* Back Button */}
        <IconButton
          sx={{
            p: 1,
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
        {/* Doc Name */}
        <Typography variant="h4">Doc Name here </Typography>
        {/* Favourite Button */}
        <IconButton
          sx={{
            p: 1,
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <EditOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            p: 1,
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <StarBorderOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
      >
        {/* Last Edited byr */}
        <Stack
          gap={1}
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography variant="body1">Last edited by:</Typography>
          <UserAvatar width={25} username="hello world!" />
        </Stack>
        {/* Shared With */}
        <Stack
          gap={3}
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography variant="body1">Shared with:</Typography>
          <UserGroup
            users={[
              {
                id: 1,
                username: "testssseas",
                firstname: "dsfdfdfdfdf",
                lastname: "fdfdfdfd",
              },
              {
                id: 2,
                username: "testsssseas",
                firstname: "dsfdfdfdfdf",
                lastname: "fdfdfdfd",
              },
              {
                id: 3,
                username: "ttsssaseas",
                firstname: "dsfdfdfdfdf",
                lastname: "fdfdfdfd",
              },
              {
                id: 4,
                username: "XXXXXXXXXX",
                firstname: "dsfdfdfdfdf",
                lastname: "fdfdfdfd",
              },
              {
                id: 5,
                username: "XXXXXXXXXX",
                firstname: "dsfdfdfdfdf",
                lastname: "fdfdfdfd",
              },
            ]}
            length={3}
            size={25}
          />
        </Stack>
        {/* Auto Save */}
        <FormControlLabel
          label="Autosave:"
          control={<Switch size="small" sx={{ ml: 1 }} />}
          labelPlacement="start"
        />
        {/* Share Button */}
        <Button variant="text" startIcon={<ShareOutlinedIcon />}>
          Share
        </Button>
        {/* Comment Button */}
        <Button variant="text" startIcon={<ModeCommentOutlinedIcon />}>
          Comment
        </Button>
        <DocSettingsMenu />
      </Stack>
    </Stack>
  );
};

export default DocToolbar;
