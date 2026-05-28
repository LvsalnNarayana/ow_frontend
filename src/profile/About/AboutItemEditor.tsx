// External
import React from "react";


// Parent, Sibling, Index
import EditGender from "./Gender/EditGender";
import EditEmailItem from "./Email/EditEmailItem";
import EditPhoneItem from "./Phone/EditPhoneItem";
import EditPlacesItem from "./Places/EditPlacesItem";
import type { Work } from "../../types/user/work.types";
import EditWorkplaceItem from "./Work/EditWorkplaceItem";
import EditEducationItem from "./School/EditEducationItem";
import EditBirthdayItem from "./Birthday/EditBirthdayItem";
import type { Gender } from "../../types/base/gender.types";
import EditRelationItem from "./Relationship/EditRelationItem";
import type { AboutItemType } from "../../types/aboutMenu.types";
import type { Education } from "../../types/user/education.types";
import type { Email, Phone } from "../../types/user/userData.types";
import type { Visibility } from "../../types/base/visibility.types";
import type { Place, UserPlace } from "../../types/place/place.types";
import type { Birthdate, Relationship } from "../../types/user/userInfo.types";

interface AboutItemEditorProps {
  type: AboutItemType;
  data:
    | Work
    | Education
    | Email
    | Phone
    | Gender
    | Birthdate
    | Relationship
    | UserPlace
    | {
        userPlaceItem: UserPlace;
        placeItem?: Place;
      };
  onCancel: () => void;
}

const AboutItemEditor: React.FC<AboutItemEditorProps> = ({
  type,
  data,
  onCancel,
}) => {
  const renderEditor = () => {
    switch (type) {
      case "workplace":
        return <EditWorkplaceItem workItem={data as Work} />;
      case "school":
        return <EditEducationItem educationItem={data as Education} />;
      case "email":
        return (
          <EditEmailItem
            type="edit"
            emailItem={data as Email}
            onCancel={onCancel}
          />
        );
      case "place": {
        const placeData =
          typeof data === "object" &&
          data !== null &&
          "userPlaceItem" in data
            ? data
            : { placeItem: undefined, userPlaceItem: data as UserPlace };
        return (
          <EditPlacesItem
            type="edit"
            placeItem={placeData.placeItem}
            userPlaceItem={placeData.userPlaceItem}
            onCancel={onCancel}
          />
        );
      }
      case "phone":
        return (
          <EditPhoneItem
            type="edit"
            phoneItem={data as Phone}
            onCancel={onCancel}
          />
        );
      case "gender":
        return (
          <EditGender
            gender={{
              value: data as Gender,
              visibility: "global" as Visibility,
            }}
            onCancel={onCancel}
          />
        );
      case "birthday":
        return (
          <EditBirthdayItem
            birthdayItem={data as Birthdate}
            onCancel={onCancel}
          />
        );
      case "relationship":
        return (
          <EditRelationItem relationItem={data as Relationship} onCancel={onCancel} />
        );
      default:
        return null;
    }
  };

  return <>{renderEditor()}</>;
};

export default AboutItemEditor;
