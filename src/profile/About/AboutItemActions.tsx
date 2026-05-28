// External
import React from "react";


// MUI
import { Stack, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


// Shared
import ChangeAudience from "../../shared/ChangeAudience";


// Parent, Sibling, Index
import type { AboutItemType } from "../../types/aboutMenu.types";

interface AboutItemActionsProps {
  type: AboutItemType;
  onEdit: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

const AboutItemActions: React.FC<AboutItemActionsProps> = ({
  type,
  onEdit,
  onMenuOpen,
}) => {
  const isDirectEditType = ["gender", "birthday", "relationship"].includes(
    type
  );

  return (
    <Stack
      gap={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <ChangeAudience />

      {isDirectEditType ? (
        <IconButton disableRipple onClick={onEdit}>
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      ) : (
        <IconButton disableRipple onClick={onMenuOpen}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      )}
    </Stack>
  );
};

export default AboutItemActions;
