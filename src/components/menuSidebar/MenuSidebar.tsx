import {
  Box,
  Collapse,
  MenuList,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router";
import SidebarMenuItem from "./SidebarMenuItem";
import UserAvatar from "../../shared/UserAvatar";
import navigationData from "../../data/navigationData";
import { type JSX } from "react";

const MenuSidebar = ({
  open,
  handleOpen,
  handleClose,
}: {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}): JSX.Element => {
  const theme = useTheme();
  const { pathname } = useLocation();
  return (
    <Stack
      my={1}
      px={0.8}
      py={2}
      gap={3}
      width={"100%"}
      height="100%"
      alignItems={"flex-start"}
      justifyContent="space-between"
      sx={{
        overflowX: "hidden",
        userSelect: "none",
        transition: theme.transitions.create("padding", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Stack
        width={"fit-content"}
        direction={"row"}
        alignItems="center"
        justifyContent="flex-start"
        px={1}
        gap={open ? 2 : 0}
        sx={{
          transition: theme.transitions.create("gap", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Box
          component="img"
          src="/images/planet-earth.png"
          alt="Logo"
          sx={{
            width: "30px",
            maxWidth: "100%",
            height: "auto",
            cursor: "pointer",
          }}
          onClick={() => {
            if (open) {
              handleClose();
            } else {
              handleOpen();
            }
          }}
        />

        <Collapse
          easing={theme.transitions.easing.sharp}
          timeout={theme.transitions.duration.leavingScreen}
          in={open}
          orientation="horizontal"
        >
          <Typography
            sx={{
              whiteSpace: "nowrap",
            }}
            variant="body1"
            fontSize={22}
            fontWeight={500}
          >
            One World
          </Typography>
        </Collapse>
      </Stack>
      <MenuList sx={{ width: "100%", p: 0, flexGrow: 1 }}>
        {/* filter from the given names [profile, test] */}
        {navigationData
          ?.filter((menu) => menu?.id !== "profile")
          .map((menu) => (
            <SidebarMenuItem
              key={menu.id}
              menu={menu}
              open={open}
              active={pathname.includes(menu.href)}
            />
          ))}
      </MenuList>
      <Stack
        p={1}
        width={"fit-content"}
        direction={"row"}
        gap={open ? 2 : 0}
        alignItems="center"
        sx={{
          transition: theme.transitions.create("gap", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <UserAvatar username="testhello" width={30} />
        <Collapse
          in={open}
          orientation="horizontal"
          easing={theme.transitions.easing.sharp}
          timeout={theme.transitions.duration.enteringScreen}
        >
          <Typography variant="body1" fontSize={15} fontWeight={600}>
            testhello
          </Typography>
        </Collapse>
      </Stack>
    </Stack>
  );
};

export default MenuSidebar;
