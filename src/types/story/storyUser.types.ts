import {
  generateUserReference,
  type UserReference,
} from "../base/userReference.types";

export interface StoryUserInterface extends UserReference {
  is_logged_in_user: boolean;
}

export const generateStoryUserInterface = (): StoryUserInterface => {
  return {
    ...generateUserReference(),
    is_logged_in_user: false,
  };
};
