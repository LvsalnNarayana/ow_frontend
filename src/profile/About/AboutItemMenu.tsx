// External
import React from "react";


// MUI
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";


// Parent, Sibling, Index
import type { Email, Phone } from "../../types/user/userData.types";
import type { AboutItemData, AboutItemType } from "../../types/aboutMenu.types";

interface AboutItemMenuProps {
  type: AboutItemType;
  data: AboutItemData;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete?: () => void;
  onVerify?: () => void;
}

const AboutItemMenu: React.FC<AboutItemMenuProps> = ({
  type,
  data,
  open,
  onEdit,
  onClose,
  anchorEl,
  onDelete,
  onVerify,
}) => {
  const handleEdit = () => {
    onEdit();
    onClose();
  };

  const showVerifyOption =
    (type === "email" || type === "phone") &&
    !(data as Email | Phone)?.verified;

  return (
    <Menu
      elevation={1}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          width: "auto",
          mt: 1,
          overflow: "visible",
        },
      }}
    >
      <MenuItem sx={{ p: 1, fontSize: "13px" }} onClick={handleEdit}>
        <ListItemIcon>
          <EditOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Edit {type}
      </MenuItem>

      <MenuItem sx={{ p: 1, fontSize: "13px" }} onClick={onDelete}>
        <ListItemIcon>
          <DeleteOutlineIcon fontSize="small" />
        </ListItemIcon>
        Delete {type}
      </MenuItem>

      {showVerifyOption && (
        <MenuItem sx={{ p: 1, fontSize: "13px" }} onClick={onVerify}>
          <ListItemIcon>
            <ReportProblemIcon fontSize="small" />
          </ListItemIcon>
          Verify {type}
        </MenuItem>
      )}
    </Menu>
  );
};

export default AboutItemMenu;
