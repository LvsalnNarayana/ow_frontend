import React, { useState } from "react";
import { Stack } from "@mui/material";
import AboutItemContent from "./AnoutItemContent";
import VerificationStatus from "./VerificationStatus";
import AboutItemActions from "./AboutItemActions";
import AboutItemMenu from "./AboutItemMenu";
import AboutItemEditor from "./AboutItemEditor";
import type { AboutItemProps, AboutItemType } from "../../types/aboutMenu.types";

const AboutItem: React.FC<AboutItemProps> = ({ type, Icon, data }) => {
  const [editItem, setEditItem] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const menuOpen = Boolean(menuAnchor);

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    setEditItem(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleDelete = () => {
    // Implement delete logic
    console.log(`Delete ${type}`);
    handleCloseMenu();
  };

  const handleVerify = () => {
    // Implement verify logic
    console.log(`Verify ${type}`);
    handleCloseMenu();
  };

  if (editItem) {
    return (
      <AboutItemEditor
        type={type as AboutItemType}
        data={data}
        onCancel={() => setEditItem(false)}
      />
    );
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <AboutItemContent type={type as AboutItemType} data={data} Icon={Icon} />

      <Stack
        gap={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <VerificationStatus type={type as AboutItemType} data={data} />

        <AboutItemActions
          type={type as AboutItemType}
          onEdit={handleEdit}
          onMenuOpen={handleMenuOpen}
        />

        <AboutItemMenu
          type={type as AboutItemType}
          data={data}
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleCloseMenu}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onVerify={handleVerify}
        />
      </Stack>
    </Stack>
  );
};

export default AboutItem;
