import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Paper,
  Avatar,
  Divider,
  useTheme,
} from "@mui/material";
import { Send as SendIcon, Close as CloseIcon } from "@mui/icons-material";
import type { ChatMessage } from "../../types/meet/meeting.types";
import moment from "moment";
import TextInput from "../../shared/inputs/TextInput";

interface ChatSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  messages,
  onSendMessage,
  onClose,
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
          flexGrow: 1,
          overflowY: "auto",
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.secondary",
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
                <Box sx={{ textAlign: "center", py: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {message.message}
                  </Typography>
                </Box>
              ) : (
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Avatar sx={{ width: 32, height: 32, fontSize: "0.9rem" }}>
                    {message.senderName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
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
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        mt: 0.5,
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
            backgroundColor: theme.palette.primary.main,
            color: "white",
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
