import React, { type JSX } from "react";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import InsertPageBreakOutlinedIcon from "@mui/icons-material/InsertPageBreakOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ButtonMenu from "../../../shared/ButtonMenu";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";

const InsertNodeMenu: React.ElementType = (): JSX.Element => {
  const menu = [
    {
      value: "Horizontal Rule",
      icon: <InsertPageBreakOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Page Break",
      icon: <ContentCutOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Image",
      icon: <BrokenImageOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "GIF",
      icon: <GifBoxOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Table",
      icon: <TableViewOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Poll",
      icon: <BallotOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Column View",
      icon: <ViewWeekOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Quote",
      icon: <FormatQuoteOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Code",
      icon: <CodeOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Divider",
      icon: <HorizontalRuleOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Embed",
      icon: <WebOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Video",
      icon: <OndemandVideoOutlinedIcon />,
      onclick: () => {},
    },
    {
      value: "Collapsible Container",
      icon: <ArrowRightOutlinedIcon />,
      onclick: () => {},
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
