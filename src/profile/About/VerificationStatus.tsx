import React from "react";
import { Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import type { AboutItemType } from "../../types/aboutMenu.types";
import type { Email, Phone } from "../../types/user/user.types";

interface VerificationStatusProps {
  type: AboutItemType;
  data: Email | Phone;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  type,
  data,
}) => {
  if ((type !== "email" && type !== "phone") || data?.verified) {
    return null;
  }

  return (
    <Typography
      sx={{
        mr: 2,
        gap: 0.5,
        display: "flex",
        fontSize: "14px",
        alignItems: "center",
        color: "#ff000090",
      }}
    >
      <ReportProblemIcon fontSize="small" /> Not-verified
    </Typography>
  );
};

export default VerificationStatus;
