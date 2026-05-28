// External
import React from "react";
import moment from "moment";


// MUI
import { Stack, Typography } from "@mui/material";


// Parent, Sibling, Index
import type { Work } from "../../types/user/work.types";
import type { Gender } from "../../types/base/gender.types";
import type { UserPlace } from "../../types/place/place.types";
import type { Education } from "../../types/user/education.types";
import type { Email, Phone } from "../../types/user/userData.types";
import type { Birthdate, Relationship } from "../../types/user/userInfo.types";
import type { AboutItemData, AboutItemType } from "../../types/aboutMenu.types";

interface AboutItemContentProps {
  type: AboutItemType;
  data: AboutItemData;
  Icon: React.ElementType;
}

const AboutItemContent: React.FC<AboutItemContentProps> = ({
  type,
  data,
  Icon,
}) => {
  const renderContent = () => {
    switch (type) {
      case "workplace": {
        const work = data as Work;
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {work.current ? "working" : "Worked"}{" "}
              {work.position && `as ${work.position}`} at{" "}
              <b>{work.company}</b>
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              from {moment(work.startDate).format("YYYY")} to{" "}
              {work.current ? "current" : moment(work.endDate).format("YYYY")}
            </Typography>
          </>
        );
      }

      case "birthday": {
        const birthdate = data as Birthdate;
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {moment(birthdate.date).format("DD MMMM")}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>Birth date</Typography>
          </>
        );
      }

      case "school": {
        const education = data as Education;
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {education.current ? "Studying" : "Studied"} at{" "}
              <b>{education.school}</b>
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              from {moment(education.startDate).format("YYYY")} to{" "}
              {education.current
                ? "current"
                : moment(education.endDate).format("YYYY")}
            </Typography>
          </>
        );
      }

      case "email":
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {(data as Email).email}
          </Typography>
        );

      case "gender":
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>{data as Gender}</Typography>
            <Typography sx={{ fontSize: "12px" }}>Gender</Typography>
          </>
        );

      case "phone": {
        const phone = data as Phone;
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {phone.countryCode} {phone.phone}
          </Typography>
        );
      }

      case "place": {
        const place = data as UserPlace;
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {place.isCurrent && "Lives in "}
            {place.placeType}
          </Typography>
        );
      }

      case "relationship":
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {(data as Relationship).status}
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
    >
      <Icon sx={{ fontSize: "30px" }} />
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {renderContent()}
      </Stack>
    </Stack>
  );
};

export default AboutItemContent;
