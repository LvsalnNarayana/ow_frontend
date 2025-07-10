import React from "react";
import EditGender from "./Gender/EditGender";
import EditEmailItem from "./Email/EditEmailItem";
import EditPhoneItem from "./Phone/EditPhoneItem";
import EditPlacesItem from "./Places/EditPlacesItem";
import EditWorkplaceItem from "./Work/EditWorkplaceItem";
import EditEducationItem from "./School/EditEducationItem";
import EditBirthdayItem from "./Birthday/EditBirthdayItem";
import EditRelationItem from "./Relationship/EditRelationItem";
import type { AboutItemType } from "../../types/aboutMenu.types";
import type { Work } from "../../types/user/work.types";
import type { Education } from "../../types/user/education.types";
import type { Email, Phone } from "../../types/user/user.types";
import type { Place, UserPlace } from "../../types/place/place.types";
import type { Gender } from "../../types/base/gender.types";
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
    | {
        userPlaceItem: UserPlace;
        placeItem: Place;
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
        return <EditWorkplaceItem workItem={data} />;
      case "school":
        return <EditEducationItem educationItem={data} />;
      case "email":
        return <EditEmailItem emailItem={data} />;
      case "place":
        return (
          <EditPlacesItem
            placeItem={data?.placeItem}
            userPlaceItem={data?.userPlaceItem}
          />
        );
      case "phone":
        return <EditPhoneItem phoneItem={data} />;
      case "gender":
        return <EditGender gender={data} onCancel={onCancel} />;
      case "birthday":
        return <EditBirthdayItem birthdayItem={data} />;
      case "relationship":
        return <EditRelationItem relationItem={data} onCancel={onCancel} />;
      default:
        return null;
    }
  };

  return <>{renderEditor()}</>;
};

export default AboutItemEditor;
