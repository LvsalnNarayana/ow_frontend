// External
import { type JSX } from "react";
import { useNavigate } from "react-router";


// MUI
import {
  Box,
  Tooltip,
  Collapse,
  MenuItem,
  useTheme,
  Typography,
  ListItemIcon,
  ListItemText,
  tooltipClasses,
  buttonBaseClasses,
  listItemIconClasses,
} from "@mui/material";


// Parent, Sibling, Index
import type { NavigationDataType } from "../../data/navigationData";

const SidebarMenuItem = ({
  menu,
  open,
  active,
}: {
  menu: NavigationDataType;
  open: boolean;
  active: boolean;
}): JSX.Element => {
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <Tooltip
      disableHoverListener={open}
      disableFocusListener={open}
      disableTouchListener={open}
      title={menu.name}
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            [`&.${tooltipClasses.tooltip}`]: {
              p: 1,
            },
          },
        },
      }}
    >
      <MenuItem
        disableRipple
        disableGutters
        disableTouchRipple
        selected={active}
        sx={{
          width: open ? "100%" : "fit-content",
          mb: 1,
          px: 1,
          py: 1,
          borderRadius: 1,
          display: "flex",
          gap: open ? 2 : 0,
          textAlign: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          [`&:hover`]: {
            backgroundColor: `${theme.palette.primary.main}40`,
          },
          [`&.Mui-selected`]: {
            backgroundColor: `${theme.palette.primary.main}60`,
          },
          [`&:hover.Mui-selected`]: {
            backgroundColor: `${theme.palette.primary.main}60`,
          },
          [`&.${buttonBaseClasses.root} .${listItemIconClasses.root}`]: {
            minWidth: "auto",
            marginRight: 0,
          },
          transition: theme.transitions.create(["gap", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
        onClick={() => {
          navigate(`/${menu.href}`);
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "auto",
            p: 0,
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={`/images/${menu.icon}`}
            alt="Logo"
            sx={{
              width: "25px",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </ListItemIcon>

        <Collapse
          in={open}
          easing={theme.transitions.easing.sharp}
          timeout={theme.transitions.duration.enteringScreen}
          orientation="horizontal"
        >
          <ListItemText>
            <Typography variant="body1" fontSize={14} fontWeight={600}>
              {menu.name}
            </Typography>
          </ListItemText>
        </Collapse>
      </MenuItem>
    </Tooltip>
  );
};

export default SidebarMenuItem;
