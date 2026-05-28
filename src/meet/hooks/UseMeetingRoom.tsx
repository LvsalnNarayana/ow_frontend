// External
import { useState, useEffect, useCallback } from "react";


// Parent, Sibling, Index
import type {
  Participant,
  ChatMessage,
  MeetingInfo,
  MeetingSettings,
} from "../../types/meet/meeting.types";

export const useMeetingRoom = (roomId: string) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [currentUser, setCurrentUser] = useState<Participant | null>(null);

  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);

  const [settings, setSettings] = useState<MeetingSettings>({
    isVideoOn: true,
    isMuted: false,
    layout: "grid",
    isChatOpen: false,
    isRecording: false,
    isFullScreen: false,
    backgroundBlur: false,
    isScreenSharing: false,
    isParticipantsOpen: false,
  });

  // Mock data initialization
  useEffect(() => {
    // Initialize mock data
    const mockCurrentUser: Participant = {
      isVideoOn: true,
      id: "current-user",
      name: "You",
      isHost: true,
      isMuted: false,
      isHandRaised: false,
      joinedAt: new Date(),
      isScreenSharing: false,
      email: "you@example.com",
      connectionStatus: "connected",
    };

    const mockParticipants: Participant[] = [
      mockCurrentUser,
      {
        id: "user-1",
        isVideoOn: true,
        isHost: false,
        isMuted: true,
        name: "John Doe",
        isHandRaised: false,
        isScreenSharing: false,
        email: "john@example.com",
        connectionStatus: "connected",
        joinedAt: new Date(Date.now() - 300000),
      },
      {
        id: "user-2",
        isVideoOn: false,
        isHost: false,
        isMuted: false,
        name: "Jane Smith",
        isHandRaised: true,
        isScreenSharing: false,
        email: "jane@example.com",
        connectionStatus: "connected",
        joinedAt: new Date(Date.now() - 600000),
      },
    ];

    const mockMeetingInfo: MeetingInfo = {
      id: roomId,
      duration: 0,
      isRecording: false,
      title: "Team Meeting",
      hostId: "current-user",
      startTime: new Date(Date.now() - 900000),
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
      isParticipantsOpen: false,
      isChatOpen: !prev.isChatOpen,
    }));
  }, []);

  const toggleParticipants = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isChatOpen: false,
      isParticipantsOpen: !prev.isParticipantsOpen,
    }));
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!currentUser || !message.trim()) return;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "text",
        timestamp: new Date(),
        message: message.trim(),
        senderId: currentUser.id,
        senderName: currentUser.name,
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
    toggleVideo,
    settings,
    toggleMute,
    toggleChat,
    currentUser,
    meetingInfo,
    sendMessage,
    setSettings,
    participants,
    chatMessages,
    leaveMeeting,
    toggleRecording,
    toggleScreenShare,
    toggleParticipants,
  };
};
