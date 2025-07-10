/* eslint-disable react/no-array-index-key */
import { useState } from "react";

import {
  Stack,
  Select,
  MenuItem,
  Typography,
  Button,
  Divider,
} from "@mui/material";

// import useData from "../../../hooks/data/useData";
import ChangeAudience from "../../../shared/ChangeAudience";
import type { Relationship } from "../../../types/user/userInfo.types";
import { RELATIONSHIP_OPTIONS } from "../../../types/base/relationShipStatus.types";

const EditRelationItem = ({
  relationItem,
  onCancel,
}: {
  relationItem: Relationship;
  onCancel: () => void;
}) => {
  // const { relationship } = useData();
  const [newRelationItem, setNewRelationItem] = useState({
    status: relationItem.status || "",
    visibility: relationItem.visibility || "global",
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
        width="100%"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={1}
      >
        <Typography sx={{ mb: 1, fontWeight: 600, fontSize: "16px" }}>
          Relationship Status
        </Typography>
        <ChangeAudience
          label
          visibility="public"
          onVisibilityChange={() => {}}
        />
        <Stack
          width={"100%"}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            gap={2}
          >
            <Select
              id={`relationship_status_select`}
              value={newRelationItem?.status}
              displayEmpty
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    mt: 1,
                    py: 0.4,
                    maxHeight: "200px",
                  },
                },
              }}
              onChange={(event) => {
                setNewRelationItem((prev) => {
                  return {
                    ...prev,
                    relationId: event.target.value,
                  };
                });
              }}
              sx={{
                my: 0.5,
                width: "100%",
                "& .MuiSelect-select": {
                  p: 0.85,
                },
              }}
              size="small"
            >
              <MenuItem value="" disabled>
                <Typography sx={{ fontSize: 14, textAlign: "center" }}>
                  Relationship Status
                </Typography>
              </MenuItem>
              {RELATIONSHIP_OPTIONS?.map((relation, index) => {
                return (
                  <MenuItem key={index} value={relation?.value}>
                    <Typography
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {relation.value}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </Stack>
          <Stack
            gap={2}
            width={"100%"}
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
      <Divider flexItem />
    </Stack>
  );
};

export default EditRelationItem;
