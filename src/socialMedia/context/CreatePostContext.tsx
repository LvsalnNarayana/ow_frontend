import React, { createContext, useState, type ReactNode } from "react";

import type {
  CreatePostBuilderActions,
  CreatePostInterface,
  PostScreen,
} from "../../types/createPost/createPost.types";
import type { Visibility } from "../../types/base/visibility.types";
import type { PostMedia } from "../../types/post/postMedia.types";
import type { PollData } from "../../types/post/poll.types";
import type { Event } from "../../types/event/event.types";
import type { PostUserInterface } from "../../types/post/postUser.types";

interface CreatePostProviderProps {
  children: ReactNode;
}
interface CreatePostContextProps {
  data: CreatePostInterface;
  actions: CreatePostBuilderActions;
}

const initialState: CreatePostInterface = {
  content: {
    text: "",
    media: [],
    poll: undefined,
    event: undefined,
    link: undefined,
  },
  feeling: {
    feeling: "",
    image: "",
  },
  visibility: "public",
  media: [],
  metadata: {
    hashtags: [],
    location: undefined,
    tagged_users: [],
    mentioned_users: [],
    language: "en",
    content_warning: undefined,
  },
  author: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    is_logged_in_user: true,
    mutual_friends_count: 10,
    friendship_status: "friends",
  },
  publishing: {
    privacy: "public",
    allowed_users: [],
    excluded_users: [],
    allow_comments: true,
    allow_reactions: true,
    allow_sharing: true,
  },
  timeline: {
    is_wall_post: false,
    timeline_owner_id: undefined,
    timeline_owner: undefined,
  },
  ui_state: {
    is_draft: false,
    show_preview: false,
    uploading_media: false,
    media_upload_progress: 0,
    create_post_screen: "draft",
    show_create_post_dialog: false,
  },
};

const CreatePostContext = createContext<CreatePostContextProps>({
  data: initialState,
  actions: {
    setVisibility: () => {},
    setText: () => {},
    addMedia: () => {},
    removeMedia: () => {},
    setPoll: () => {},
    setEvent: () => {},
    setLink: () => {},
    setHashtags: () => {},
    setLocation: () => {},
    setTaggedUsers: () => {},
    setMentionedUsers: () => {},
    setFeeling: () => {},
    setLanguage: () => {},
    setContentWarning: () => {},
    setAuthor: () => {},
    setDraftState: () => {},
    setPrivacy: () => {},
    setAllowedUsers: () => {},
    setExcludedUsers: () => {},
    toggleAllowComments: () => {},
    toggleAllowReactions: () => {},
    toggleAllowSharing: () => {},
    setWallPost: () => {},
    setTimelineOwner: () => {},
    setCreatePostScreen: () => {},
    setShowCreatePostDialog: () => {},
    setShowPreview: () => {},
    setMediaUploadProgress: () => {},
    setUploadingMediaState: () => {},
    reset: () => {},
  },
});

export const CreatePostProvider: React.FC<CreatePostProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<CreatePostInterface>({ ...initialState });

  const actions: CreatePostBuilderActions = {
    setVisibility: (visibility: Visibility) => {
      setState((prev: CreatePostInterface) => ({ ...prev, visibility }));
    },
    setFeeling(feelingItem) {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        feeling: feelingItem,
      }));
    },
    setText: (text: string) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: { ...prev.content, text },
      }));
    },
    addMedia: (media: Omit<PostMedia, "id">[]) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: {
          ...prev.content,
          media: [...prev.content.media, ...media],
        },
        media: [...prev.media, ...media],
      }));
    },
    removeMedia: (index: number) => {
      setState((prev: CreatePostInterface) => {
        const newMedia = [...prev.content.media];
        newMedia.splice(index, 1);
        return {
          ...prev,
          content: { ...prev.content, media: newMedia },
          media: newMedia,
        };
      });
    },
    setPoll: (poll: PollData) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: { ...prev.content, poll },
      }));
    },
    setEvent: (event: Event) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: { ...prev.content, event },
      }));
    },
    setLink: (link: {
      url: string;
      title?: string;
      description?: string;
      image?: string;
      domain: string;
    }) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: { ...prev.content, link },
      }));
    },
    setPrivacy: (privacy) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, privacy },
      }));
    },
    setAllowedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allowed_users: users },
      }));
    },
    setExcludedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, excluded_users: users },
      }));
    },
    toggleAllowComments: (allow) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allow_comments: allow },
      }));
    },
    toggleAllowReactions: (allow) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allow_reactions: allow },
      }));
    },
    toggleAllowSharing: (allow) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allow_sharing: allow },
      }));
    },
    setWallPost: (isWallPost) => {
      setState((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, is_wall_post: isWallPost },
      }));
    },
    setTimelineOwner: (owner: PostUserInterface) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        timeline: {
          is_wall_post: prev.timeline?.is_wall_post ?? false,
          timeline_owner: owner,
          timeline_owner_id: owner?.id,
        },
      }));
    },
    setHashtags: (hashtags) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, hashtags },
      }));
    },
    setLocation: (location) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, location },
      }));
    },
    setTaggedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, tagged_users: users },
      }));
    },
    setMentionedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, mentioned_users: users },
      }));
    },
    setLanguage: (language) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, language },
      }));
    },
    setContentWarning: (warning) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, content_warning: warning },
      }));
    },
    setAuthor: (author) => {
      setState((prev) => ({
        ...prev,
        author,
      }));
    },
    setDraftState: (isDraft) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            show_create_post_dialog: false,
            create_post_screen: "draft",
          }),
          is_draft: isDraft,
        },
      }));
    },

    setShowPreview: (show) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            show_create_post_dialog: false,
            create_post_screen: "draft",
          }),
          show_preview: show,
        },
      }));
    },

    setUploadingMediaState: (uploading) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            show_create_post_dialog: false,
            create_post_screen: "draft",
          }),
          uploading_media: uploading,
        },
      }));
    },

    setMediaUploadProgress: (progress) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            show_create_post_dialog: false,
            create_post_screen: "draft",
          }),
          media_upload_progress: progress,
        },
      }));
    },

    setCreatePostScreen: (screen: PostScreen) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state
            ? {
                is_draft: prev.ui_state.is_draft,
                show_preview: prev.ui_state.show_preview,
                uploading_media: prev.ui_state.uploading_media,
                media_upload_progress: prev.ui_state.media_upload_progress,
                show_create_post_dialog: prev.ui_state.show_create_post_dialog,
              }
            : {
                is_draft: false,
                show_preview: false,
                uploading_media: false,
                media_upload_progress: 0,
                show_create_post_dialog: false,
              }),
          create_post_screen: screen,
        },
      }));
    },
    setShowCreatePostDialog: (show) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            create_post_screen: "draft",
          }),
          show_create_post_dialog: show,
        },
      }));
    },

    reset: () => {
      setState({ ...initialState });
    },
    build: () => {
      return state;
    },
  };

  const contextValue: CreatePostContextProps = {
    data: state,
    actions,
  };

  return (
    <CreatePostContext.Provider value={contextValue}>
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostProvider;

export const useCreatePostContext = (): CreatePostContextProps => {
  const context = React.useContext(CreatePostContext);
  if (!context) {
    throw new Error(
      "useCreatePostContext must be used within CreatePostProvider"
    );
  }
  return context;
};
