import {
  IconButton,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import UserAvatar from "../../shared/UserAvatar";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const DocComment = () => {
  const theme: Theme = useTheme();
  return (
    <Stack
      spacing={1}
      width={"100%"}
      sx={{
        borderRadius: theme.shape.radius.xs,
        p: 2,
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[1],
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={2}
        >
          <UserAvatar width={28} username="chijcdjcd" />
          <Stack>
            <Typography variant="body1" fontSize={14} fontWeight={600}>
              chijcdjcd
            </Typography>
            <Typography variant="body1" fontSize={11} fontWeight={400}>
              12:39 PM Today
            </Typography>
          </Stack>
        </Stack>
        <Stack
          gap={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton sx={{ p: 0.5 }}>
            <CheckOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
          <IconButton sx={{ p: 0.5 }}>
            <MoreVertOutlinedIcon
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="body1" fontSize={14} fontWeight={400}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        </Typography>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

export default DocComment;
