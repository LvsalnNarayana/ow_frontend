import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Stack, Button, Typography } from "@mui/material";

import UserAvatar from "../../../shared/UserAvatar";
import type { ReactionUserInterface } from "../../../types/post.types";

const ReactionUserCard = ({ user }: { user: ReactionUserInterface }) => {
  const handleReactionUserInteraction = () => {
    if (user?.friendship_status === "friends") {
      // eslint-disable-next-line no-console
      console.log("you are already friends");
    } else if (user?.friendship_status === "none") {
      // eslint-disable-next-line no-console
      console.log("add friend");
    } else if (user?.friendship_status === "pending") {
      // eslint-disable-next-line no-console
      console.log("request already sent");
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1.5}
      >
        <UserAvatar username={user?.username} width={38} />
        <Stack>
          <Typography
            variant="body1"
            component="p"
            sx={{ fontWeight: 600, fontSize: "14px" }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body1" component="p" sx={{ fontSize: "12px" }}>
            @{user?.username}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ fontWeight: 500, fontSize: "12px" }}
          >
            {user?.mutual_friends_count} Mutual Friends
          </Typography>
        </Stack>
      </Stack>
      <Button
        onClick={handleReactionUserInteraction}
        sx={{
          py: 0.5,
          fontSize: "12px",
          minWidth: "150px",
        }}
        color="primary"
        variant="contained"
        disableElevation
        size="small"
      >
        {user?.friendship_status === "none" && (
          <>
            <AddIcon fontSize="small" />
            &nbsp;&nbsp;Add Friend
          </>
        )}
        {user?.friendship_status === "friends" && (
          <>
            <GroupsIcon fontSize="small" />
            &nbsp;&nbsp;Friends
          </>
        )}
        {user?.friendship_status === "pending" && (
          <>
            <PersonAddIcon fontSize="small" />
            &nbsp;&nbsp;Request sent
          </>
        )}
      </Button>
    </Stack>
  );
};

export default ReactionUserCard;
