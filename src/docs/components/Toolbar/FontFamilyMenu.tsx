import React, { type JSX } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ButtonMenu from "../../../shared/ButtonMenu";
const FontFamilyMenu: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];

  return (
    <>
      <ButtonMenu
        value={"Arial"}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default FontFamilyMenu;
