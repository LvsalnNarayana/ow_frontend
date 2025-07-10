import { Stack, useTheme } from "@mui/material";
const PageLayout = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: "95%",
        backgroundColor: theme?.palette?.common?.white,
        aspectRatio: "210/297",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    ></Stack>
  );
};

export default PageLayout;
