import { faker } from "@faker-js/faker";
import type { FriendshipStatus } from "./friendshipStatus.types";

export interface UserReference {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  mutualFriendsCount: number;
  friendship_status: FriendshipStatus;
}

export const generateUserReference = (): UserReference => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
    friendship_status: faker.helpers.arrayElement([
      "none",
      "pending",
      "accepted",
      "blocked",
      "friends",
    ] as FriendshipStatus[]),
  };
};
