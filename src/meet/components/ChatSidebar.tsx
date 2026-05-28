// External
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";


// MUI
import { Send as SendIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Stack,
  Paper,
  Avatar,
  Divider,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";


// Shared
import TextInput from "../../shared/inputs/TextInput";


// Parent, Sibling, Index
import type { ChatMessage } from "../../types/meet/meeting.types";

interface ChatSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  onClose,
  messages,
  onSendMessage,
}) => {
  const theme = useTheme();

  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 350,
        // height: "100%",
        display: "flex",
        // flexGrow: 1,
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Typography variant="h4" fontWeight={600}>
          Chat
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Stack>

      {/* Messages */}
      <Box
        sx={{
          p: 1,
          gap: 1,
          flexGrow: 1,
          display: "flex",
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Box key={message.id}>
              {message.type === "system" ? (
                <Box sx={{ py: 1, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {message.message}
                  </Typography>
                </Box>
              ) : (
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.9rem" }}>
                    {message.senderName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" fontWeight={600}>
                        {message.senderName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {moment(message.timestamp).format("HH:mm")}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {message.message}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Message Input */}
      <Stack direction="row" gap={1} sx={{ p: 2 }}>
        <TextInput
          name="meetingChat"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(meetingChatValue) =>
            setNewMessage(meetingChatValue as string)
          }
        />
        <IconButton
          size="small"
          onClick={handleSendMessage}
          sx={{
            width: 32,
            flexShrink: 0,
            color: "white",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <SendIcon
            fontSize="small"
            sx={{
              fontSize: 15,
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default ChatSidebar;
