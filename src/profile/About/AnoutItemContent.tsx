import React from "react";
import moment from "moment";
import { Typography, Stack } from "@mui/material";
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
      case "workplace":
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {data?.current ? "working" : "Worked"}{" "}
              {data.position && `as ${data.position}`} at <b>{data.company}</b>
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              from {moment(data.startDate).format("YYYY")} to{" "}
              {data.current ? "current" : moment(data.endDate).format("YYYY")}
            </Typography>
          </>
        );

      case "birthday":
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {moment(data.date).format("DD MMMM")}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>Birth date</Typography>
          </>
        );

      case "school":
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>
              {data?.graduated ? "Studied" : "Studying"} at <b>{data.school}</b>
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              from {moment(data.startDate).format("YYYY")} to{" "}
              {data.graduated ? moment(data.endDate).format("YYYY") : "current"}
            </Typography>
          </>
        );

      case "email":
        return <Typography sx={{ fontSize: "14px" }}>{data.email}</Typography>;

      case "gender":
        return (
          <>
            <Typography sx={{ fontSize: "14px" }}>{data.value}</Typography>
            <Typography sx={{ fontSize: "12px" }}>Gender</Typography>
          </>
        );

      case "phone":
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {data.countryCode} {data.phone}
          </Typography>
        );

      case "place":
        return (
          <Typography sx={{ fontSize: "14px" }}>
            {data.current && "Lives in"} {data.address?.city}
          </Typography>
        );

      case "relationship":
        return <Typography sx={{ fontSize: "14px" }}>{data.status}</Typography>;

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
