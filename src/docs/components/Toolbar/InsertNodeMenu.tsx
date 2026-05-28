// External
import React, { type JSX } from "react";


// MUI
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";


// Shared
import ButtonMenu from "../../../shared/ButtonMenu";

const InsertNodeMenu: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      onclick: () => {},
      value: "Horizontal Rule",
      icon: <InsertPageBreakOutlinedIcon />,
    },
    {
      onclick: () => {},
      value: "Page Break",
      icon: <ContentCutOutlinedIcon />,
    },
    {
      value: "Image",
      onclick: () => {},
      icon: <BrokenImageOutlinedIcon />,
    },
    {
      value: "GIF",
      onclick: () => {},
      icon: <GifBoxOutlinedIcon />,
    },
    {
      value: "Table",
      onclick: () => {},
      icon: <TableViewOutlinedIcon />,
    },
    {
      value: "Poll",
      onclick: () => {},
      icon: <BallotOutlinedIcon />,
    },
    {
      onclick: () => {},
      value: "Column View",
      icon: <ViewWeekOutlinedIcon />,
    },
    {
      value: "Quote",
      onclick: () => {},
      icon: <FormatQuoteOutlinedIcon />,
    },
    {
      value: "Code",
      onclick: () => {},
      icon: <CodeOutlinedIcon />,
    },
    {
      value: "Divider",
      onclick: () => {},
      icon: <HorizontalRuleOutlinedIcon />,
    },
    {
      value: "Embed",
      onclick: () => {},
      icon: <WebOutlinedIcon />,
    },
    {
      value: "Video",
      onclick: () => {},
      icon: <OndemandVideoOutlinedIcon />,
    },
    {
      onclick: () => {},
      value: "Collapsible Container",
      icon: <ArrowRightOutlinedIcon />,
    },
  ];

  return (
    <>
      <ButtonMenu
        value={"Insert"}
        startIcon={<AddOutlinedIcon />}
        endIcon={<KeyboardArrowDownOutlinedIcon />}
        menu={menu}
      />
    </>
  );
};

export default InsertNodeMenu;
