import { Divider, List, Stack } from "@mui/material";
import Message from "../../chat/components/Message";
import UserInfoToolbar from "../../chat/components/UserInfoToolbar";
import TextInput from "../../shared/inputs/TextInput";

const ChatRoom = () => {
  return (
    <Stack gap={1} flexGrow={1} px={2}>
      <UserInfoToolbar />
      <Divider />
      <List
        sx={{
          width: "100%",
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          gap: 1,
        }}
      >
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Divider
          sx={{
            my: 1,
          }}
        >
          12/12/2025
        </Divider>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </List>
      <TextInput
        name="input"
        placeholder="Type a message"
        value=""
        onChange={() => {}}
      />
    </Stack>
  );
};

export default ChatRoom;
