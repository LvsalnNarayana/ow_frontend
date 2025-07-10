import { Divider, Stack, Typography } from "@mui/material";
import FriendCard from "../../friends/components/FriendCard";
import TextInput from "../../shared/inputs/TextInput";

const FriendsDashboard = () => {
  return (
    <Stack gap={1}>
      <Stack
        px={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h3" fontWeight={600}>
          Friends
        </Typography>
      </Stack>
      <Divider sx={{ mt: 0.5, mb: 2 }} />
      <TextInput
        placeholder="Search"
        value=""
        onChange={() => {}}
        name="friends_search_input"
      />
      <Stack
        mt={2}
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fill, minmax(30%, 1fr))"}
        gap={2}
      >
        {
          Array.from({ length: 20 }).map((_, index) => (
            <FriendCard
              key={index}
              id={`${index + 2}`}
              fullName={`User ${index + 2}`}
              username={`user${index + 2}`}
              statusMessage="Just chilling"
              onlineStatus="offline"
              mutualFriendsCount={index + 1}
              isFavorite={false}
            />
          ))
        }
      </Stack>
    </Stack>
  );
};

export default FriendsDashboard;
