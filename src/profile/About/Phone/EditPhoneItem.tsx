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
  Autocomplete,
  TextField,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  VerifiedUser as VerifiedIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { MuiOtpInput } from "mui-one-time-password-input";

import ChangeAudience from "../../../shared/ChangeAudience";
import TextInput from "../../../shared/inputs/TextInput";
import type { Phone } from "../../../types/user/user.types";
import { countries, type Country } from "../../../data/countries";
import { theme } from "../../../theme";

interface EditPhoneItemProps {
  phoneItem?: Phone;
  type: "edit" | "add";
  onSave?: (phoneData: Omit<Phone, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  onVerify?: (phone: string, otp: string) => Promise<boolean>;
  onSendVerification?: (phone: string) => Promise<boolean>;
  loading?: boolean;
}

const EditPhoneItem = ({
  phoneItem,
  type,
  onSave,
  onCancel,
  onVerify,
  onSendVerification,
  loading = false,
}: EditPhoneItemProps) => {
  const [newPhoneItem, setNewPhoneItem] = useState<
    Omit<Phone, "id" | "createdAt" | "updatedAt">
  >({
    phone: phoneItem?.phone || "",
    country: phoneItem?.country || "",
    primary: phoneItem?.primary || false,
    verified: phoneItem?.verified || false,
    countryCode: phoneItem?.countryCode || "",
    visibility: phoneItem?.visibility || "public",
  });

  const [errors, setErrors] = useState<{
    phone?: string;
    country?: string;
    otp?: string;
  }>({});

  // Verification modal state
  const [verificationModal, setVerificationModal] = useState(true);
  const [otp, setOtp] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - adjust regex based on your requirements
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-numeric characters except +
    const cleaned = phone.replace(/[^\d\+]/g, "");
    return cleaned;
  };

  const matchIsNumeric = (text: string): boolean => {
    return text !== "" && !isNaN(Number(text));
  };

  const validateChar = (value: string): boolean => {
    return matchIsNumeric(value);
  };

  const handlePhoneChange = (value: string | number | boolean) => {
    const phoneValue = formatPhoneNumber(value as string);
    setNewPhoneItem((prev) => ({
      ...prev,
      phone: phoneValue,
    }));

    // Clear error when user starts typing
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleCountryChange = (country: Country | null) => {
    if (country) {
      setNewPhoneItem((prev) => ({
        ...prev,
        country: country.alpha2,
        countryCode: country.calling_code || "",
      }));

      // Clear country error
      if (errors.country) {
        setErrors((prev) => ({ ...prev, country: undefined }));
      }
    }
  };
  const getFullPhoneNumber = (): string => {
    const { countryCode, phone } = newPhoneItem;
    if (countryCode && phone) {
      return `${countryCode} - ${phone}`;
    }
    return phone;
  };

  const handleSave = () => {
    const newErrors: typeof errors = {};

    // Validate phone
    if (!newPhoneItem.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(newPhoneItem.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Validate country
    if (!newPhoneItem.country) {
      newErrors.country = "Please select a country";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and call onSave
    setErrors({});
    onSave?.(newPhoneItem);
  };

  const handleCancel = () => {
    // Reset form to original values
    setNewPhoneItem({
      phone: phoneItem?.phone || "",
      country: phoneItem?.country || "",
      primary: phoneItem?.primary || false,
      verified: phoneItem?.verified || false,
      countryCode: phoneItem?.countryCode || "",
      visibility: phoneItem?.visibility || "public",
    });
    setErrors({});
    onCancel?.();
  };

  const handleSendVerification = async () => {
    if (!validatePhone(newPhoneItem.phone)) {
      setErrors({ phone: "Please enter a valid phone number first" });
      return;
    }

    if (!newPhoneItem.country) {
      setErrors({ country: "Please select a country first" });
      return;
    }

    setVerificationLoading(true);
    setVerificationError("");

    try {
      const fullPhone = getFullPhoneNumber();
      const success = await onSendVerification?.(fullPhone);
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
      const fullPhone = getFullPhoneNumber();
      const success = await onVerify?.(fullPhone, otp);
      if (success) {
        setNewPhoneItem((prev) => ({
          ...prev,
          verified: true,
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

  const selectedCountry = countries.find(
    (c) => c.alpha2 === newPhoneItem.country
  );

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
          <PhoneIcon color="primary" />
          <Typography variant="h6">
            {type === "edit" ? "Edit Phone" : "Add New Phone"}
          </Typography>
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={3}
          sx={{ width: "100%" }}
        >
          {/* Country Selection */}
          <Box sx={{ width: "100%" }}>
            <Stack gap={1} width="100%">
              <Typography variant="body1" fontSize={16}>
                Country
              </Typography>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) =>
                  `${option.name} (${option.calling_code})`
                }
                value={selectedCountry || null}
                onChange={(_, value) => handleCountryChange(value)}
                disabled={loading}
                sx={{ width: "100%" }}
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.alpha2}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: "100%" }}
                    >
                      <img
                        alt={option.name}
                        src={`/flags/${option.alpha2}.png`}
                        style={{ width: 24, height: 24 }}
                      />
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        gap={1}
                        sx={{ flex: 1 }}
                      >
                        <Typography variant="body2">{option.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.calling_code}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    error={!!errors.country}
                    helperText={errors.country}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: selectedCountry && (
                        <Stack
                          direction="row"
                          justifyContent={"center"}
                          alignItems="center"
                          spacing={1}
                          sx={{ mr: 1 }}
                        >
                          <img
                            alt={selectedCountry.name}
                            src={`/flags/${selectedCountry.alpha2}.png`}
                            style={{ width: 30, height: 30 }}
                          />
                        </Stack>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </Box>

          {/* Phone Number Input */}
          <Box sx={{ width: "100%", position: "relative" }}>
            <TextInput
              name={type === "edit" ? `phone_${phoneItem?.id}` : "phone"}
              value={newPhoneItem.phone}
              onChange={handlePhoneChange}
              label="Phone Number"
              placeholder="Enter phone number"
              error={!!errors.phone}
              helperText={
                errors.phone || `Full number: ${getFullPhoneNumber()}`
              }
              disabled={loading}
              sx={{ width: "100%" }}
            />

            {/* Verification Status */}
            {newPhoneItem.phone && (
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, alignItems: "center" }}
              >
                {newPhoneItem.verified ? (
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
                        !validatePhone(newPhoneItem.phone) ||
                        !newPhoneItem.country
                      }
                      sx={{ ml: 1 }}
                    >
                      {verificationLoading ? "Sending..." : "Verify Phone"}
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
              disabled={
                loading || !newPhoneItem.phone.trim() || !newPhoneItem.country
              }
              size="medium"
            >
              {loading
                ? "Saving..."
                : type === "edit"
                ? "Update Phone"
                : "Add Phone"}
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
              <Typography variant="h6">Verify Phone Number</Typography>
            </Stack>
            <IconButton
              onClick={handleCloseVerificationModal}
              size="small"
              sx={{ color: theme?.palette?.common?.white}}
            >
              <CloseIcon fontSize="small"/>
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />

        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              We've sent a 4-digit verification code via SMS to:
            </Typography>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={1}
              p={2}
              sx={{
                borderRadius: theme.shape.radius.xs,
                backgroundColor: theme.palette.background?.default,
              }}
            >
              {selectedCountry && (
                <img
                  alt={selectedCountry.name}
                  src={`/flags/${selectedCountry.alpha2}.png`}
                  style={{ width: 20, height: 20 }}
                />
              )}
              <Typography variant="body1" fontWeight={600} fontSize={18}>
                {getFullPhoneNumber()}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Please enter the code below to verify your phone number:
            </Typography>

            <Stack
              py={2}
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent={"center"}
            >
              <MuiOtpInput
                value={otp}
                onChange={handleOtpChange}
                length={4}
                validateChar={validateChar}
                sx={{
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
            </Stack>

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

export default EditPhoneItem;
