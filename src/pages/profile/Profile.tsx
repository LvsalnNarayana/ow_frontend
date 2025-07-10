import { Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router";
import UserAvatar from "../../shared/UserAvatar";
import UserGroup from "../../shared/UserGroup";
import About from "../../profile/About/About";

const ProfileHeader = ({ username }: { username: string }) => (
  <Stack direction={"column"} alignItems={"center"}>
    <Typography variant="body1" fontSize={40} fontWeight={600}>
      {username}
    </Typography>
    <Typography variant="body1" fontSize={20} fontWeight={600}>
      @{username}
    </Typography>
  </Stack>
);

const ProfileStats = () => (
  <Stack direction={"row"} gap={2}>
    <Typography variant="body1" fontSize={20} fontWeight={600}>
      0 followers
    </Typography>
    <Typography variant="body1" fontSize={20} fontWeight={600}>
      0 following
    </Typography>
  </Stack>
);

const MutualFriends = () => (
  <Stack direction={"row"} gap={1} alignItems={"center"}>
    <UserGroup
      length={3}
      size={35}
      users={[
        {
          username: "test",
        },
        {
          username: "test2",
        },
        {
          username: "test3",
        },
        {
          username: "XXXXX",
        },
        {
          username: "XXeeXXX",
        },
        {
          username: "XXXe34XXXX",
        },
      ]}
    />
    <Typography variant="body1" fontSize={18}>
      +3 Mutual Friends
    </Typography>
  </Stack>
);

const ProfileSidebar = () => (
  <Stack>
    <Typography variant="body1" fontSize={20} fontWeight={600}>
      New York, USA
    </Typography>
  </Stack>
);

const Profile = () => {
  const { profileId } = useParams();

  if (!profileId) return <div>Profile not found</div>;
  return (
    <Stack direction={"row"} width={"100%"} height={"100%"} p={2}>
      <Stack
        gap={2}
        direction={"row"}
        alignItems={"flex-start"}
        width={"100%"}
        height={"fit-content"}
      >
        <Stack
          direction={"column"}
          p={2}
          width={300}
          flexShrink={0}
          gap={3}
          alignItems={"center"}
        >
          <UserAvatar username={profileId} width={150} />
          <ProfileHeader username={profileId} />
          <ProfileStats />
          <MutualFriends />
          <ProfileSidebar />
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Typography variant="body1" fontSize={18}>
              Friends since 2021
            </Typography>
          </Stack>
        </Stack>
        <Divider flexItem orientation="vertical" />
        <Stack direction={"column"} flexGrow={1} height={"100%"} width={"100%"}>
          <Tabs value={0} variant="fullWidth">
            <Tab label="About" />
            <Tab label="Posts" />
            <Tab label="Media" />
            <Tab label="Timelinme" />
            <Tab label="Stats" />
            <Tab label="Activity" />
          </Tabs>
          <Stack py={3}>
            <About />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Profile;
