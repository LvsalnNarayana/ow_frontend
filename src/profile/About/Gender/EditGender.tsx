/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
import { useState } from "react";

import {
  Stack,
  Select,
  MenuItem,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import type { Gender } from "../../../types/base/gender.types";
import type { Visibility } from "../../../types/base/visibility.types";
import ChangeAudience from "../../../shared/ChangeAudience";

const EditGender = ({
  gender,
  onCancel,
}: {
  gender: { value: Gender; visibility: Visibility };
  onCancel: () => void;
}) => {
  const [genderItem, setGenderItem] = useState<{
    value: Gender;
    visibility: Visibility;
  }>({
    value: gender.value || "",
    visibility: gender.visibility || "global",
  });

  return (
    <Stack
      gap={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Typography sx={{ mb: 1, fontWeight: 600, fontSize: "16px" }}>
        Gender
      </Typography>
      <ChangeAudience label/>
      <Stack
        width={"100%"}
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
        spacing={1}
      >
        <Select
          id="gender_select"
          value={genderItem.value || ""}
          displayEmpty
          MenuProps={{
            PaperProps: {
              elevation: 0,
              sx: {
                mt: 0.2,
                py: 0.4,
                maxHeight: "200px",
              },
            },
          }}
          onChange={(event) => {
            setGenderItem({
              ...genderItem,
              value: event.target.value,
            });
          }}
          sx={{
            my: 0.5,
            width: "200px",
            "& .MuiSelect-select": {
              p: 0.85,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
            },
          }}
          size="small"
        >
          <MenuItem value="" disabled>
            <Typography
              sx={{
                fontSize: 14,
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              Gender
            </Typography>
          </MenuItem>
          <MenuItem value="male">
            <Typography
              sx={{
                fontSize: 14,
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              Male
            </Typography>
          </MenuItem>
          <MenuItem value="female">
            <Typography
              sx={{
                fontSize: 14,
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              Female
            </Typography>
          </MenuItem>
        </Select>
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
      <Divider flexItem />
    </Stack>
  );
};

export default EditGender;
