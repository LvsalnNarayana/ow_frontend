import type { Education } from "./user/education.types";
import type { Gender } from "./base/gender.types";
import type { Place, UserPlace } from "./place/place.types";
import type { Email, Phone } from "./user/user.types";
import type { Birthdate, Relationship } from "./user/userInfo.types";
import type { Work } from "./user/work.types";

export interface AboutItemProps {
  type: string;
  Icon: React.ElementType;
  data:
    | Work
    | Education
    | Email
    | Phone
    | Gender
    | Birthdate
    | Relationship
    | { userPlaceItem: UserPlace; placeItem?: Place };
}

export type AboutItemType =
  | "workplace"
  | "birthday"
  | "school"
  | "email"
  | "gender"
  | "phone"
  | "place"
  | "relationship";
