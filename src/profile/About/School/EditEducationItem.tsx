/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-undefined */
/* eslint-disable no-negated-condition */
/* eslint-disable multiline-ternary */
import moment from "moment";
import { useState } from "react";

import { Stack, Checkbox, Typography, FormControlLabel } from "@mui/material";
import ChangeAudience from "../../../shared/ChangeAudience";
import SelectDateTime from "../../../shared/SelectDateTime";
import TextInput from "../../../shared/inputs/TextInput";
import type { Education } from "../../../types/user/education.types";

const EditEducationItem = ({
  educationItem,
}: {
  educationItem?: Education;
}) => {
  const [newSchoolItem, setNewSchoolItem] = useState<Omit<Education, "id">>({
    place: {
      id: "",
      name: "",
      placeTag: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        countryCode: "",
      },
      coordinates: {
        latitude: 0,
        longitude: 0,
        accuracy: 0,
      },
      timezone: "",
      createdAt: "",
      updatedAt: "",
      isActive: false,
    },
    school: educationItem?.school || "",
    degree: educationItem?.degree || "",
    endDate: educationItem?.endDate || "",
    current: educationItem?.current || false,
    startDate: educationItem?.startDate || "",
    description: educationItem?.description || "",
    visibility: educationItem?.visibility || "public",
  });

  return (
    <Stack gap={2} sx={{ my: 1 }} width={"100%"}>
      <ChangeAudience label />
      <TextInput
        name={`school_name_${educationItem?.id}`}
        placeholder="Enter your school name"
        value={newSchoolItem?.school}
        onChange={(schoolNameValue) => {
          setNewSchoolItem({
            ...newSchoolItem,
            school: schoolNameValue as string,
          });
        }}
      />
      <TextInput
        name={`school_degree_${educationItem?.id}`}
        placeholder="Enter your degree"
        value={newSchoolItem?.degree}
        onChange={(schoolDegreeValue) => {
          setNewSchoolItem({
            ...newSchoolItem,
            degree: schoolDegreeValue as string,
          });
        }}
      />
      <TextInput
        rows={4}
        name={`school_description_${educationItem?.id}`}
        placeholder="Description"
        value={newSchoolItem?.description}
        onChange={(educationDescriptionValue) => {
          setNewSchoolItem({
            ...newSchoolItem,
            description: educationDescriptionValue as string,
          });
        }}
      />
      <TextInput
        rows={4}
        name={`school_place_${educationItem?.id}`}
        placeholder="Place"
        value={newSchoolItem?.place?.address?.city as string}
        onChange={(schollPlaceValue) => {
          setNewSchoolItem({
            ...newSchoolItem,
            place: {
              ...newSchoolItem?.place,
              address: {
                ...newSchoolItem?.place?.address,
                city: schollPlaceValue as string,
              },
            },
          });
        }}
      />
      <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
        Time period
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        sx={{ my: 1 }}
      >
        <SelectDateTime
          type="year"
          id={`school_from_select_${educationItem?.id}`}
          value={
            newSchoolItem?.startDate !== null && newSchoolItem?.startDate !== ""
              ? moment(newSchoolItem?.startDate).format("YYYY").toString()
              : ""
          }
          changeValue={(fromValue) => {
            setNewSchoolItem({
              ...newSchoolItem,
              startDate: moment(fromValue).format("YYYY").toString(),
            });
          }}
        />
        <SelectDateTime
          type="year"
          id={`school_to_select_${educationItem?.id}`}
          value={
            !newSchoolItem?.current
              ? moment().format("YYYY").toString()
              : newSchoolItem?.endDate !== null && newSchoolItem?.endDate !== ""
              ? moment(newSchoolItem?.endDate).format("YYYY").toString()
              : moment().format("YYYY").toString()
          }
          changeValue={(toValue) => {
            setNewSchoolItem({
              ...newSchoolItem,
              endDate: moment(toValue).format("YYYY").toString(),
            });
          }}
        />
      </Stack>
      <FormControlLabel
        sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
        control={
          <Checkbox
            id={`school_graduated_${educationItem?.id}`}
            disableRipple
            size="small"
            checked={newSchoolItem?.current}
            onChange={(event) => {
              setNewSchoolItem({
                ...newSchoolItem,
                current: event.target.checked as boolean,
              });
            }}
          />
        }
        label="Current"
      />
    </Stack>
  );
};

export default EditEducationItem;
