// Notification Types

// Post Action Types
const PostLike = "post_like" as const;
const PostReaction = "post_reaction" as const;
const PostComment = "post_comment" as const;
const PostCommentReaction = "post_comment_reaction" as const;
const PostCommentReply = "post_comment_reply" as const;
const PostCommentReplyReaction = "post_comment_reply_reaction" as const;
const PostReport = "post_report" as const;

const Message = "message" as const;
const MessageReaction = "message_reaction" as const;

const FriendRequest = "friend_request" as const;
const FriendRequestAccepted = "friend_request_accepted" as const;

// Group Types
const Group = "group" as const;
const GroupInvite = "group_invite" as const;
const GroupJoinRequest = "group_join_request" as const;
const GroupKick = "group_kick" as const;
const GroupLeave = "group_leave" as const;
const GroupPromote = "group_promote" as const;
const GroupDemote = "group_demote" as const;

// Event Types
const Event = "event" as const;
const EventInvite = "event_invite" as const;
const EventLeave = "event_leave" as const;
const EventKick = "event_kick" as const;
const EventPromote = "event_promote" as const;

// Document Types
const DocShared = "doc_shared" as const;
const DocComment = "doc_comment" as const;

export type NotificationType =
  | typeof PostLike
  | typeof PostReaction
  | typeof PostComment
  | typeof PostCommentReaction
  | typeof PostCommentReply
  | typeof PostCommentReplyReaction
  | typeof PostReport
  | typeof Message
  | typeof MessageReaction
  | typeof FriendRequest
  | typeof FriendRequestAccepted
  | typeof Group
  | typeof GroupInvite
  | typeof GroupJoinRequest
  | typeof GroupKick
  | typeof GroupLeave
  | typeof GroupPromote
  | typeof GroupDemote
  | typeof Event
  | typeof EventInvite
  | typeof EventLeave
  | typeof EventKick
  | typeof EventPromote
  | typeof DocShared
  | typeof DocComment;

