// External
import React from "react";


// MUI
import { Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";


// Parent, Sibling, Index
import type { AboutItemType } from "../../types/aboutMenu.types";
import type { Email, Phone } from "../../types/user/userData.types";

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
        color: "#ff000090",
        alignItems: "center",
      }}
    >
      <ReportProblemIcon fontSize="small" /> Not-verified
    </Typography>
  );
};

export default VerificationStatus;
