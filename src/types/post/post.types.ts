import { faker } from "@faker-js/faker";
import {
  generateBaseEntity,
  type BaseEntity,
  type VisibilityMixin,
} from "../base/base.types";
import { FEELINGS_LIST, type Feeling } from "../base/feelings.type";
import { generatePlace, type Place } from "../place/place.types";
import { generatePoll, type PollData } from "./poll.types";
import type { PostStatus } from "./post.enums";
import { generatePostComment, type PostComment } from "./postComment.types";
import {
  generatePostEngagement,
  type PostEngagement,
} from "./postEngagement.types";
import { generatePostMedia, type PostMedia } from "./postMedia.types";
import {
  generatePostSubscriptions,
  type PostSubscriptions,
} from "./postSubscriptions.types";
import type { TimelineTarget } from "./postTimeline.types";
import {
  generatePostAuthorInterface,
  generatePostUserInterface,
  type PostAuthorInterface,
  type PostUserInterface,
} from "./postUser.types";
import { generateEvent, type Event } from "../event/event.types";
import { generateWebsite, type Website } from "../user/userData.types";
import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";
import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";

export interface PostInterface extends BaseEntity {
  content: {
    text?: string;
    media: PostMedia[];
    poll?: PollData;
    event?: Event;
    link?: Website;
  };
  feeling: {
    feeling: Feeling;
    image: string;
  };
  publishing: {
    published_at: string;
    privacy: VisibilityMixin;
    allowed_users?: UserReference[];
    excluded_users?: UserReference[];
    allow_comments: boolean;
    allow_reactions: boolean;
    allow_sharing: boolean;
  };
  metadata: {
    hashtags: string[];
    location?: Place;
    tagged_users: PostUserInterface[];
    mentioned_users: PostUserInterface[];
    language?: string;
    content_warning?: string;
  };
  author: PostAuthorInterface;
  engagement: PostEngagement;
  comments: { items: PostComment[]; total_count: number; has_more: boolean };
  status: {
    current_status: PostStatus;
    is_draft: boolean;
    is_published: boolean;
    is_archived: boolean;
    is_deleted: boolean;
    is_reported: boolean;
    is_hidden: boolean;
    is_pinned: boolean;
    is_edited: boolean;
    edited_at?: string;
    has_comments: boolean;
    has_been_shared: boolean;
    user_has_interacted: boolean;
    is_tagged: boolean;
  };
  timeline?: TimelineTarget;
  subscriptions?: PostSubscriptions;
  analytics?: {
    views: { total: number; unique: number; by_day: Record<string, number> };
    engagement: {
      rate: number;
      peak_time: string;
      demographics: Record<string, number>;
    };
    reach: { organic: number; viral: number; total: number };
  };
}

export const generatePost = (): PostInterface => {
  return {
    ...generateBaseEntity(),
    content: {
      text: faker.lorem.sentence(),
      media: [generatePostMedia()],
      poll: generatePoll(),
      event: generateEvent(),
      link: generateWebsite(),
    },
    feeling: {
      feeling: faker.helpers.arrayElement(FEELINGS_LIST),
      image: faker.image.url(),
    },
    publishing: {
      published_at: faker.date.recent().toISOString(),
      privacy: {
        visibility: faker.helpers.arrayElement(
          VISIBILITY_OPTIONS?.map((option) => option.value)
        ) as Visibility,
      },
      allowed_users: [generateUserReference()],
      excluded_users: [generateUserReference()],
      allow_comments: faker.datatype.boolean(),
      allow_reactions: faker.datatype.boolean(),
      allow_sharing: faker.datatype.boolean(),
    },
    author: generatePostAuthorInterface(),
    engagement: generatePostEngagement(),
    comments: {
      items: Array.from({ length: faker.number.int(10) }, generatePostComment),
      total_count: faker.number.int(),
      has_more: faker.datatype.boolean(),
    },
    status: {
      current_status: "published",
      is_draft: false,
      is_published: true,
      is_archived: false,
      is_deleted: false,
      is_reported: false,
      is_hidden: false,
      is_pinned: false,
      is_edited: false,
      edited_at: faker.date.recent().toISOString(),
      has_comments: true,
      has_been_shared: true,
      user_has_interacted: true,
      is_tagged: true,
    },
    metadata: {
      hashtags: faker.lorem.words(3).split(" "),
      location: faker.helpers.arrayElement([null, generatePlace()]) as Place,
      tagged_users: [generatePostUserInterface()],
      mentioned_users: [generatePostUserInterface()],
      language: faker.helpers.arrayElement(["en", "fr", "es", "de", "it"]),
      content_warning: faker.lorem.sentence(),
    },
    subscriptions: generatePostSubscriptions(),
  };
};

export const generateMultiplePosts = (count: number): PostInterface[] => {
  return Array.from({ length: count }, generatePost);
};
