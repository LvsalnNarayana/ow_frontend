// External
import React, { useState, type JSX } from "react";


// MUI
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Menu,
  Button,
  MenuItem,
  Checkbox,
  useTheme,
  ListItemIcon,
  ListItemText,
  buttonClasses,
  svgIconClasses,
} from "@mui/material";


// Context
import { useDocConfig } from "../context/DocsConfigContext";

// Optional: Labels for layout keys
const layoutLabels: Record<string, string> = {
  comments: "Comments",
  pageSetup: "Page Setup",
  tableOfContents: "Table of Contents",
};

const DocSettingsMenu: React.FC = (): JSX.Element => {
  const theme = useTheme();

  const { settings, updateSetting } = useDocConfig();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const renderLayoutItem = (key: string, checked: boolean) => {
    const label = layoutLabels[key] ?? key;

    return (
      <MenuItem
        key={key}
        onClick={() => updateSetting({ key, section: "layout" }, !checked)}
      >
        <ListItemIcon>
          <Checkbox
            sx={{ p: 0 }}
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => updateSetting({ key, section: "layout" }, !checked)}
          />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </MenuItem>
    );
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        variant="text"
        sx={{
          minWidth: "fit-content",
          px: 2,
          py: 1,
          fontSize: 14,
          height: "100%",
          color: theme.palette.text.primary,
          [`& .${buttonClasses.endIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
          [`& .${buttonClasses.startIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
        }}
      >
        <SettingsOutlinedIcon />
      </Button>

      <Menu
        PaperProps={{
          sx: {
            marginTop: 0.5,
            boxShadow: theme.shadows[1],
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {Object.entries(settings.layout).map(([key, value]) =>
          renderLayoutItem(key, value)
        )}
      </Menu>
    </>
  );
};

export default DocSettingsMenu;
