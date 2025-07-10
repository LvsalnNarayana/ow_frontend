import React, { type JSX } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FormatSizeOutlinedIcon from "@mui/icons-material/FormatSizeOutlined";
import StrikethroughSOutlinedIcon from "@mui/icons-material/StrikethroughSOutlined";
import SubscriptOutlinedIcon from "@mui/icons-material/SubscriptOutlined";
import SuperscriptOutlinedIcon from "@mui/icons-material/SuperscriptOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ButtonMenu from "../../../shared/ButtonMenu";
const TextTransformer: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      value: "Lower Case",
      icon: <span style={{ fontSize: 10 }}>abc</span>,
      onClick: () => {},
    },
    {
      value: "Upper Case",
      icon: <span style={{ fontSize: 9 }}>ABC</span>,
      onClick: () => {},
    },
    {
      value: "Capitalize",
      icon: <span style={{ fontSize: 10 }}>Abc</span>,
      onClick: () => {},
    },
    {
      value: "Strikethrough",
      icon: <StrikethroughSOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Subscript",
      icon: <SubscriptOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Superscript",
      icon: <SuperscriptOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Highlight",
      icon: <BrushOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Clear Formatting",
      icon: <DeleteOutlinedIcon />,
      onClick: () => {},
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
