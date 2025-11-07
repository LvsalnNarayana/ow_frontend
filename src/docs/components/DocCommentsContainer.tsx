// External
import type { JSX } from "react";


// MUI
import {
  Stack,
  Divider,
  useTheme,
  Typography,
  type Theme,
} from "@mui/material";


// Parent, Sibling, Index
import DocComment from "./DocComment";

const DocCommentsContainer = (): JSX.Element => {
  const theme: Theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        p: 1,
        top: 0,
        flexGrow: 1,
        zIndex: 100,
        maxHeight: "100%",
        position: "sticky",
        borderRadius: theme.shape.radius.xs,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" textAlign="center">
        Comments
      </Typography>
      <Divider />
      <Stack sx={{ position: "relative" }}>
        <DocComment />
      </Stack>
    </Stack>
  );
};

export default DocCommentsContainer;
