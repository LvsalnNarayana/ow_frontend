// MUI
import { List, Stack, Divider } from "@mui/material";


// Shared
import TextInput from "../../shared/inputs/TextInput";


// Parent, Sibling, Index
import Message from "../../chat/components/Message";
import UserInfoToolbar from "../../chat/components/UserInfoToolbar";

const ChatRoom = () => {
  return (
    <Stack gap={1} flexGrow={1} px={2}>
      <UserInfoToolbar />
      <Divider />
      <List
        sx={{
          width: "100%",
          gap: 1,
          flexGrow: 1,
          display: "flex",
          overflowY: "auto",
          flexDirection: "column-reverse",
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
