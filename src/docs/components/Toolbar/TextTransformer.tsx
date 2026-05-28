// External
import React, { type JSX } from "react";


// MUI
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SubscriptOutlinedIcon from "@mui/icons-material/SubscriptOutlined";
import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined";
import SuperscriptOutlinedIcon from "@mui/icons-material/SuperscriptOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";


// Shared
import ButtonMenu from "../../../shared/ButtonMenu";

const TextTransformer: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      onClick: () => {},
      value: "Lower Case",
      icon: <span style={{ fontSize: 10 }}>abc</span>,
    },
    {
      onClick: () => {},
      value: "Upper Case",
      icon: <span style={{ fontSize: 9 }}>ABC</span>,
    },
    {
      onClick: () => {},
      value: "Capitalize",
      icon: <span style={{ fontSize: 10 }}>Abc</span>,
    },
    {
      onClick: () => {},
      value: "Strikethrough",
      icon: <StrikethroughSOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Subscript",
      icon: <SubscriptOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Superscript",
      icon: <SuperscriptOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Highlight",
      icon: <BrushOutlinedIcon />,
    },
    {
      onClick: () => {},
      value: "Clear Formatting",
      icon: <DeleteOutlinedIcon />,
    },
  ];

  return (
    <>
      <ButtonMenu
        value={<FormatSizeOutlinedIcon />}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default TextTransformer;
