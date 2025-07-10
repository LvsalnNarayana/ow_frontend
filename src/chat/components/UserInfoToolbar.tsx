import { Stack, Typography } from "@mui/material";
import UserAvatar from "../../shared/UserAvatar";
import ButtonMenu from "../../shared/ButtonMenu";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import BlockIcon from "@mui/icons-material/Block";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

const UserInfoToolbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      py={0.5}
    >
      <Stack>
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <UserAvatar username="User1234" width={35} />
          <Stack>
            <Typography variant="body1" fontSize={18} fontWeight={600}>
              User1234
            </Typography>
            <Typography
              variant="body2"
              fontSize={11}
              fontWeight={400}
              color="text.secondary"
            >
              Last seen recently
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <ButtonMenu
          type="icon"
          value={
            <MoreVertIcon
              sx={{
                fontSize: 16,
              }}
            />
          }
          menu={[
            {
              value: "Block",
              icon: <BlockIcon sx={{ fontSize: 16 }} />,
              onClick: () => {
                console.log("Block");
              },
            },
            {
              value: "Delete",
              icon: <DeleteIcon sx={{ fontSize: 16 }} />,
              onClick: () => {
                console.log("Delete");
              },
            },
            {
              value: "Add to group",
              icon: <GroupIcon sx={{ fontSize: 16 }} />,
              onClick: () => {
                console.log("Add to group");
              },
            },
            {
              value: "Mute",
              icon: <NotificationsOffIcon sx={{ fontSize: 16 }} />,
              onClick: () => {
                console.log("Mute");
              },
            },
            {
              value: "View profile",
              icon: <PersonIcon sx={{ fontSize: 16 }} />,
              onClick: () => {
                console.log("View profile");
              },
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};

export default UserInfoToolbar;
