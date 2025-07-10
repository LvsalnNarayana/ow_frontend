import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatIndentIncreaseOutlinedIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import FormatIndentDecreaseOutlinedIcon from "@mui/icons-material/FormatIndentDecreaseOutlined";
import ButtonMenu from "../../../shared/ButtonMenu";
import type React from "react";
import type { JSX } from "react";

const FontAligner: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      value: "Left Align",
      icon: <FormatAlignLeftOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Right Align",
      icon: <FormatAlignRightOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Center Align",
      icon: <FormatAlignCenterOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Justify Align",
      icon: <FormatAlignJustifyOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Increase Indent",
      icon: <FormatIndentIncreaseOutlinedIcon />,
      onClick: () => {},
    },
    {
      value: "Decrease Indent",
      icon: <FormatIndentDecreaseOutlinedIcon />,
      onClick: () => {},
    },
  ];

  return (
    <>
      <ButtonMenu
        value={"Left Align"}
        startIcon={<FormatAlignLeftOutlinedIcon />}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default FontAligner;
