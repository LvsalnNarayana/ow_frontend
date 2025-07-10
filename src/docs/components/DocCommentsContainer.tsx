import {
  Divider,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import DocComment from "./DocComment";
const DocCommentsContainer = () => {
  const theme: Theme = useTheme();

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        width: "100%",
        maxHeight: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.radius.xs,
        position: "sticky",
        flexGrow: 1,
        top: 0,
        zIndex: 100,
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
