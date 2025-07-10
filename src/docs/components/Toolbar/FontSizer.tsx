import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const FontSizer = () => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      spacing={0.75}
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
        <RemoveOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>
      <Typography
        fontSize={15}
        sx={{
          py: 0.4,
          px: 1,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
      >
        15
      </Typography>

      <IconButton
        sx={{
          p: 0.5,
          color: theme?.palette?.text?.secondary,
          "&:hover": {
            color: theme?.palette?.text?.primary,
          },
        }}
      >
        <AddOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default FontSizer;
