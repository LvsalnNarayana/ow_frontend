import React from "react";
import { Stack, Typography } from "@mui/material";
import UserAvatar from "../../shared/UserAvatar";
import type { User } from "../../types/meet/meeting.types";

interface UserGreetingProps {
  user: User;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Stack spacing={2} alignItems="center" textAlign="center">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <Typography variant="h4" fontWeight={600}>
          {getGreeting()},
        </Typography>
        <UserAvatar username={user.username} width={30} />
        <Typography variant="h4" fontWeight={600}>
          @{user.username}
        </Typography>
      </Stack>

      <Typography
        variant="body1"
        fontSize={18}
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Ready to connect with your team?
      </Typography>
    </Stack>
  );
};

export default UserGreeting;
