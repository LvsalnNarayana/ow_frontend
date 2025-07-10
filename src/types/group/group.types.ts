import { faker } from "@faker-js/faker";
import type { UserReference } from "../base/userReference.types";
import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";
import type { FriendshipStatus } from "../base/friendshipStatus.types";
import { generateBaseEntity, type BaseEntity } from "../base/base.types";

// Group Categories
export const GROUP_CATEGORIES = [
  "Technology",
  "Sports",
  "Music",
  "Art",
  "Business",
  "Education",
  "Gaming",
  "Travel",
  "Food",
  "Health",
  "Other",
] as const;

export type GroupCategory = (typeof GROUP_CATEGORIES)[number];

// Privacy Options
export const PRIVACY_OPTIONS = ["private", "public", "restricted"] as const;
export type GroupPrivacy = (typeof PRIVACY_OPTIONS)[number];

// User Roles
export const USER_ROLES = ["Member", "Admin", "Moderator", "Owner"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Activity Status
export const ACTIVITY_STATUSES = ["active", "inactive", "archived"] as const;
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];

// Verification Status
export const VERIFICATION_STATUSES = [
  "verified",
  "unverified",
  "pending",
] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export interface Group extends BaseEntity {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage?: string;
  role: UserRole;
  privacy: GroupPrivacy;
  visibility: Visibility;
  category: GroupCategory;
  tags: string[];
  location?: {
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  members_count: number;
  max_members_count: number;
  pending_requests_count: number;
  joined_at: string;
  created_at: string;
  activity_status: ActivityStatus;
  last_activity: string;
  owner: UserReference;
  admins: UserReference[];
  moderators: UserReference[];
  rules: string[];
  links: {
    website?: string;
    social_media?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  settings: {
    allow_member_posts: boolean;
    require_approval_for_posts: boolean;
    allow_member_invites: boolean;
    show_member_list: boolean;
    allow_discussions: boolean;
  };
  stats: {
    posts_count: number;
    events_count: number;
    weekly_active_members: number;
    growth_rate: number;
  };
  verification_status: VerificationStatus;
  featured: boolean;
  trending_score: number;
}

export const generateGroup = (): Group => {
  const membersCount = faker.number.int({ min: 10, max: 50000 });
  const maxMembersCount = faker.number.int({ min: membersCount, max: 100000 });

  return {
    ...generateBaseEntity(),
    name:
      faker.company.name() +
      " " +
      faker.helpers.arrayElement([
        "Community",
        "Group",
        "Club",
        "Society",
        "Network",
      ]),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    icon: faker.image.avatar(),
    coverImage: faker.image.url({ width: 1200, height: 400 }),
    role: faker.helpers.arrayElement(USER_ROLES),
    privacy: faker.helpers.arrayElement(PRIVACY_OPTIONS),
    visibility: faker.helpers.arrayElement(
      VISIBILITY_OPTIONS?.map(({ value }) => value)
    ) as Visibility,
    category: faker.helpers.arrayElement(GROUP_CATEGORIES),
    tags: faker.helpers.arrayElements(
      [
        "community",
        "networking",
        "learning",
        "events",
        "discussion",
        "professional",
        "hobby",
        "local",
        "global",
        "beginner",
        "advanced",
      ],
      { min: 2, max: 5 }
    ),
    location: faker.datatype.boolean()
      ? {
          city: faker.location.city(),
          country: faker.location.country(),
          coordinates: {
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
          },
        }
      : undefined,
    members_count: membersCount,
    max_members_count: maxMembersCount,
    pending_requests_count: faker.number.int({ min: 0, max: 100 }),
    joined_at: faker.date.past().toISOString(),
    created_at: faker.date.past({ years: 3 }).toISOString(),
    activity_status: faker.helpers.arrayElement(ACTIVITY_STATUSES),
    last_activity: faker.date.recent().toISOString(),
    owner: {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
      friendship_status: faker.helpers.arrayElement([
        "friends",
        "pending",
        "blocked",
      ]) as FriendshipStatus,
    },
    admins: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
        friendship_status: faker.helpers.arrayElement([
          "friends",
          "pending",
          "blocked",
        ]) as FriendshipStatus,
      }),
      { count: { min: 1, max: 3 } }
    ),
    moderators: faker.helpers.multiple(
      () => ({
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        mutualFriendsCount: faker.number.int({ min: 0, max: 50 }),
        friendship_status: faker.helpers.arrayElement([
          "friends",
          "pending",
          "blocked",
        ]) as FriendshipStatus,
      }),
      { count: { min: 0, max: 5 } }
    ),
    rules: faker.helpers.multiple(() => faker.lorem.sentence(), {
      count: { min: 3, max: 8 },
    }),
    links: {
      website: faker.datatype.boolean() ? faker.internet.url() : undefined,
      social_media: {
        facebook: faker.datatype.boolean() ? faker.internet.url() : undefined,
        twitter: faker.datatype.boolean() ? faker.internet.url() : undefined,
        instagram: faker.datatype.boolean() ? faker.internet.url() : undefined,
        linkedin: faker.datatype.boolean() ? faker.internet.url() : undefined,
      },
    },
    settings: {
      allow_member_posts: faker.datatype.boolean(),
      require_approval_for_posts: faker.datatype.boolean(),
      allow_member_invites: faker.datatype.boolean(),
      show_member_list: faker.datatype.boolean(),
      allow_discussions: faker.datatype.boolean(),
    },
    stats: {
      posts_count: faker.number.int({ min: 0, max: 10000 }),
      events_count: faker.number.int({ min: 0, max: 500 }),
      weekly_active_members: faker.number.int({ min: 0, max: membersCount }),
      growth_rate: faker.number.float({ min: -10, max: 50, fractionDigits: 2 }),
    },
    verification_status: faker.helpers.arrayElement(VERIFICATION_STATUSES),
    featured: faker.datatype.boolean(),
    trending_score: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
  };
};
