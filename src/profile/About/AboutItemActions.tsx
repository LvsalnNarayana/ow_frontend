import React from "react";
import { Stack, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChangeAudience from "../../shared/ChangeAudience";
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
