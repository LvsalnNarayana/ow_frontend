import { generateBaseEntity, type BaseEntity } from "../base/base.types";
import { generateEducation, type Education } from "./education.types";
import { generateGroup, type Group } from "../group/group.types";
import type { Notification } from "../notification/notification.types";
import { generateUserPlace, type UserPlace } from "../place/place.types";
import { generateUserInfo, type UserInfo } from "./userInfo.types";
import { generateWork, type Work } from "./work.types";
import {
  generateAccountSettings,
  type AccountSettings,
} from "./accountSettings.types";
import {
  generateFriendRequest,
  type Friend,
  type FriendRequest,
} from "../friend/friend.types";
import {
  generatePrivacySettings,
  type PrivacySettings,
} from "./privacySettings.types";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";
import type { PostReference } from "../base/postReference.types";
import { USER_ROLES_OPTIONS, type UserRole } from "../base/userRole.types";
import {
  generateEmail,
  generatePhone,
  generateWebsite,
  type Email,
  type Phone,
  type Website,
} from "./userData.types";
import { faker } from "@faker-js/faker";
import { generateEvent, type Event } from "../event/event.types";

export interface PostSubscription extends PostReference {}

export interface User extends BaseEntity {
  username: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: Email[];
  phone: Phone[];
  info: UserInfo;
  friends: Friend[];
  friendRequests: FriendRequest[];
  blockedUsers: UserReference[];
  posts: string[];
  websites: Website[];
  postSubscriptions: PostSubscription[];
  events: Event[];
  workHistory: Work[];
  education: Education[];
  places: UserPlace[];
  groups: Group[];
  notifications: Notification[];
  privacySettings: PrivacySettings;
  accountSettings: AccountSettings;
  isActive: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  isBanned: boolean;
  sessions: string[];
  lastActive: string;
}

export const generateUser = (): User => {
  return {
    ...generateBaseEntity(),
    username: faker.internet.username(),
    role: faker.helpers.arrayElement(
      USER_ROLES_OPTIONS?.map((option) => option.value)
    ) as UserRole,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: [generateEmail()],
    phone: [generatePhone()],
    info: generateUserInfo(),
    friends: [
      {
        ...generateUserReference(),
        friendship_status: "friends",
        friendsSince: faker.date.past().toISOString(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 100 }),
      },
    ],
    friendRequests: [generateFriendRequest()],
    blockedUsers: [generateUserReference()],
    posts: [faker.string.uuid()],
    websites: [generateWebsite()],
    postSubscriptions: [],
    events: [generateEvent()],
    workHistory: [generateWork()],
    education: [generateEducation()],
    places: [generateUserPlace()],
    groups: [generateGroup()],
    notifications: [],
    privacySettings: generatePrivacySettings(),
    accountSettings: generateAccountSettings(),
    isActive: faker.datatype.boolean(),
    isVerified: faker.datatype.boolean(),
    isDeleted: faker.datatype.boolean(),
    isBanned: faker.datatype.boolean(),
    sessions: [faker.string.uuid()],
    lastActive: faker.date.past().toISOString(),
  };
};
