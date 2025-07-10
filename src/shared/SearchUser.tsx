/* eslint-disable import/no-duplicates */
import { useMemo } from "react";

import {
  Chip,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  useTheme,
} from "@mui/material";

import UserAvatar from "./UserAvatar";
import type { UserReference } from "../types/base/userReference.types";
import type { FriendshipStatus } from "../types/base/friendshipStatus.types";

const SearchUser = ({
  selectedUsers,
  setSelectedUsers,
}: {
  selectedUsers: UserReference[];
  setSelectedUsers: (users: UserReference[]) => void;
}) => {
  const theme = useTheme();
  const friends = useMemo(() => {
    return [
      {
        id: "user_1235",
        lastName: "Smith",
        firstName: "Jane",
        username: "jane_smith",
        mutual_friends_count: 10,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1236",
        firstName: "John",
        lastName: "Johnson",
        mutual_friends_count: 8,
        username: "john_johnson",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1237",
        firstName: "Emily",
        lastName: "Williams",
        mutual_friends_count: 12,
        username: "emily_williams",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1238",
        lastName: "Brown",
        firstName: "Michael",
        mutual_friends_count: 5,
        username: "michael_brown",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1239",
        lastName: "Jones",
        firstName: "Sarah",
        username: "sarah_jones",
        mutual_friends_count: 7,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1240",
        lastName: "Garcia",
        firstName: "David",
        mutual_friends_count: 9,
        username: "david_garcia",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1241",
        firstName: "Laura",
        lastName: "Martinez",
        mutual_friends_count: 11,
        username: "laura_martinez",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1242",
        lastName: "Davis",
        firstName: "James",
        username: "james_davis",
        mutual_friends_count: 6,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1243",
        firstName: "Anna",
        lastName: "Rodriguez",
        mutual_friends_count: 10,
        username: "anna_rodriguez",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1244",
        firstName: "Carlos",
        lastName: "Martinez",
        mutual_friends_count: 13,
        username: "carlos_martinez",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1245",
        lastName: "Lopez",
        firstName: "Sophia",
        mutual_friends_count: 4,
        username: "sophia_lopez",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1246",
        firstName: "Daniel",
        lastName: "Gonzalez",
        mutual_friends_count: 14,
        username: "daniel_gonzalez",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1247",
        lastName: "Wilson",
        firstName: "Olivia",
        mutual_friends_count: 6,
        username: "olivia_wilson",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1248",
        lastName: "Anderson",
        firstName: "William",
        mutual_friends_count: 10,
        username: "william_anderson",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1249",
        firstName: "Emma",
        lastName: "Thomas",
        username: "emma_thomas",
        mutual_friends_count: 7,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1250",
        lastName: "Taylor",
        firstName: "Ethan",
        mutual_friends_count: 8,
        username: "ethan_taylor",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1251",
        firstName: "Mia",
        lastName: "Moore",
        username: "mia_moore",
        mutual_friends_count: 5,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1252",
        firstName: "Ava",
        lastName: "Jackson",
        username: "ava_jackson",
        mutual_friends_count: 9,
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1253",
        lastName: "Martin",
        firstName: "Alexander",
        mutual_friends_count: 11,
        username: "alexander_martin",
        friendship_status: "friends" as FriendshipStatus,
      },
      {
        id: "user_1254",
        lastName: "Lee",
        firstName: "Isabella",
        mutual_friends_count: 6,
        username: "isabella_lee",
        friendship_status: "friends" as FriendshipStatus,
      },
    ];
  }, []);

  return (
    <Stack
      width={"100%"}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Autocomplete
        open
        multiple
        size="small"
        disablePortal
        id="tags-outlined"
        options={friends}
        limitTags={3}
        filterSelectedOptions
        value={selectedUsers || []}
        onChange={(event: React.SyntheticEvent, newValue: UserReference[]) => {
          setSelectedUsers(newValue);
        }}
        getOptionLabel={(option) => {
          return option?.username;
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
        defaultValue={selectedUsers || []}
        sx={{ width: "100%" }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              fullWidth
              sx={{
                minWidth: 1,
                "& .MuiOutlinedInput-root": {
                  minWidth: 1,
                },
              }}
              placeholder={
                selectedUsers?.length > 0 ? "" : "Search your friends"
              }
            />
          );
        }}
        renderValue={(value, getTagProps) => {
          return (
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              {value.slice(-2).map((option: UserReference, index: number) => {
                const { key, ...tagProps } = getTagProps({ index });

                return (
                  <Chip
                    variant="outlined"
                    label={
                      <Stack
                        gap={1}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <UserAvatar username={option?.username} width={28} />
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                          {option?.firstName} {option?.lastName}
                        </Typography>
                      </Stack>
                    }
                    key={key}
                    {...tagProps}
                  />
                );
              })}
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {value.length > 2 ? `+${value.length - 2}` : ""}
              </Typography>
            </Stack>
          );
        }}
        renderOption={({ id, key, ...props }, option: UserReference) => {
          return (
            <li key={option?.id} {...props} style={{ marginTop: "5px" }}>
              <Stack
                gap={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <UserAvatar username={option?.username} width={36} />
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography variant="body1" sx={{ fontSize: "14px" }}>
                    {option?.firstName} {option?.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "11px" }}>
                    {option?.mutual_friends_count} Mutual Friends
                  </Typography>
                </Stack>
              </Stack>
            </li>
          );
        }}
        slots={{
          popper: ({ children }) => {
            return (
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                width={"100%"}
              >
                {children}
              </Stack>
            );
          },
          paper: ({ children }) => {
            return (
              <Stack
                sx={{
                  p: 0,
                  mt: 2,
                  width: "100%",
                  flexGrow: 1,
                  overflowY: "auto",
                  borderRadius: "4px",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {children}
              </Stack>
            );
          },
        }}
        // PopperComponent={({ children }: { children: React.ReactNode }) => {
        //   return (
        //     <Stack
        //       sx={{
        //         p: 0,
        //         mt: 2,
        //         width: "100%",
        //         height: "40vh",
        //         overflowY: "auto",
        //         borderRadius: "4px",
        //         border: `1px solid ${theme.palette.divider}`,
        //       }}
        //     >
        //       {children}
        //     </Stack>
        //   );
        // }}
        // PaperComponent={({ children }) => {
        //   return (
        //     <Stack
        //       sx={{
        //         p: 0,
        //         mt: 1,
        //         width: "100%",
        //         height: "40vh",
        //         overflowY: "auto",
        //         borderRadius: "4px",
        //         "& .MuiAutocomplete-listbox": {
        //           maxHeight: "40vh",
        //         },
        //         backgroundColor: theme.palette.background.default,
        //       }}
        //     >
        //       {children}
        //     </Stack>
        //   );
        // }}
      />
    </Stack>
  );
};

export default SearchUser;
