// External
import { useParams, useNavigate } from "react-router";


// MUI
import {
  Box,
  Stack,
  useTheme,
  Typography,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";


// Shared
import UserAvatar from "../../shared/UserAvatar";

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
        py: 1,
        px: 1.5,
        borderRadius: 1,
        overflow: "hidden",
        boxSizing: "border-box",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
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
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
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
