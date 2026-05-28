// External
import { useState } from "react";
import { Outlet } from "react-router";


// MUI
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Stack, Drawer, type Theme, Typography } from "@mui/material";


// Parent, Sibling, Index
import MenuSidebar from "../components/menuSidebar/MenuSidebar";

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
  position: "relative",
  transition: theme?.transitions?.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme) => ({
  width: "60px",
  overflowX: "hidden",
  position: "relative",
  transition: theme?.transitions?.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const MenuDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: "fit-content",
  flexShrink: 0,
  overflow: "hidden",
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
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
          border: "none",
          backgroundColor: theme.palette.background.paper,
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
      <Box component="main" sx={{ p: 2, flexGrow: 1, overflowY: "hidden" }}>
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
