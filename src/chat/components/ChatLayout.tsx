import {
  Box,
  Divider,
  List,
  listItemButtonClasses,
  Stack,
  Typography,
} from "@mui/material";
import ChatItem from "./ChatItem";
import TextInput from "../../shared/inputs/TextInput";
import { Outlet, useParams } from "react-router";

const ChatLayout = () => {
  const { chatId } = useParams();
  console.log(chatId);

  return (
    <Stack
      width="100%"
      height="100%"
      sx={{
        overflow: "hidden",
        position: "relative",
      }}
      gap={1}
    >
      {/* Header */}
      <Typography variant="h3" px={2}>
        Chat
      </Typography>
      <Divider sx={{ mt: 0.5 }} />

      {/* Main Content */}
      <Stack direction="row" flexGrow={1} height="100%" overflow="hidden">
        {/* Sidebar */}
        <Stack
          width={450}
          height="100%"
          gap={2}
          sx={{
            overflowY: "auto",
            px: 1,
          }}
        >
          <TextInput
            name="search_contacts"
            value=""
            placeholder="Search contacts"
            onChange={() => {}}
          />
          <List
            disablePadding
            sx={{
              [`& .${listItemButtonClasses.root}`]: {
                mb: 1,
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, idx) => (
              <ChatItem key={idx} username={`username${idx}`} />
            ))}
          </List>
        </Stack>
        <Divider orientation="vertical" flexItem />
        {/* Chat content area */}
        {chatId === undefined || chatId === null ? (
          <Stack
            width="100%"
            height="100%"
            p={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box component={"img"} width={300} src="/images/chat_bg.svg" />
            <Typography variant="h2" color="text.secondary">
              Select a conversation
            </Typography>
          </Stack>
        ) : (
          <Outlet />
        )}
      </Stack>
    </Stack>
  );
};

export default ChatLayout;
