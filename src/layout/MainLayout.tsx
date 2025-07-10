import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { Drawer, Stack, type Theme, Typography } from "@mui/material";
import { Outlet } from "react-router";
import { useState } from "react";
import MenuSidebar from "../components/menuSidebar/MenuSidebar";
import MainHeader from "../components/MainHeader";
const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  position: "relative",
  transition: theme?.transitions?.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
  width: "60px",
  position: "relative",
  transition: theme?.transitions?.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const MenuDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexShrink: 0,
  width: "fit-content",
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  overflow: "hidden",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          border: "none",
          ...openedMixin(theme),
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          backgroundColor: theme.palette.background.paper,
          border: "none",
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

export default function MainLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const handleMainDrawerOpen = () => {
    setMainMenuOpen(true);
  };
  const handleMainDrawerClose = () => {
    setMainMenuOpen(false);
  };
  const handleNotificationDrawerOpen = () => {
    if (notificationMenuOpen) {
      setNotificationMenuOpen(false);
    } else {
      setNotificationMenuOpen(true);
    }
  };
  const handleNotificationDrawerClose = () => {
    setNotificationMenuOpen(false);
  };

  return (
    <Stack
      direction={"row"}
      sx={{ height: "100vh", overflow: "hidden", position: "relative" }}
    >
      <MenuDrawer variant="permanent" open={mainMenuOpen} anchor="left">
        <MenuSidebar
          open={mainMenuOpen}
          handleOpen={handleMainDrawerOpen}
          handleClose={handleMainDrawerClose}
        />
      </MenuDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2, overflowY: "hidden" }}>
        <Stack
          direction={"column"}
          sx={{ height: "100%" }}
          width={"100%"}
          spacing={1}
        >
          {/* <MainHeader
            notificationMenuOpen={notificationMenuOpen}
            openNotificationMenu={handleNotificationDrawerOpen}
          /> */}
          <Stack
            width={"100%"}
            height={"100%"}
            sx={{
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Stack>
        </Stack>
      </Box>

      <Drawer
        elevation={0}
        onClose={handleNotificationDrawerClose}
        open={notificationMenuOpen}
        anchor="right"
      >
        <Stack
          py={2.5}
          px={2}
          width={300}
          height="100%"
          alignItems={"center"}
          justifyContent="flex-start"
        >
          <Typography variant="body1" fontSize={18} fontWeight={600}>
            Notifications
          </Typography>
        </Stack>
      </Drawer>
    </Stack>
  );
}
