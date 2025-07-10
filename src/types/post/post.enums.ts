import type {
  HAHA,
  LIKE,
  LOVE,
  SAD,
  ANGRY,
  CELEBRATE,
  WOW,
} from "../base/reaction.types";
import type { Visibility } from "../base/visibility.types";

export type ReactionType =
  | typeof WOW
  | typeof LIKE
  | typeof LOVE
  | typeof HAHA
  | typeof SAD
  | typeof ANGRY
  | typeof CELEBRATE;

export type PostPrivacy = Visibility | "custom";

const Draft = "draft" as const;
const Published = "published" as const;
const Archived = "archived" as const;
const Deleted = "deleted" as const;
const Reported = "reported" as const;
const Hidden = "hidden" as const;

export type PostStatus =
  | typeof Draft
  | typeof Published
  | typeof Archived
  | typeof Deleted
  | typeof Reported
  | typeof Hidden;
