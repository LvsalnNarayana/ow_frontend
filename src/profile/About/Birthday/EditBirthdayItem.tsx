/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
import moment from "moment";
import { useState } from "react";

import { Button, Divider, Stack, Typography } from "@mui/material";

import ChangeAudience from "../../../shared/ChangeAudience";
import SelectDateTime from "../../../shared/SelectDateTime";
import type { Birthdate } from "../../../types/user/userInfo.types";

const EditBirthdayItem = ({
  birthdayItem,
  onCancel,
}: {
  birthdayItem: Birthdate;
  onCancel: () => void;
}) => {
  const [newBirthdayItem, setBirthdayItem] = useState<Birthdate>({
    date: birthdayItem?.date || "",
    visibility: birthdayItem?.visibility || "global",
  });

  return (
    <Stack
      gap={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      <Stack
        width={"100%"}
        gap={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Typography sx={{ mb: 1, fontWeight: 600, fontSize: "16px" }}>
          Birthday
        </Typography>
        <ChangeAudience label />
        <Stack
          direction="row"
          width={"100%"}
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Stack
            gap={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <SelectDateTime
              type="year"
              id="birthday_year_select"
              value={moment(newBirthdayItem.date).format("YYYY") || ""}
              changeValue={(birthdayYearValue) => {
                setBirthdayItem({
                  ...newBirthdayItem,
                  date: moment(birthdayYearValue).format("YYYY-MM-DD"),
                });
              }}
            />
            <SelectDateTime
              type="month"
              id="birthday_month_select"
              value={moment(newBirthdayItem.date).format("MM") || ""}
              changeValue={(birthdayMonthValue) => {
                setBirthdayItem({
                  ...newBirthdayItem,
                  date: moment(birthdayMonthValue).format("YYYY-MM-DD"),
                });
              }}
            />
            <SelectDateTime
              type="days"
              id="birthday_day_select"
              value={moment(newBirthdayItem.date).format("DD") || ""}
              changeValue={(birthdayDateValue) => {
                setBirthdayItem({
                  ...newBirthdayItem,
                  date: moment(birthdayDateValue).format("YYYY-MM-DD"),
                });
              }}
            />
          </Stack>
          <Stack
            gap={2}
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button>Save</Button>
          </Stack>
        </Stack>
      </Stack>
      <Divider flexItem/>
    </Stack>
  );
};

export default EditBirthdayItem;
