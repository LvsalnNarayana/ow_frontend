// External
import React, { type JSX } from "react";


// MUI
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";


// Shared
import ButtonMenu from "../../../shared/ButtonMenu";

const TextStylesMenu: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      onClick: () => {},
      value: "Normal Text",
      icon: <SubjectOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Heading 1",
      icon: <span style={{ fontSize: 12 }}>H1</span>,
    },
    {
      onClick: () => {},
      value: "Heading 2",
      icon: <span style={{ fontSize: 12 }}>H2</span>,
    },
    {
      onClick: () => {},
      value: "Heading 3",
      icon: <span style={{ fontSize: 12 }}>H3</span>,
    },
    {
      onClick: () => {},
      value: "Heading 4",
      icon: <span style={{ fontSize: 12 }}>H4</span>,
    },
    {
      onClick: () => {},
      value: "Heading 5",
      icon: <span style={{ fontSize: 12 }}>H5</span>,
    },
    {
      onClick: () => {},
      value: "Heading 6",
      icon: <span style={{ fontSize: 12 }}>H6</span>,
    },
    {
      value: "Quote",
      onClick: () => {},
      icon: <FormatQuoteOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Bulleted List",
      icon: <FormatListBulletedOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Numbered List",
      icon: <FormatListNumberedOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "To-do List",
      icon: <CheckBoxOutlinedIcon />,
    },
    {
      value: "Code",
      onClick: () => {},
      icon: <CodeOutlinedIcon />,
    },
  ];

  return (
    <>
      <ButtonMenu
        value={"Normal Text"}
        startIcon={<SubjectOutlinedIcon />}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default TextStylesMenu;
