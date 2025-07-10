import { useState, useCallback, useEffect } from "react";
import type {
  Participant,
  ChatMessage,
  MeetingSettings,
  MeetingInfo,
} from "../../types/meet/meeting.types";

export const useMeetingRoom = (roomId: string) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
  const [settings, setSettings] = useState<MeetingSettings>({
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isRecording: false,
    isChatOpen: false,
    isParticipantsOpen: false,
    isFullScreen: false,
    layout: "grid",
    backgroundBlur: false,
  });

  // Mock data initialization
  useEffect(() => {
    // Initialize mock data
    const mockCurrentUser: Participant = {
      id: "current-user",
      name: "You",
      email: "you@example.com",
      isHost: true,
      isMuted: false,
      isVideoOn: true,
      isScreenSharing: false,
      isHandRaised: false,
      joinedAt: new Date(),
      connectionStatus: "connected",
    };

    const mockParticipants: Participant[] = [
      mockCurrentUser,
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        isHost: false,
        isMuted: true,
        isVideoOn: true,
        isScreenSharing: false,
        isHandRaised: false,
        joinedAt: new Date(Date.now() - 300000),
        connectionStatus: "connected",
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        isHost: false,
        isMuted: false,
        isVideoOn: false,
        isScreenSharing: false,
        isHandRaised: true,
        joinedAt: new Date(Date.now() - 600000),
        connectionStatus: "connected",
      },
    ];

    const mockMeetingInfo: MeetingInfo = {
      id: roomId,
      title: "Team Meeting",
      startTime: new Date(Date.now() - 900000),
      duration: 0,
      hostId: "current-user",
      isRecording: false,
    };

    setCurrentUser(mockCurrentUser);
    setParticipants(mockParticipants);
    setMeetingInfo(mockMeetingInfo);
  }, [roomId]);

  const toggleMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    if (currentUser) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === currentUser.id ? { ...p, isMuted: !settings.isMuted } : p
        )
      );
    }
  }, [currentUser, settings.isMuted]);

  const toggleVideo = useCallback(() => {
    setSettings((prev) => ({ ...prev, isVideoOn: !prev.isVideoOn }));
    if (currentUser) {
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === currentUser.id ? { ...p, isVideoOn: !settings.isVideoOn } : p
        )
      );
    }
  }, [currentUser, settings.isVideoOn]);

  const toggleScreenShare = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing,
    }));
  }, []);

  const toggleRecording = useCallback(() => {
    setSettings((prev) => ({ ...prev, isRecording: !prev.isRecording }));
    if (meetingInfo) {
      setMeetingInfo((prev) =>
        prev ? { ...prev, isRecording: !settings.isRecording } : null
      );
    }
  }, [meetingInfo, settings.isRecording]);

  const toggleChat = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isChatOpen: !prev.isChatOpen,
      isParticipantsOpen: false,
    }));
  }, []);

  const toggleParticipants = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isParticipantsOpen: !prev.isParticipantsOpen,
      isChatOpen: false,
    }));
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!currentUser || !message.trim()) return;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        message: message.trim(),
        timestamp: new Date(),
        type: "text",
      };

      setChatMessages((prev) => [...prev, newMessage]);
    },
    [currentUser]
  );

  const leaveMeeting = useCallback(() => {
    // Handle leave meeting logic
    window.location.href = "/meet";
  }, []);

  return {
    participants,
    chatMessages,
    currentUser,
    meetingInfo,
    settings,
    toggleMute,
    toggleVideo,
    toggleScreenShare,
    toggleRecording,
    toggleChat,
    toggleParticipants,
    sendMessage,
    leaveMeeting,
    setSettings,
  };
};
