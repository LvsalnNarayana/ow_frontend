import {
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
  Box,
  ListItemButton,
} from "@mui/material";
import UserAvatar from "../../shared/UserAvatar";
import { useNavigate, useParams } from "react-router";

const ChatItem = ({ username }: { username: string }) => {
  const theme = useTheme();
  const { chatId } = useParams();
  const navigate = useNavigate();

  return (
    <ListItemButton
      selected={username === chatId}
      disableGutters
      onClick={() => navigate(`/chat/${username}`)}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        px: 1.5,
        py: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <ListItemIcon sx={{ mr: 2 }}>
        <UserAvatar width={40} username={username} />
      </ListItemIcon>

      <Box flex={1} overflow="hidden">
        <Stack gap={0.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" fontSize={16} fontWeight={600}>
              {username}
            </Typography>
            <Typography variant="caption" fontSize={10}>
              12:00
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            fontSize={14}
            noWrap
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            hello world!! this is amazing and awesome at the same time
          </Typography>
        </Stack>
      </Box>
    </ListItemButton>
  );
};

export default ChatItem;
