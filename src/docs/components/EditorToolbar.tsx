import {
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import TextStylesMenu from "./Toolbar/TextStylesMenu";
import FontFamilyMenu from "./Toolbar/FontFamilyMenu";
import FontSizer from "./Toolbar/FontSizer";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatUnderlinedOutlinedIcon from "@mui/icons-material/FormatUnderlinedOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import FontAligner from "./Toolbar/FontAligner";
import TextTransformer from "./Toolbar/TextTransformer";
import InsertNodeMenu from "./Toolbar/InsertNodeMenu";
import ZoomControllerMenu from "./Toolbar/ZoomControllerMenu";
import ButtonMenu from "../../shared/ButtonMenu";

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
        borderBottom: `1px solid ${theme?.palette?.divider}`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderRadius: 5,
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
            color: theme?.palette?.text?.secondary,
            border: "none",
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
            color: theme?.palette?.text?.secondary,
            border: "none",
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
            color: theme?.palette?.text?.secondary,
            border: "none",
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
            color: theme?.palette?.text?.secondary,
            border: "none",
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
            color: theme?.palette?.text?.secondary,
            border: "none",
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
          color: theme?.palette?.text?.secondary,
          border: "none",
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
          color: theme?.palette?.text?.secondary,
          border: "none",
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
