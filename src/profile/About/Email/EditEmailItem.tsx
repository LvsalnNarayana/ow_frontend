import { useState } from "react";
import {
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Alert,
  Chip,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  VerifiedUser as VerifiedIcon,
  Email as EmailIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { MuiOtpInput } from "mui-one-time-password-input";

import ChangeAudience from "../../../shared/ChangeAudience";
import TextInput from "../../../shared/inputs/TextInput";
import type { Email } from "../../../types/user/user.types";

interface EditEmailItemProps {
  emailItem?: Email;
  type: "edit" | "add";
  onSave?: (emailData: Omit<Email, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  onVerify?: (email: string, otp: string) => Promise<boolean>;
  onSendVerification?: (email: string) => Promise<boolean>;
  loading?: boolean;
}

const EditEmailItem = ({
  emailItem,
  type,
  onSave,
  onCancel,
  onVerify,
  onSendVerification,
  loading = false,
}: EditEmailItemProps) => {
  const theme = useTheme();
  const [newEmailItem, setNewEmailItem] = useState<
    Omit<Email, "id" | "createdAt" | "updatedAt">
  >({
    email: emailItem?.email || "",
    verified: emailItem?.verified || false,
    visibility: emailItem?.visibility || ("public" as const),
  });

  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
  }>({});

  // Verification modal state
  const [verificationModal, setVerificationModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const matchIsNumeric = (text: string): boolean => {
    return text !== "" && !isNaN(Number(text));
  };

  const validateChar = (value: string): boolean => {
    return matchIsNumeric(value);
  };

  const handleEmailChange = (value: string | number | boolean) => {
    const emailValue = value as string;
    setNewEmailItem((prev) => ({
      ...prev,
      email: emailValue,
    }));

    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSave = () => {
    // Validate email
    if (!newEmailItem.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(newEmailItem.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    // Clear errors and call onSave
    setErrors({});
    onSave?.(newEmailItem);
  };

  const handleCancel = () => {
    // Reset form to original values
    setNewEmailItem({
      email: emailItem?.email || "",
      verified: emailItem?.verified || false,
      visibility: emailItem?.visibility || ("public" as const),
    });
    setErrors({});
    onCancel?.();
  };

  const handleSendVerification = async () => {
    if (!validateEmail(newEmailItem.email)) {
      setErrors({ email: "Please enter a valid email address first" });
      return;
    }

    setVerificationLoading(true);
    setVerificationError("");

    try {
      const success = await onSendVerification?.(newEmailItem.email);
      if (success) {
        setVerificationSent(true);
        setVerificationModal(true);
      } else {
        setVerificationError("Failed to send verification code");
      }
    } catch (error) {
      setVerificationError("Error sending verification code");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      setErrors({ otp: "Please enter the 4-digit verification code" });
      return;
    }

    setVerificationLoading(true);
    setVerificationError("");

    try {
      const success = await onVerify?.(newEmailItem.email, otp);
      if (success) {
        setNewEmailItem((prev) => ({
          ...prev,
          isVerified: true,
          verifiedAt: new Date().toISOString(),
        }));
        setVerificationModal(false);
        setOtp("");
        setVerificationSent(false);
      } else {
        setErrors({ otp: "Invalid verification code" });
      }
    } catch (error) {
      setErrors({ otp: "Verification failed. Please try again." });
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleCloseVerificationModal = () => {
    setVerificationModal(false);
    setOtp("");
    setErrors((prev) => ({ ...prev, otp: undefined }));
    setVerificationError("");
  };

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
    setErrors((prev) => ({ ...prev, otp: undefined }));
    setVerificationError("");
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ width: "100%" }}
        spacing={3}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <EmailIcon color="primary" />
          <Typography variant="h6">
            {type === "edit" ? "Edit Email" : "Add New Email"}
          </Typography>
        </Stack>

        <Stack
          flexGrow={1}
          gap={2}
          sx={{ width: "100%" }}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* Email Input with Verification Status */}
          <Box sx={{ width: "100%", position: "relative" }}>
            <TextInput
              value={newEmailItem.email}
              name={
                type === "edit"
                  ? `edit_email_item_${emailItem?.id}`
                  : "new_email_item"
              }
              label="Email Address"
              placeholder="Enter email address"
              sx={{ width: "100%" }}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />

            {/* Verification Status */}
            {newEmailItem.email && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, alignItems: "center" }}
              >
                {newEmailItem.verified ? (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified"
                    color="success"
                    size="small"
                  />
                ) : (
                  <>
                    <Chip label="Not Verified" color="warning" size="small" />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SendIcon />}
                      onClick={handleSendVerification}
                      disabled={
                        verificationLoading ||
                        !validateEmail(newEmailItem.email)
                      }
                      sx={{ ml: 1 }}
                    >
                      {verificationLoading ? "Sending..." : "Verify Email"}
                    </Button>
                  </>
                )}
              </Stack>
            )}

            {verificationError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {verificationError}
              </Alert>
            )}
          </Box>

          {/* Visibility/Audience Control */}
          <Box sx={{ width: "100%" }}>
            <ChangeAudience label />
          </Box>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%", justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
              size="medium"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading || !newEmailItem.email.trim()}
              size="medium"
            >
              {loading
                ? "Saving..."
                : type === "edit"
                ? "Update Email"
                : "Add Email"}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Verification Modal */}
      <Dialog
        open={verificationModal}
        onClose={handleCloseVerificationModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <VerifiedIcon color="primary" />
              <Typography variant="h6">Verify Email Address</Typography>
            </Stack>
            <IconButton
              onClick={handleCloseVerificationModal}
              size="small"
              sx={{ color: theme?.palette?.common?.white }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              We've sent a 4-digit verification code to:
            </Typography>

            <Typography variant="body1" fontWeight={600} color="primary.main">
              {newEmailItem.email}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Please enter the code below to verify your email address:
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <MuiOtpInput
                value={otp}
                onChange={handleOtpChange}
                length={4}
                validateChar={validateChar}
                sx={{
                  my: 2,
                  gap: 2,
                  "& .MuiOtpInput-TextField": {
                    width: "60px",
                    height: "60px",
                  },
                  "& .MuiOtpInput-TextField .MuiInputBase-input": {
                    p: 2,
                    fontSize: "1.2rem",
                    textAlign: "center",
                  },
                }}
              />
            </Box>

            {errors.otp && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.otp}
              </Alert>
            )}

            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              Didn't receive the code?
              <Button
                variant="text"
                size="small"
                onClick={handleSendVerification}
                disabled={verificationLoading}
                sx={{ ml: 0.5, textTransform: "none" }}
              >
                Resend Code
              </Button>
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseVerificationModal}
            disabled={verificationLoading}
            color="inherit"
            sx={{
              height: 32,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyOTP}
            variant="contained"
            disabled={verificationLoading || !otp || otp.length !== 4}
            startIcon={verificationLoading ? undefined : <VerifiedIcon />}
          >
            {verificationLoading ? "Verifying..." : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditEmailItem;
