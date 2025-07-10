import { useState, useCallback } from "react";
import type { MeetDashboardState } from "../../types/meet/meeting.types";
import { useNavigate } from "react-router";

export const useMeetingOperations = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<MeetDashboardState>({
    roomId: "",
    isCreatingMeeting: false,
    isJoiningMeeting: false,
    error: null,
    recentMeetings: [],
  });

  const updateState = useCallback((updates: Partial<MeetDashboardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const createMeeting = useCallback(async () => {
    updateState({ isCreatingMeeting: true, error: null });

    try {
      // Simulate API call
      const newRoomId = `room_${Date.now()}`;

      // In real implementation, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(`/meet/room/${newRoomId}`);
    } catch (error) {
      updateState({
        error: "Failed to create meeting. Please try again.",
        isCreatingMeeting: false,
      });
    }
  }, [navigate, updateState]);

  const joinMeeting = useCallback(
    async (roomId: string) => {
      if (!roomId.trim()) {
        updateState({ error: "Please enter a valid room ID" });
        return;
      }

      updateState({ isJoiningMeeting: true, error: null });

      try {
        // Simulate API call to validate room
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In real implementation, validate room exists
        navigate(`/meet/room/${roomId.trim()}`);
      } catch (error) {
        updateState({
          error: "Room not found or invalid room ID",
          isJoiningMeeting: false,
        });
      }
    },
    [navigate, updateState]
  );

  const setRoomId = useCallback(
    (roomId: string) => {
      updateState({ roomId, error: null });
    },
    [updateState]
  );

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  return {
    state,
    createMeeting,
    joinMeeting,
    setRoomId,
    clearError,
  };
};
