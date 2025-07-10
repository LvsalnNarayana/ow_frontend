const FRIENDS = "friends" as const;
const PENDING = "pending" as const;
const REQUEST_RECEIVED = "request_received" as const;
const BLOCKED = "blocked" as const;
const NONE = "none" as const;

export type FriendshipStatus =
  | typeof FRIENDS
  | typeof PENDING
  | typeof REQUEST_RECEIVED
  | typeof BLOCKED
  | typeof NONE;
