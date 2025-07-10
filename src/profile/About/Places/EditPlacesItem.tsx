import { useState, useEffect } from "react";
import {
  Stack,
  Checkbox,
  Typography,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Autocomplete,
  Alert,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

import ChangeAudience from "../../../shared/ChangeAudience";
import { countries, type Country } from "../../../data/countries";
import TextInput from "../../../shared/inputs/TextInput";
import SelectInput from "../../../shared/inputs/SelectInput";
import type {
  Place,
  PlaceType,
  UserPlace,
  Address,
} from "../../../types/place/place.types";

const placeTypes: {
  value: PlaceType;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "home", label: "Home", icon: <HomeIcon sx={{ fontSize: 16 }} /> },
  { value: "work", label: "Work", icon: <WorkIcon sx={{ fontSize: 16 }} /> },
  {
    value: "school",
    label: "School",
    icon: <SchoolIcon sx={{ fontSize: 16 }} />,
  },
  { value: "restaurant", label: "Restaurant" },
  { value: "hotel", label: "Hotel" },
  { value: "landmark", label: "Landmark" },
  { value: "park", label: "Park" },
  { value: "hospital", label: "Hospital" },
  { value: "airport", label: "Airport" },
  { value: "station", label: "Station" },
  { value: "shopping", label: "Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "other", label: "Other" },
];

interface EditPlacesItemProps {
  placeItem?: Place;
  userPlaceItem: UserPlace;
  type: "edit" | "add";
  onSave?: (
    placeData: Partial<Place>,
    userPlaceData: Partial<UserPlace>
  ) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  loading?: boolean;
  userId?: string;
}

const EditPlacesItem = ({
  placeItem,
  userPlaceItem,
  type,
  onSave,
  onCancel,
  onDelete,
  loading = false,
  userId = "current-user",
}: EditPlacesItemProps) => {
  const theme = useTheme();
  // Separate Place data from UserPlace data
  const [placeData, setPlaceData] = useState<Partial<Place>>({
    id: placeItem?.id || "",
    name: placeItem?.name || "",
    placeTag: placeItem?.placeTag || "",
    address: {
      street: placeItem?.address?.street || "",
      city: placeItem?.address?.city || "",
      state: placeItem?.address?.state || "",
      country: placeItem?.address?.country || "",
      postalCode: placeItem?.address?.postalCode || "",
      countryCode: placeItem?.address?.countryCode || "",
    },
    coordinates: {
      latitude: placeItem?.coordinates?.latitude || 0,
      longitude: placeItem?.coordinates?.longitude || 0,
      accuracy: placeItem?.coordinates?.accuracy,
    },
    timezone: placeItem?.timezone || "",
    isActive: placeItem?.isActive ?? true,
  });

  const [userPlaceData, setUserPlaceData] = useState<Partial<UserPlace>>({
    placeId: userPlaceItem?.id || "",
    userId: userId,
    visibility: userPlaceItem?.visibility || "public",
    placeType: userPlaceItem?.placeType || "other",
    isCurrent: userPlaceItem?.isCurrent || false,
    isHometown: userPlaceItem?.isHometown || false,
    isFavorite: userPlaceItem?.isFavorite || false,
    notes: userPlaceItem?.notes || "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: string;
  }>({});

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-generate place tag when address changes
  useEffect(() => {
    const generatePlaceTag = () => {
      const { name, address } = placeData;
      const parts = [name, address?.city, address?.state, address?.country]
        .filter(Boolean)
        .map((part) => part?.toLowerCase().replace(/[^a-z0-9]/g, ""))
        .filter((part) => part && part.length > 0);

      return parts.join("-") || `place-${Date.now()}`;
    };

    if (placeData.address?.city || placeData.name) {
      setPlaceData((prev) => ({
        ...prev,
        placeTag: generatePlaceTag(),
      }));
    }
  }, [
    placeData.name,
    placeData.address?.city,
    placeData.address?.state,
    placeData.address?.country,
  ]);

  const handlePlaceDataChange = (field: keyof Place, value: any) => {
    setPlaceData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear related errors
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setPlaceData((prev) => ({
      ...prev,
      address: {
        ...prev.address!,
        [field]: value,
      },
    }));

    // Clear related errors
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleUserPlaceChange = (field: keyof UserPlace, value: any) => {
    setUserPlaceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCountryChange = (country: Country | null) => {
    if (country) {
      setPlaceData((prev) => ({
        ...prev,
        address: {
          ...prev.address!,
          country: country.name,
          countryCode: country.alpha2,
        },
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!placeData.address?.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!placeData.address?.state?.trim()) {
      newErrors.state = "State/Province is required";
    }

    if (!placeData.address?.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (showAdvanced && placeData.coordinates) {
      const { latitude, longitude } = placeData.coordinates;
      if (
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        newErrors.coordinates = "Invalid coordinates";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const finalPlaceData: Partial<Place> = {
      ...placeData,
      createdAt:
        type === "add" ? new Date().toISOString() : placeItem?.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const finalUserPlaceData: Partial<UserPlace> = {
      ...userPlaceData,
      placeId: finalPlaceData.id || `place_${Date.now()}`,
    };

    onSave?.(finalPlaceData, finalUserPlaceData);
  };

  const handleCancel = () => {
    setErrors({});
    onCancel?.();
  };

  const selectedCountry = countries.find(
    (c) => c.name === placeData.address?.country
  );

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      sx={{ width: "100%" }}
      spacing={3}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <LocationIcon color="primary" />
        <Typography variant="h6">
          {type === "edit" ? "Edit Place" : "Add New Place"}
        </Typography>
      </Stack>

      {/* Place Name */}
      <TextInput
        name={
          type === "edit" ? `edit_placename_${placeItem?.id}` : "add_placename"
        }
        size="small"
        label="Place Name"
        placeholder="e.g., Home, Office, Central Park"
        value={placeData.name || ""}
        onChange={(value) => handlePlaceDataChange("name", value)}
        error={!!errors.name}
        helperText={errors.name || "Optional: Give this place a memorable name"}
        disabled={loading}
        sx={{ width: "100%" }}
      />

      {/* Address Section */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Address Information
        </Typography>

        <Stack spacing={2}>
          {/* Street Address */}
          <TextInput
            name={`street_${type}_${placeItem?.id || "new"}`}
            size="small"
            label="Street Address"
            placeholder="123 Main Street, Apt 4B"
            value={placeData.address?.street || ""}
            onChange={(value) => handleAddressChange("street", value as string)}
            disabled={loading}
            sx={{ width: "100%" }}
          />

          {/* City and State Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextInput
              name={`city_${type}_${placeItem?.id || "new"}`}
              size="small"
              label="City"
              placeholder="New York"
              value={placeData.address?.city || ""}
              onChange={(value) => handleAddressChange("city", value as string)}
              error={!!errors.city}
              helperText={errors.city}
              disabled={loading}
              sx={{ flex: 1 }}
            />
            <TextInput
              name={`state_${type}_${placeItem?.id || "new"}`}
              size="small"
              label="State/Province"
              placeholder="NY"
              value={placeData.address?.state || ""}
              onChange={(value) =>
                handleAddressChange("state", value as string)
              }
              error={!!errors.state}
              helperText={errors.state}
              disabled={loading}
              sx={{ flex: 1 }}
            />
          </Stack>

          {/* Country and Postal Code Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Stack width="100%" gap={1}>
              <Typography fontSize={16}>Country</Typography>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                value={selectedCountry || null}
                onChange={(_, value) => handleCountryChange(value)}
                disabled={loading}
                sx={{ width: "100%" }}
                PaperComponent={(props) => {
                  return (
                    <Box
                      {...props}
                      sx={{
                        my: 1,
                        background: theme?.palette?.background?.paper,
                      }}
                    />
                  );
                }}
                renderOption={(props, option) => (
                  <Box
                    sx={{
                      mt: 1,
                    }}
                    component="li"
                    {...props}
                    key={option.alpha2}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <img
                        alt={option.name}
                        src={`/flags/${option.alpha2}.png`}
                        style={{ width: 20, height: 20 }}
                      />
                      <Typography>{option.name}</Typography>
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    error={!!errors.country}
                    helperText={errors.country}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: selectedCountry && (
                        <img
                          alt={selectedCountry.name}
                          src={`/flags/${selectedCountry.alpha2}.png`}
                          style={{ width: 20, height: 20, marginRight: 8 }}
                        />
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            <TextInput
              name={`postal_${type}_${placeItem?.id || "new"}`}
              size="small"
              label="Postal Code"
              placeholder="10001"
              value={placeData.address?.postalCode || ""}
              onChange={(value) =>
                handleAddressChange("postalCode", value as string)
              }
              disabled={loading}
              sx={{ flex: 1 }}
            />
          </Stack>
        </Stack>
      </Box>

      <SelectInput
        name="select_placetype"
        value={userPlaceData.placeType || "other"}
        onChange={(placeTypeValue) =>
          handleUserPlaceChange("placeType", placeTypeValue)
        }
        label="Place Type"
        options={placeTypes.map((type) => ({
          value: type.value,
          label: type.label,
        }))}
      />

      {/* Place Attributes */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Place Attributes
        </Typography>
        <Stack direction="column" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={userPlaceData.isCurrent || false}
                onChange={(e) =>
                  handleUserPlaceChange("isCurrent", e.target.checked)
                }
                disabled={loading}
              />
            }
            label="Currently here"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={userPlaceData.isHometown || false}
                onChange={(e) =>
                  handleUserPlaceChange("isHometown", e.target.checked)
                }
                disabled={loading}
              />
            }
            label="This is my hometown"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={userPlaceData.isFavorite || false}
                onChange={(e) =>
                  handleUserPlaceChange("isFavorite", e.target.checked)
                }
                disabled={loading}
              />
            }
            label="Favorite place"
          />
        </Stack>
      </Box>

      {/* Notes */}
      <TextInput
        name={`notes_${type}_${placeItem?.id || "new"}`}
        size="small"
        label="Notes"
        placeholder="Additional notes about this place..."
        value={userPlaceData.notes || ""}
        onChange={(value) => handleUserPlaceChange("notes", value)}
        disabled={loading}
        sx={{ width: "100%" }}
        multiline
        rows={3}
        helperText="Optional: Add any additional information about this place"
      />

      {/* Privacy Settings */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Privacy Settings
        </Typography>
        <ChangeAudience label />
      </Box>

      {/* Advanced Settings Toggle */}
      <Button
        variant="text"
        size="small"
        onClick={() => setShowAdvanced(!showAdvanced)}
        sx={{ alignSelf: "flex-start" }}
      >
        {showAdvanced ? "Hide" : "Show"} Advanced Settings
      </Button>

      {/* Advanced Settings */}
      {showAdvanced && (
        <Box
          sx={{
            width: "100%",
            p: 2,
            backgroundColor: theme?.palette?.background?.paper,
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Advanced Settings
          </Typography>

          <Stack spacing={2}>
            {/* Coordinates */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextInput
                name={`latitude_${type}_${placeItem?.id || "new"}`}
                size="small"
                label="Latitude"
                placeholder="40.7128"
                value={placeData.coordinates?.latitude?.toString() || ""}
                onChange={(value) =>
                  setPlaceData((prev) => ({
                    ...prev,
                    coordinates: {
                      ...prev.coordinates!,
                      latitude: parseFloat(value as string) || 0,
                    },
                  }))
                }
                disabled={loading}
                sx={{ flex: 1 }}
                type="number"
              />
              <TextInput
                name={`longitude_${type}_${placeItem?.id || "new"}`}
                size="small"
                label="Longitude"
                placeholder="-74.0060"
                value={placeData.coordinates?.longitude?.toString() || ""}
                onChange={(value) =>
                  setPlaceData((prev) => ({
                    ...prev,
                    coordinates: {
                      ...prev.coordinates!,
                      longitude: parseFloat(value as string) || 0,
                    },
                  }))
                }
                disabled={loading}
                sx={{ flex: 1 }}
                type="number"
              />
            </Stack>

            {/* Timezone */}
            <TextInput
              name={`timezone_${type}_${placeItem?.id || "new"}`}
              size="small"
              label="Timezone"
              placeholder="America/New_York"
              value={placeData.timezone || ""}
              onChange={(value) => handlePlaceDataChange("timezone", value)}
              disabled={loading}
              sx={{ width: "100%" }}
              helperText="IANA timezone identifier (e.g., America/New_York)"
            />

            {/* Place Tag */}
            <TextInput
              name={`placetag_${type}_${placeItem?.id || "new"}`}
              size="small"
              label="Place Tag"
              placeholder="central-park-nyc"
              value={placeData.placeTag || ""}
              onChange={(value) => handlePlaceDataChange("placeTag", value)}
              disabled={loading}
              sx={{ width: "100%" }}
              helperText="Unique identifier for this place (auto-generated if empty)"
            />

            {errors.coordinates && (
              <Alert severity="error">{errors.coordinates}</Alert>
            )}
          </Stack>
        </Box>
      )}

      {/* Action Buttons */}
      <Divider sx={{ width: "100%" }} />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {/* Delete Button (for edit mode) */}
        {type === "edit" && onDelete && (
          <Button
            variant="outlined"
            color="error"
            onClick={onDelete}
            disabled={loading}
            size="medium"
          >
            Delete Place
          </Button>
        )}

        {/* Save/Cancel Buttons */}
        <Stack direction="row" justifyContent={"flex-end"} spacing={2} sx={{ ml: "auto" }}>
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
              loading ||
              !placeData.address?.city?.trim() ||
              !placeData.address?.state?.trim() ||
              !placeData.address?.country?.trim()
            }
            size="medium"
          >
            {loading
              ? "Saving..."
              : type === "edit"
              ? "Update Place"
              : "Add Place"}
          </Button>
        </Stack>
      </Stack>

      {/* Status Chips */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {userPlaceData.isCurrent && (
          <Chip label="Current Location" color="primary" size="small" />
        )}
        {userPlaceData.isHometown && (
          <Chip label="Hometown" color="secondary" size="small" />
        )}
        {userPlaceData.isFavorite && (
          <Chip label="Favorite" color="success" size="small" />
        )}
        {placeData.placeTag && (
          <Chip
            sx={{ p: 1, height: 30 }}
            label={`Tag: ${placeData.placeTag}`}
            variant="outlined"
            size="small"
          />
        )}
      </Stack>
    </Stack>
  );
};

export default EditPlacesItem;
