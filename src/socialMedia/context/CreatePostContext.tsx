// External
import React, { useState, createContext, type ReactNode } from "react";


// Parent, Sibling, Index
import type { Event } from "../../types/event/event.types";
import type { PollData } from "../../types/post/poll.types";
import type { PostMedia } from "../../types/post/postMedia.types";
import type { Visibility } from "../../types/base/visibility.types";
import type { PostUserInterface } from "../../types/post/postUser.types";
import type {
  PostScreen,
  CreatePostInterface,
  CreatePostBuilderActions,
} from "../../types/createPost/createPost.types";

interface CreatePostProviderProps {
  children: ReactNode;
}
interface CreatePostContextProps {
  data: CreatePostInterface;
  actions: CreatePostBuilderActions;
}

const initialState: CreatePostInterface = {
  media: [],
  visibility: "public",
  feeling: {
    image: "",
    feeling: "",
  },
  timeline: {
    timeline_owner_id: undefined,
    is_wall_post: false,
    timeline_owner: undefined,
  },
  content: {
    text: "",
    media: [],
    poll: undefined,
    link: undefined,
    event: undefined,
  },
  metadata: {
    hashtags: [],
    language: "en",
    tagged_users: [],
    location: undefined,
    mentioned_users: [],
    content_warning: undefined,
  },
  publishing: {
    privacy: "public",
    allowed_users: [],
    excluded_users: [],
    allow_sharing: true,
    allow_comments: true,
    allow_reactions: true,
  },
  author: {
    id: "1",
    lastName: "Doe",
    firstName: "John",
    username: "johndoe",
    mutualFriendsCount: 10,
    is_logged_in_user: true,
    friendship_status: "friends",
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
    reset: () => {},
    setText: () => {},
    setPoll: () => {},
    setLink: () => {},
    addMedia: () => {},
    setEvent: () => {},
    setAuthor: () => {},
    setFeeling: () => {},
    setPrivacy: () => {},
    removeMedia: () => {},
    setHashtags: () => {},
    setLocation: () => {},
    setLanguage: () => {},
    setWallPost: () => {},
    setVisibility: () => {},
    setDraftState: () => {},
    setTaggedUsers: () => {},
    setShowPreview: () => {},
    setAllowedUsers: () => {},
    setExcludedUsers: () => {},
    setTimelineOwner: () => {},
    setMentionedUsers: () => {},
    setContentWarning: () => {},
    toggleAllowSharing: () => {},
    toggleAllowComments: () => {},
    setCreatePostScreen: () => {},
    toggleAllowReactions: () => {},
    setMediaUploadProgress: () => {},
    setUploadingMediaState: () => {},
    setShowCreatePostDialog: () => {},
  },
});

export const CreatePostProvider: React.FC<CreatePostProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<CreatePostInterface>({ ...initialState });

  const actions: CreatePostBuilderActions = {
    build: () => {
      return state;
    },
    reset: () => {
      setState({ ...initialState });
    },
    setAuthor: (author) => {
      setState((prev) => ({
        ...prev,
        author,
      }));
    },
    setVisibility: (visibility: Visibility) => {
      setState((prev: CreatePostInterface) => ({ ...prev, visibility }));
    },
    setFeeling(feelingItem) {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        feeling: feelingItem,
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
    setLanguage: (language) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, language },
      }));
    },
    setPrivacy: (privacy) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, privacy },
      }));
    },
    setTaggedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, tagged_users: users },
      }));
    },
    setText: (text: string) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        content: { ...prev.content, text },
      }));
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
    setAllowedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allowed_users: users },
      }));
    },
    setMentionedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, mentioned_users: users },
      }));
    },
    setWallPost: (isWallPost) => {
      setState((prev) => ({
        ...prev,
        timeline: { ...prev.timeline, is_wall_post: isWallPost },
      }));
    },
    setExcludedUsers: (users) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, excluded_users: users },
      }));
    },
    toggleAllowSharing: (allow) => {
      setState((prev) => ({
        ...prev,
        publishing: { ...prev.publishing, allow_sharing: allow },
      }));
    },
    setContentWarning: (warning) => {
      setState((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, content_warning: warning },
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
    addMedia: (media: Omit<PostMedia, "id">[]) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        media: [...prev.media, ...media],
        content: {
          ...prev.content,
          media: [...prev.content.media, ...media],
        },
      }));
    },
    setTimelineOwner: (owner: PostUserInterface) => {
      setState((prev: CreatePostInterface) => ({
        ...prev,
        timeline: {
          timeline_owner_id: owner?.id,
          timeline_owner: owner,
          is_wall_post: prev.timeline?.is_wall_post ?? false,
        },
      }));
    },

    removeMedia: (index: number) => {
      setState((prev: CreatePostInterface) => {
        const newMedia = [...prev.content.media];
        newMedia.splice(index, 1);
        return {
          ...prev,
          media: newMedia,
          content: { ...prev.content, media: newMedia },
        };
      });
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

    setShowPreview: (show) => {
      setState((prev) => ({
        ...prev,
        ui_state: {
          ...(prev.ui_state ?? {
            is_draft: false,
            show_preview: false,
            uploading_media: false,
            media_upload_progress: 0,
            create_post_screen: "draft",
            show_create_post_dialog: false,
          }),
          show_preview: show,
        },
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
            create_post_screen: "draft",
            show_create_post_dialog: false,
          }),
          is_draft: isDraft,
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
            create_post_screen: "draft",
            show_create_post_dialog: false,
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
            create_post_screen: "draft",
            show_create_post_dialog: false,
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
  };

  const contextValue: CreatePostContextProps = {
    actions,
    data: state,
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
