/* eslint-disable operator-linebreak */
import { useState } from "react";

import {
  LockOutlined,
  CloseOutlined,
  GroupOutlined,
  PublicOutlined,
} from "@mui/icons-material";
import {
  Stack,
  Radio,
  Dialog,
  Button,
  Divider,
  Typography,
  IconButton,
  useTheme,
  type CSSObject,
} from "@mui/material";

import CustomTooltip from "./CustomTooltip";
import type { Visibility } from "../types/base/visibility.types";

const ChangeAudience = ({
  sx,
  label,
  visibility,
  fontSize = 14,
  iconFontSize = 14,
  onVisibilityChange,
}: {
  sx?: CSSObject;
  label?: boolean;
  visibility: Visibility;
  fontSize?: number;
  iconFontSize?: number;
  onVisibilityChange: (visibility: Visibility) => void;
}) => {
  const theme = useTheme();

  const [changeAudienceDialogOpen, setChangeAudienceDialogOpen] =
    useState(false);

  const handleChangeAudienceDialogOpen = () => {
    return setChangeAudienceDialogOpen(true);
  };
  const handleChangeAudienceDialogClose = () => {
    return setChangeAudienceDialogOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={0.5}
        width="fit-content"
        sx={{
          px: 1,
          py: 0.4,
          borderRadius: 3,
          cursor: "pointer",
          border: label ? `1px solid ${theme?.palette?.divider}` : "none",
          ...sx,
        }}
        component="div"
        onClick={handleChangeAudienceDialogOpen}
      >
        {label ? (
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap={1}
            p={0.5}
          >
            {visibility === ("public" as Visibility) ? (
              <>
                <PublicOutlined sx={{ fontSize: iconFontSize }} />
                <Typography sx={{ fontSize }}>Global</Typography>
              </>
            ) : visibility === ("only_me" as Visibility) ? (
              <>
                <LockOutlined sx={{ fontSize: iconFontSize }} />
                <Typography sx={{ fontSize }}>Only Me</Typography>
              </>
            ) : (
              <>
                <GroupOutlined sx={{ fontSize: iconFontSize }} />
                <Typography sx={{ fontSize }}>Friends</Typography>
              </>
            )}
          </Stack>
        ) : (
          <CustomTooltip padding={8} title={visibility}>
            {visibility === ("public" as Visibility) ? (
              <PublicOutlined sx={{ fontSize: iconFontSize }} />
            ) : visibility === ("only_me" as Visibility) ? (
              <LockOutlined sx={{ fontSize: iconFontSize }} />
            ) : (
              <GroupOutlined sx={{ fontSize: iconFontSize }} />
            )}
          </CustomTooltip>
        )}
      </Stack>
      <Dialog
        open={changeAudienceDialogOpen}
        onClose={handleChangeAudienceDialogClose}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 2,
            width: "35vw",
            height: "auto",
            // backgroundColor: "white",
            maxWidth: "90vw !important",
            transition: "all 0.1s ease-in",
          },
        }}
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, fontSize: "18px" }}
          >
            Change Audience
          </Typography>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
            }}
            size="small"
            onClick={handleChangeAudienceDialogClose}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              sx={{ py: 1 }}
            >
              <PublicOutlined sx={{ fontSize: 24 }} />
              <Stack>
                <Typography variant="body1" sx={{ fontSize: 16 }}>
                  Global
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "12px" }}>
                  Anyone on or off social media
                </Typography>
              </Stack>
            </Stack>

            <Radio
              disableRipple
              size="small"
              checked={visibility === "public"}
              onChange={() => {
                onVisibilityChange("public");
                handleChangeAudienceDialogClose();
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              sx={{ py: 2 }}
            >
              <GroupOutlined sx={{ fontSize: 24 }} />
              <Stack>
                <Typography variant="body1" sx={{ fontSize: 16 }}>
                  Friends
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "12px" }}>
                  your friends on social media
                </Typography>
              </Stack>
            </Stack>
            <Radio
              disableRipple
              size="small"
              checked={visibility === "friends"}
              onChange={() => {
                onVisibilityChange("friends");
                handleChangeAudienceDialogClose();
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
              sx={{ py: 2 }}
            >
              <LockOutlined sx={{ fontSize: 24 }} />
              <Stack>
                <Typography variant="body1" sx={{ fontSize: 16 }}>
                  Only Me
                </Typography>
              </Stack>
            </Stack>
            <Radio
              disableRipple
              size="small"
              checked={visibility === "only_me"}
              onChange={() => {
                onVisibilityChange("only_me");
                handleChangeAudienceDialogClose();
              }}
            />
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack
          width="100%"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Button
            disableElevation
            disableRipple
            size="small"
            variant="outlined"
            onClick={handleChangeAudienceDialogClose}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            disableRipple
            size="small"
            variant="contained"
          >
            Save
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default ChangeAudience;
