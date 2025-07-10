/* eslint-disable max-lines */
/* eslint-disable operator-linebreak */
import { useState } from "react";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Stack, Button, Divider, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import AboutItem from "./AboutItem";
import EditEmailItem from "./Email/EditEmailItem";
import EditPhoneItem from "./Phone/EditPhoneItem";
import EditPlacesItem from "./Places/EditPlacesItem";
import EditWorkplaceItem from "./Work/EditWorkplaceItem";
import EditEducationItem from "./School/EditEducationItem";
import { user } from "../../sampleData/user";
import type { Email, Phone } from "../../types/user/user.types";
import type { Work } from "../../types/user/work.types";
import type { Education } from "../../types/user/education.types";
import type { Place } from "../../types/place/place.types";

const About = () => {
  const [addEducationOpen, setAddEducationOpen] = useState(false);
  const [addWorkOpen, setAddWorkOpen] = useState(false);
  const [addPlaceOpen, setAddPlaceOpen] = useState(false);
  const [addEmailOpen, setAddEmailOpen] = useState(false);
  const [addPhoneOpen, setAddPhoneOpen] = useState(false);

  return (
    <Stack
      gap={3}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Stack gap={3} sx={{ width: "70%" }}>
        <AboutItem
          data={user?.info?.gender}
          Icon={
            user?.info?.gender === ("male" as const) ? MaleIcon : FemaleIcon
          }
          type="gender"
        />
        <AboutItem
          data={user?.info?.birthdate}
          Icon={CakeOutlinedIcon}
          type="birthday"
        />
        <AboutItem
          data={user?.info?.relationship}
          Icon={FavoriteBorderOutlinedIcon}
          type="relationship"
        />
        <Stack width={"100%"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h3">Places</Typography>
            <Typography
              variant="body1"
              component="p"
              onClick={() => {
                return setAddPlaceOpen(true);
              }}
              sx={{
                gap: 1,
                color: "dodgerblue",
                display: "flex",
                fontSize: "14px",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ControlPointIcon />
              Add Place
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
        {addPlaceOpen && (
          <>
            <EditPlacesItem />
          </>
        )}
        {user?.places?.map((placeItem: Place) => {
          return (
            <AboutItem
              key={placeItem?.id}
              data={placeItem}
              Icon={CottageOutlinedIcon}
              type="place"
            />
          );
        })}
        <Stack width={"100%"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h3">Email</Typography>
            <Typography
              variant="body1"
              component="p"
              onClick={() => {
                return setAddEmailOpen(true);
              }}
              sx={{
                gap: 1,
                color: "dodgerblue",
                display: "flex",
                fontSize: "14px",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ControlPointIcon />
              Add Email
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
        {addEmailOpen && (
          <>
            <EditEmailItem type="email" />
          </>
        )}
        {user?.email?.map((emailItem: Email) => {
          return (
            <AboutItem
              key={emailItem?.id}
              data={emailItem}
              Icon={MailOutlineOutlinedIcon}
              type="email"
            />
          );
        })}
        <Stack width={"100%"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h3">Phone</Typography>
            <Typography
              variant="body1"
              component="p"
              onClick={() => {
                return setAddPhoneOpen(true);
              }}
              sx={{
                gap: 1,
                color: "dodgerblue",
                display: "flex",
                fontSize: "14px",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ControlPointIcon />
              Add Phone
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
        {addPhoneOpen && (
          <>
            <EditPhoneItem />
          </>
        )}
        {user?.phone?.map((phoneItem: Phone) => {
          return (
            <AboutItem
              key={phoneItem?.id}
              data={phoneItem}
              Icon={LocalPhoneOutlinedIcon}
              type="phone"
            />
          );
        })}
        <Stack width={"100%"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h3">Work</Typography>
            <Typography
              variant="body1"
              component="p"
              onClick={() => {
                return setAddWorkOpen(true);
              }}
              sx={{
                gap: 1,
                color: "dodgerblue",
                display: "flex",
                fontSize: "14px",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ControlPointIcon />
              Add Work
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
        {addWorkOpen && (
          <>
            <EditWorkplaceItem />
          </>
        )}
        {user.workHistory?.map((workItem: Work) => {
          return (
            <AboutItem
              key={workItem.id}
              data={workItem}
              Icon={WorkOutlineIcon}
              type="workplace"
            />
          );
        })}
        <Stack width={"100%"} gap={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Typography variant="h3">Education</Typography>
            <Typography
              variant="body1"
              component="p"
              onClick={() => {
                return setAddEducationOpen(true);
              }}
              sx={{
                gap: 1,
                color: "dodgerblue",
                display: "flex",
                fontSize: "14px",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <ControlPointIcon />
              Add Education
            </Typography>
          </Stack>
          <Divider sx={{ width: "100%" }} />
        </Stack>
        {addEducationOpen && (
          <>
            <EditEducationItem />
          </>
        )}
        {user.education.map((educationItem: Education) => {
          return (
            <AboutItem
              key={educationItem?.id}
              data={educationItem}
              Icon={SchoolOutlinedIcon}
              type="school"
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default About;
