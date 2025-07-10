import React from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import type { AboutItemType } from "../../types/aboutMenu.types";
import type { Work } from "../../types/user/work.types";
import type { Education } from "../../types/user/education.types";
import type { Email, Phone } from "../../types/user/user.types";
import type { Place, UserPlace } from "../../types/place/place.types";
import type { Gender } from "../../types/base/gender.types";
import type { Birthdate, Relationship } from "../../types/user/userInfo.types";

interface AboutItemMenuProps {
  type: AboutItemType;
  data:
    | Work
    | Education
    | Email
    | Place
    | Phone
    | Gender
    | Birthdate
    | Relationship
    | UserPlace;
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
  anchorEl,
  open,
  onClose,
  onEdit,
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
          mt: 1,
          width: "auto",
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
