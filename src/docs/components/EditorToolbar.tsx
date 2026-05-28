// MUI
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import {
  Stack,
  Divider,
  useTheme,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";


// Shared
import ButtonMenu from "../../shared/ButtonMenu";


// Parent, Sibling, Index
import FontSizer from "./Toolbar/FontSizer";
import FontAligner from "./Toolbar/FontAligner";
import TextStylesMenu from "./Toolbar/TextStylesMenu";
import FontFamilyMenu from "./Toolbar/FontFamilyMenu";
import InsertNodeMenu from "./Toolbar/InsertNodeMenu";
import TextTransformer from "./Toolbar/TextTransformer";
import ZoomControllerMenu from "./Toolbar/ZoomControllerMenu";

const EditorToolbar = () => {
  const theme = useTheme();
  return (
    <Stack
      p={1}
      spacing={1}
      width={"100%"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
      bgcolor={theme?.palette?.background?.paper}
      sx={{
        top: 0,
        zIndex: 1000,
        borderRadius: 5,
        position: "sticky",
        borderBottom: `1px solid ${theme?.palette?.divider}`,
      }}
    >
      <IconButton
        sx={{
          p: 0.5,
          color: theme?.palette?.text?.secondary,
          "&:hover": {
            color: theme?.palette?.text?.primary,
          },
        }}
      >
        <UndoOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          p: 0.5,
          color: theme?.palette?.text?.secondary,
          "&:hover": {
            color: theme?.palette?.text?.primary,
          },
        }}
      >
        <RedoOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>
      <Divider orientation="vertical" />
      <TextStylesMenu />
      <Divider orientation="vertical" />
      <FontFamilyMenu />
      <Divider orientation="vertical" />
      <FontSizer />
      <Divider orientation="vertical" />
      <ToggleButtonGroup sx={{ gap: 2 }}>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{
            p: 0.5,
            border: "none",
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <FormatBoldOutlinedIcon
            sx={{
              fontSize: 24,
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{
            p: 0.5,
            border: "none",
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <FormatItalicOutlinedIcon
            sx={{
              fontSize: 24,
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{
            p: 0.5,
            border: "none",
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <FormatUnderlinedOutlinedIcon
            sx={{
              fontSize: 24,
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{
            p: 0.5,
            border: "none",
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <CodeOutlinedIcon
            sx={{
              fontSize: 24,
            }}
          />
        </ToggleButton>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{
            p: 0.5,
            border: "none",
            color: theme?.palette?.text?.secondary,
            "&:hover": {
              color: theme?.palette?.text?.primary,
            },
          }}
        >
          <InsertLinkOutlinedIcon
            sx={{
              fontSize: 24,
            }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider orientation="vertical" />
      <ToggleButton
        value="left"
        aria-label="left aligned"
        sx={{
          p: 0.5,
          border: "none",
          color: theme?.palette?.text?.secondary,
          "&:hover": {
            color: theme?.palette?.text?.primary,
          },
        }}
      >
        <FormatColorTextOutlinedIcon
          sx={{
            fontSize: 24,
          }}
        />
      </ToggleButton>
      <ToggleButton
        value="left"
        aria-label="left aligned"
        sx={{
          p: 0.5,
          border: "none",
          color: theme?.palette?.text?.secondary,
          "&:hover": {
            color: theme?.palette?.text?.primary,
          },
        }}
      >
        <FormatColorFillOutlinedIcon
          sx={{
            fontSize: 24,
          }}
        />
      </ToggleButton>
      <Divider orientation="vertical" />
      <ZoomControllerMenu />
      <Divider orientation="vertical" />
      <TextTransformer />
      <Divider orientation="vertical" />
      <InsertNodeMenu />
      <Divider orientation="vertical" />
      <FontAligner />
      <ButtonMenu
        value={"hello"}
        startIcon={<FormatColorFillOutlinedIcon />}
        menu={[{ value: "hello", onClick: () => {} }]}
      />
    </Stack>
  );
};

export default EditorToolbar;
