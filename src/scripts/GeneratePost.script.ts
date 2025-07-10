import { faker } from "@faker-js/faker";
import type {
  PostPrivacy,
  PostStatus,
  ReactionType,
} from "../types/post/post.enums";
import type { PostInterface } from "../types/post/post.types";
import type { PostUserInterface } from "../types/post/postUser.types";
import type { PostCommentReply } from "../types/post/postCommentReply.types";
import type { Visibility } from "../types/base/visibility.types";
import type { PostComment } from "../types/post/postComment.types";
import type { ReactionData } from "../types/post/reactionData.types";
import { feelings } from "../data/feelings";
import type { Feeling } from "../types/base/feelings.type";

const postStatus: PostStatus[] = [
  "draft",
  "published",
  "archived",
  "deleted",
  "reported",
  "hidden",
];

const postPrivacy: PostPrivacy[] = ["public", "friends", "only_me", "custom"];

const reactionTypes: ReactionType[] = [
  "like",
  "love",
  "haha",
  "sad",
  "angry",
  "celebrate",
];

// ---------------------------------------------
// 🔁 Utility Generators
// ---------------------------------------------

const generateUser = (): PostUserInterface => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.username(),
  mutual_friends_count: faker.number.int({ min: 0, max: 100 }),
  friendship_status: "friends",
});
const generateReactionCounts = (): Record<ReactionType, number> => {
  return {
    like: faker.number.int({ min: 0, max: 100 }),
    love: faker.number.int({ min: 0, max: 100 }),
    haha: faker.number.int({ min: 0, max: 100 }),
    sad: faker.number.int({ min: 0, max: 100 }),
    angry: faker.number.int({ min: 0, max: 100 }),
    celebrate: faker.number.int({ min: 0, max: 100 }),
  };
};
const generateReactions = (): ReactionData => ({
  has_reacted: faker.datatype.boolean(),
  user_reaction_type: faker.helpers.arrayElement(reactionTypes),
  user_reacted_at: faker.date.past().toISOString(),
  total_count: faker.number.int({ min: 0, max: 100 }),
  reaction_counts: generateReactionCounts(),
  recent_reactions: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      ...generateUser(),
      reacted_at: faker.date.past().toISOString(),
      reaction_type: faker.helpers.arrayElement(reactionTypes),
    })
  ),
  has_more_reactions: faker.datatype.boolean(),
});
const generateReply = (): PostCommentReply => ({
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
  replied_at: faker.date.past().toISOString(),
  user: generateUser(),
  mentions: Array.from(
    { length: faker.number.int({ min: 0, max: 3 }) },
    generateUser
  ),
  reactions: generateReactions(),
  is_edited: faker.datatype.boolean(),
  edited_at: faker.date.past().toISOString(),
  status: {
    is_deleted: faker.datatype.boolean(),
    is_reported: faker.datatype.boolean(),
    is_hidden: faker.datatype.boolean(),
  },
  createdAt: faker.date.past().toISOString(),
});
const generateComment = (): PostComment => ({
  id: faker.string.uuid(),
  content: faker.lorem.sentence(),
  commented_at: faker.date.past().toISOString(),
  user: generateUser(),
  mentions: Array.from(
    { length: faker.number.int({ min: 0, max: 2 }) },
    generateUser
  ),
  reactions: generateReactions(),
  replies: {
    items: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      generateReply
    ),
    total_count: faker.number.int({ min: 0, max: 5 }),
    has_more: faker.datatype.boolean(),
  },
  is_edited: faker.datatype.boolean(),
  edited_at: faker.date.past().toISOString(),
  status: {
    is_deleted: faker.datatype.boolean(),
    is_reported: faker.datatype.boolean(),
    is_hidden: faker.datatype.boolean(),
    is_pinned: faker.datatype.boolean(),
  },
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
});
const generateTextWithMentionsAndHashtags = (
  minMentions = 1,
  maxMentions = 3,
  minHashtags = 1,
  maxHashtags = 3
): string => {
  const baseParagraph = faker.lorem.paragraph();

  const mentions = Array.from(
    { length: faker.number.int({ min: minMentions, max: maxMentions }) },
    () => `@${faker.internet.username()}`
  );

  const hashtags = Array.from(
    { length: faker.number.int({ min: minHashtags, max: maxHashtags }) },
    () => `#${faker.lorem.word()}`
  );

  // Strategy: insert randomly into the paragraph words
  const words = baseParagraph.split(" ");
  const insertRandomly = (tokens: string[]) => {
    tokens.forEach((token) => {
      const index = faker.number.int({ min: 0, max: words.length - 1 });
      words.splice(index, 0, token);
    });
  };

  insertRandomly(mentions);
  insertRandomly(hashtags);

  return words.join(" ");
};
// ---------------------------------------------
// 🧠 Main Post Generator
// ---------------------------------------------
export const generatePost = (): PostInterface => {
  return {
    id: faker.string.uuid(),
    feeling: {
      feeling: faker.helpers.arrayElement(feelings).feeling as Feeling,
      image: faker.helpers.arrayElement(feelings).image as string,
    },
    content: {
      text: generateTextWithMentionsAndHashtags(),
      media: [],
      poll: {
        question: faker.lorem.sentence(),
        options: Array.from({ length: 2 + faker.number.int(2) }, () => ({
          id: faker.string.uuid(),
          text: faker.lorem.words(3),
          vote_count: faker.number.int(50),
          voters: [],
          user_voted: false,
        })),
        total_votes: 0,
        allow_multiple: false,
        expires_at: faker.date.future().toISOString(),
        is_expired: false,
        user_has_voted: false,
      },
      event: {
        id: faker.string.uuid(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        start_date: faker.date.future().toISOString(),
        end_date: faker.date.future().toISOString(),
        location: {
          id: faker.string.uuid(),
          name: faker.location.city(),
          placeTag: faker.lorem.word(),
          address: {
            street: faker.location.street(),
            city: faker.location.city(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode(),
            country: faker.location.country(),
            countryCode: faker.location.countryCode(),
          },
          coordinates: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
          timezone: faker.location.timeZone(),
          isActive: faker.datatype.boolean(),
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.past().toISOString(),
        },
        rsvp: {
          going_count: faker.number.int(100),
          interested_count: faker.number.int(50),
          not_going_count: faker.number.int(20),
          user_response: faker.helpers.arrayElement([
            "going",
            "interested",
            "not_going",
          ]),
        },
        is_online: faker.datatype.boolean(),
        cover_image: faker.image.url(),
      },
    },
    publishing: {
      published_at: faker.date.past().toISOString(),
      privacy: {
        visibility: faker.helpers.arrayElement(postPrivacy) as Visibility,
      },
      allowed_users: [],
      excluded_users: [],
      allow_comments: faker.datatype.boolean(),
      allow_reactions: faker.datatype.boolean(),
      allow_sharing: faker.datatype.boolean(),
    },
    metadata: {
      hashtags: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => `#${faker.word.words({ count: 1 })}`
      ),
      location: {
        id: faker.string.uuid(),
        name: faker.location.city(),
        placeTag: faker.word.noun(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          country: faker.location.country(),
          postalCode: faker.location.zipCode(),
          countryCode: faker.location.countryCode(),
        },
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        timezone: faker.location.timeZone(),
        isActive: faker.datatype.boolean(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString(),
      },
      tagged_users: Array.from(
        { length: faker.number.int({ min: 0, max: 3 }) },
        generateUser
      ),
      mentioned_users: Array.from(
        { length: faker.number.int({ min: 0, max: 3 }) },
        generateUser
      ),
      language: faker.helpers.arrayElement(["en", "es", "fr", "de", "it"]),
      content_warning: faker.lorem.words(5),
    },
    author: {
      ...generateUser(),
      is_logged_in_user: true,
    },
    engagement: {
      reactions: generateReactions(),
      shares: {
        count: faker.number.int(100),
        recent_shares: Array.from(
          { length: faker.number.int({ min: 0, max: 5 }) },
          generateUser
        ),
        has_more_shares: faker.datatype.boolean(),
      },
      views: {
        count: faker.number.int(1000),
        unique_views: faker.number.int(800),
        last_viewed_at: faker.date.past().toISOString(),
      },
      comment_count: faker.number.int(100),
      engagement_score: faker.number.int(100),
    },
    comments: {
      items: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        generateComment
      ),
      total_count: faker.number.int(100),
      has_more: faker.datatype.boolean(),
    },
    status: {
      current_status: faker.helpers.arrayElement(postStatus),
      is_draft: faker.datatype.boolean(),
      is_published: faker.datatype.boolean(),
      is_archived: faker.datatype.boolean(),
      is_deleted: faker.datatype.boolean(),
      is_reported: faker.datatype.boolean(),
      is_hidden: faker.datatype.boolean(),
      is_pinned: faker.datatype.boolean(),
      is_edited: faker.datatype.boolean(),
      edited_at: faker.date.past().toISOString(),
      has_comments: faker.datatype.boolean(),
      has_been_shared: faker.datatype.boolean(),
      user_has_interacted: faker.datatype.boolean(),
      is_tagged: faker.datatype.boolean(),
    },
    subscriptions: {
      subscribers: Array.from(
        { length: faker.number.int({ min: 0, max: 5 }) },
        () => ({
          ...generateUser(),
          subscribed_at: faker.date.past().toISOString(),
          is_subscribed: faker.datatype.boolean(),
        })
      ),
      subscriber_count: faker.number.int(100),
      user_subscribed: faker.datatype.boolean(),
      preferences: {
        notify_on_comments: faker.datatype.boolean(),
        notify_on_reactions: faker.datatype.boolean(),
        notify_on_shares: faker.datatype.boolean(),
        notify_on_mentions: faker.datatype.boolean(),
      },
    },
    analytics: {
      views: {
        total: faker.number.int(1000),
        unique: faker.number.int(800),
        by_day: Object.fromEntries(
          Array.from({ length: 7 }, (_, i) => {
            const day = `2021-01-${String(i + 1).padStart(2, "0")}`;
            return [day, faker.number.int(300)];
          })
        ),
      },
      engagement: {
        rate: faker.number.int(100),
        peak_time: faker.date.past().toISOString(),
        demographics: {
          male: faker.number.int(50),
          female: faker.number.int(40),
          other: faker.number.int(10),
        },
      },
      reach: {
        organic: faker.number.int(500),
        viral: faker.number.int(300),
        total: faker.number.int(800),
      },
    },
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  };
};

// ---------------------------------------------
// 🔄 Bulk Post Generator
// ---------------------------------------------

export const generatePosts = (count: number): PostInterface[] =>
  Array.from({ length: count }, generatePost);
