/* eslint-disable no-negated-condition */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
import moment from "moment";
import { useState } from "react";

import {
  Stack,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";

// import InputField from "../../shared/InputField";
import ChangeAudience from "../../../shared/ChangeAudience";
import TextInput from "../../../shared/inputs/TextInput";
import type { Work } from "../../../types/user/work.types";

const EditWorkplaceItem = ({ workItem }: { workItem?: Work }) => {
  const [newWorkItem, setNewWorkItem] = useState({
    id: workItem?.id || "new",
    city: workItem?.city || "",
    company: workItem?.company || "",
    endDate: workItem?.endDate || "",
    position: workItem?.position || "",
    current: workItem?.current || false,
    startDate: workItem?.startDate || "",
    description: workItem?.description || "",
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => 1950 + index
  );

  return (
    <Stack gap={2} sx={{ my: 1 }} width="100%">
      <ChangeAudience label />
      <TextInput
        name={`workplace_name_${newWorkItem?.id}`}
        placeholder="Company"
        value={newWorkItem?.company}
        onChange={(value) => {
          setNewWorkItem({ ...newWorkItem, company: value as string });
        }}
      />
      <TextInput
        onChange={(value) => {
          setNewWorkItem({ ...newWorkItem, position: value as string });
        }}
        name={`workplace_position_${newWorkItem?.id}`}
        placeholder="Position"
        value={newWorkItem?.position}
      />
      <TextInput
        onChange={(value) => {
          setNewWorkItem({ ...newWorkItem, city: value as string });
        }}
        name={`workplace_town_${newWorkItem?.id}`}
        placeholder="City / Town"
        value={newWorkItem?.city}
      />
      <TextInput
        rows={4}
        onChange={(value) => {
          setNewWorkItem({ ...newWorkItem, description: value as string });
        }}
        name={`workplace_description_${newWorkItem?.id}`}
        placeholder="Description"
        value={newWorkItem?.description}
      />
      <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
        Time period
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >
        <Select
          id={`workplace_from_select_${newWorkItem?.id}`}
          value={
            newWorkItem?.startDate !== ""
              ? moment(newWorkItem?.startDate).format("YYYY")
              : ""
          }
          displayEmpty
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                mt: 0.2,
                py: 0.4,
                maxHeight: "200px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              },
            },
          }}
          onChange={(event) => {
            setNewWorkItem({
              ...newWorkItem,
              startDate: moment(event.target.value).format("YYYY"),
            });
          }}
          sx={{
            my: 0.5,
            width: "100px",
            "& .MuiSelect-select": {
              p: 0.85,
            },
          }}
          size="small"
        >
          <MenuItem sx={{ px: 0.8, py: 0.2 }} value="" disabled>
            <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
              Year
            </Typography>
          </MenuItem>{" "}
          {years.map((year) => {
            return (
              <MenuItem key={year} sx={{ px: 0.8, py: 0.2 }} value={year}>
                <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
                  {year}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
        <Select
          id={`workplace_to_select_${newWorkItem?.id}`}
          value={
            newWorkItem?.current
              ? moment().format("YYYY")
              : newWorkItem?.endDate !== ""
              ? moment(newWorkItem?.endDate).format("YYYY")
              : ""
          }
          displayEmpty
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                mt: 0.2,
                py: 0.4,
                maxHeight: "200px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              },
            },
          }}
          onChange={(event) => {
            setNewWorkItem({
              ...newWorkItem,
              endDate: moment(event.target.value).format("YYYY"),
            });
          }}
          sx={{
            my: 0.5,
            width: "100px",
            "& .MuiSelect-select": {
              p: 0.85,
            },
          }}
          size="small"
        >
          <MenuItem sx={{ px: 0.8, py: 0.2 }} value="" disabled>
            <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
              Year
            </Typography>
          </MenuItem>
          {years.map((year) => {
            return (
              <MenuItem key={year} sx={{ px: 0.8, py: 0.2 }} value={year}>
                <Typography sx={{ fontSize: "13px", textAlign: "center" }}>
                  {year}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
      </Stack>
      <FormControlLabel
        sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
        control={
          <Checkbox
            disableRipple
            size="small"
            onChange={(event) => {
              setNewWorkItem({
                ...newWorkItem,
                current: event.target.checked,
              });
            }}
            checked={newWorkItem?.current}
          />
        }
        label="Current"
      />
    </Stack>
  );
};

export default EditWorkplaceItem;
