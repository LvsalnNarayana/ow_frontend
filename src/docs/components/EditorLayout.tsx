import { Divider, Stack } from "@mui/material";
import EditorToolbar from "./EditorToolbar";
import PageLayout from "./PageLayout";
import TableOfContents from "./TableOfContents";
import type { JSX } from "react";
import DocToolbar from "./DocToolbar";
import DocCommentsContainer from "./DocCommentsContainer";
import { useDocConfig } from "../context/DocsConfigContext";

const EditorLayout: React.ElementType = (): JSX.Element => {
  const { settings } = useDocConfig();

  // Dynamically construct grid columns
  const gridTemplateColumns = [
    "250px",
    `minmax(${
      settings?.document?.zoom >= 75
        ? settings?.document?.zoom - 60
        : settings?.document?.zoom
    }%, auto)`,
    "300px",
  ].join(" ");
  return (
    <Stack
      width="100%"
      height="100%"
      gap={1}
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <DocToolbar />
      <Divider />
      <EditorToolbar />

      <Stack
        width="100%"
        flexGrow={1}
        display="grid"
        gap={2}
        // gridTemplateColumns={`250px minmax(${settings?.document?.zoom}, auto) 300px`}
        gridTemplateColumns={gridTemplateColumns}
        sx={{
          position: "relative",
          overflowY: "hidden",
          overflowX: "auto",
        }}
      >
        {/* Left Sidebar */}
        <Stack sx={{ height: "100%", overflowY: "auto" }}>
          {settings?.layout?.tableOfContents && <TableOfContents />}
        </Stack>

        {/* Center Page Content with Zoom */}
        <Stack
          width="100%"
          height="100%"
          sx={{
            mt: 1,
            overflowY: "auto",
          }}
          justifyContent="center"
          alignItems="center"
          gap={3}
        >
          {/* <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top center",
              width: "100%",
            }}
          > */}
          <PageLayout />
          <PageLayout />
          <PageLayout />
          {/* </div> */}
        </Stack>

        {/* Right Sidebar */}
        <Stack sx={{ height: "100%", overflowY: "auto" }}>
          {settings?.layout?.comments && <DocCommentsContainer />}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EditorLayout;
