import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";

export interface PrivacySettings {
  profileVisibility: Visibility;
  messagePrivacy: Visibility;
  timelinePostPrivacy: Visibility;
}

export const generatePrivacySettings = (): PrivacySettings => {
  return {
    profileVisibility: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
    messagePrivacy: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
    timelinePostPrivacy: VISIBILITY_OPTIONS?.map(
      (option) => option.value
    )[0] as Visibility,
  };
};
