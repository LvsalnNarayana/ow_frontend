// External
import React, { useState, useEffect } from "react";


// MUI
import {
  Box,
  Menu,
  Stack,
  Badge,
  Switch,
  Select,
  styled,
  Tooltip,
  Divider,
  useTheme,
  MenuItem,
  IconButton,
  Typography,
  FormControl,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CloseOutlined,
  Sync as SyncIcon,
  Tune as TuneIcon,
  Search as SearchIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon,
  Language as LanguageIcon,
  LocationOn as LocationOnIcon,
  LocationOff as LocationOffIcon,
  SyncDisabled as SyncDisabledIcon,
  Notifications as NotificationsIcon,
  NotificationsOff as NotificationsOffIcon,
  NotificationsActive as NotificationsActiveIcon,
} from "@mui/icons-material";


// Shared
import TextInput from "../shared/inputs/TextInput";

interface MainHeaderProps {
  notificationMenuOpen: boolean;
  openNotificationMenu: () => void;
  isDarkMode?: boolean;
  onSearch?: (query: string) => void;
}

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: 20 / 2,
    backgroundColor: "#aab4be",
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
    backgroundColor: "#001e3c",
    "&::before": {
      width: "100%",
      top: 0,
      left: 0,
      content: "''",
      height: "100%",
      position: "absolute",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: theme?.palette?.primary?.main,
    }),
  },
}));

const MainHeader: React.FC<MainHeaderProps> = ({
  onSearch,
  isDarkMode = false,
  notificationMenuOpen,
  openNotificationMenu,
}) => {
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [quickAccessAnchor, setQuickAccessAnchor] =
    useState<null | HTMLElement>(null);

  // Quick access states for web app
  const [locationEnabled, setLocationEnabled] = useState(false);

  const [autoSync, setAutoSync] = useState(true);

  const [browserNotifications, setBrowserNotifications] = useState(false);

  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");

  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  // Common timezones for quick access
  const commonTimezones = [
    { label: "Eastern Time", value: "America/New_York" },
    { label: "Central Time", value: "America/Chicago" },
    { label: "Mountain Time", value: "America/Denver" },
    { label: "Pacific Time", value: "America/Los_Angeles" },
    { label: "UTC", value: "UTC" },
    { label: "London", value: "Europe/London" },
    { label: "Paris", value: "Europe/Paris" },
    { label: "Tokyo", value: "Asia/Tokyo" },
    { label: "Sydney", value: "Australia/Sydney" },
  ];

  const languages = [
    { value: "en-US", label: "English" },
    { value: "es-ES", label: "Spanish" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "ja-JP", label: "Japanese" },
  ];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check browser notification permission
  useEffect(() => {
    setBrowserNotifications(Notification.permission === "granted");
  }, []);

  const handleSearchChange = (searchValue: string | number | boolean) => {
    const value = String(searchValue);
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleQuickAccessOpen = (event: React.MouseEvent<HTMLElement>) => {
    setQuickAccessAnchor(event.currentTarget);
  };

  const handleQuickAccessClose = () => {
    setQuickAccessAnchor(null);
  };

  const handleLocationToggle = () => {
    if (!locationEnabled) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        () => setLocationEnabled(false)
      );
    } else {
      setLocationEnabled(false);
    }
  };

  const handleNotificationToggle = async () => {
    if (!browserNotifications) {
      const permission = await Notification.requestPermission();
      setBrowserNotifications(permission === "granted");
    } else {
      setBrowserNotifications(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(selectedLanguage, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: selectedTimezone,
      hour12: selectedLanguage === "en-US",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(selectedLanguage, {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "short",
      timeZone: selectedTimezone,
    });
  };

  const getCurrentTimezone = () => {
    const tz = commonTimezones.find((t) => t.value === selectedTimezone);
    return tz ? tz.label : selectedTimezone;
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 3,
        py: 1,
        boxShadow: theme.shadows[1],
        zIndex: theme.zIndex.appBar,
        borderRadius: theme.shape.radius.xs,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Date & Time Display with Timezone */}
      <Stack
        width={"100%"}
        direction="row"
        alignItems="center"
        justifyContent={"flex-start"}
        spacing={3}
      >
        <Stack alignItems="flex-start" spacing={0.5}>
          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              lineHeight: 1,
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {formatTime(currentTime)}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: 12,
              lineHeight: 1,
              color: theme.palette.text.secondary,
            }}
          >
            {formatDate(currentTime)}
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          sx={{
            fontSize: 16,
            lineHeight: 1,
            color: theme.palette.primary.main,
          }}
        >
          {getCurrentTimezone()}
        </Typography>
      </Stack>
      {/* Global Search */}
      <Box
        width={"100%"}
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <TextInput
          name="globalSearch"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search events, contacts, tasks..."
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  fontSize: "20px",
                  color: theme.palette.text.secondary,
                }}
              />
            ),
            sx: {
              border: "none",
              borderRadius: "20px",
              backgroundColor: theme.palette.action.hover,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                backgroundColor: theme.palette.action.selected,
              },
              "&.Mui-focused": {
                boxShadow: theme.shadows[2],
                backgroundColor: theme.palette.background.paper,
              },
            },
          }}
        />
      </Box>
      <Stack
        width={"100%"}
        direction="row"
        alignItems="center"
        justifyContent={"flex-end"}
        spacing={2}
      >
        {/* Quick Access Dropdown */}
        <Tooltip title="Quick Settings">
          <IconButton
            onClick={handleQuickAccessOpen}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <TuneIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        {/* Theme Toggle */}
        <Tooltip
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <ThemeSwitch />
          {/* <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={onThemeToggle}
                icon={<LightModeIcon sx={{ fontSize: "16px" }} />}
                checkedIcon={<DarkModeIcon sx={{ fontSize: "16px" }} />}
                sx={{
                  "& .MuiSwitch-thumb": {
                    backgroundColor: isDarkMode
                      ? theme.palette.grey[800]
                      : theme.palette.warning.main,
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: isDarkMode
                      ? theme.palette.grey[600]
                      : theme.palette.grey[300],
                  },
                }}
              />
            }
            label=""
            sx={{ m: 0 }}
          /> */}
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={openNotificationMenu}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              invisible={notificationMenuOpen}
              sx={{
                "& .MuiBadge-badge": {
                  minWidth: "16px",
                  height: "16px",
                  fontSize: "10px",
                },
              }}
            >
              {notificationMenuOpen ? <CloseOutlined /> : <NotificationsIcon />}
            </Badge>
          </IconButton>
        </Tooltip>
      </Stack>
      {/* Quick Access Menu */}
      <Menu
        anchorEl={quickAccessAnchor}
        open={Boolean(quickAccessAnchor)}
        onClose={handleQuickAccessClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 280,
            mt: 1,
            maxHeight: 400,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {/* Timezone Selection */}
        <MenuItem>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Timezone
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                sx={{ fontSize: "12px" }}
              >
                {commonTimezones.map((tz) => (
                  <MenuItem
                    key={tz.value}
                    value={tz.value}
                    sx={{ fontSize: "12px" }}
                  >
                    {tz.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MenuItem>

        <Divider />

        {/* Language Selection */}
        <MenuItem>
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Language
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                sx={{ fontSize: "12px" }}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.value}
                    value={lang.value}
                    sx={{ fontSize: "12px" }}
                  >
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MenuItem>

        <Divider />

        {/* Location Toggle */}
        <MenuItem onClick={handleLocationToggle}>
          <ListItemIcon>
            {locationEnabled ? (
              <LocationOnIcon fontSize="small" color="success" />
            ) : (
              <LocationOffIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {locationEnabled ? "Disable Location" : "Enable Location"}
          </ListItemText>
        </MenuItem>

        {/* Auto Sync Toggle */}
        <MenuItem onClick={() => setAutoSync(!autoSync)}>
          <ListItemIcon>
            {autoSync ? (
              <SyncIcon fontSize="small" color="primary" />
            ) : (
              <SyncDisabledIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {autoSync ? "Disable Auto Sync" : "Enable Auto Sync"}
          </ListItemText>
        </MenuItem>

        {/* Browser Notifications Toggle */}
        <MenuItem onClick={handleNotificationToggle}>
          <ListItemIcon>
            {browserNotifications ? (
              <NotificationsActiveIcon fontSize="small" color="info" />
            ) : (
              <NotificationsOffIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {browserNotifications
              ? "Disable Notifications"
              : "Enable Notifications"}
          </ListItemText>
        </MenuItem>

        <Divider />

        {/* Calendar Sync Options */}
        <MenuItem onClick={handleQuickAccessClose}>
          <ListItemIcon>
            <PublicIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Calendar Sync</Typography>
            <Typography variant="caption" color="text.secondary">
              Google, Outlook, iCloud
            </Typography>
          </ListItemText>
        </MenuItem>

        {/* Quick Export */}
        <MenuItem onClick={handleQuickAccessClose}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body2">Export Calendar</Typography>
            <Typography variant="caption" color="text.secondary">
              Download as ICS file
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default MainHeader;
