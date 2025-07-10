import React, { useState, type JSX } from "react";
import {
  Menu,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  useTheme,
  Button,
  buttonClasses,
  svgIconClasses,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDocConfig } from "../context/DocsConfigContext";

// Optional: Labels for layout keys
const layoutLabels: Record<string, string> = {
  tableOfContents: "Table of Contents",
  comments: "Comments",
  pageSetup: "Page Setup",
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
        onClick={() => updateSetting({ section: "layout", key }, !checked)}
      >
        <ListItemIcon>
          <Checkbox
            sx={{ p: 0 }}
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => updateSetting({ section: "layout", key }, !checked)}
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
          px: 2,
          py: 1,
          minWidth: "fit-content",
          height: "100%",
          fontSize: 14,
          color: theme.palette.text.primary,
          [`& .${buttonClasses.startIcon} .${svgIconClasses.root}`]: {
            fontSize: 16,
          },
          [`& .${buttonClasses.endIcon} .${svgIconClasses.root}`]: {
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
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
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
