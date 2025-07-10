import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
  Box,
  Avatar,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import Markdown from "react-markdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router";
import UserAvatar from "../../shared/UserAvatar";
import UserGroup from "../../shared/UserGroup";
import { user } from "../../sampleData/user";

const markdown =
  "# Project Proposal\n\n*This document outlines the key objectives and timeline for our upcoming project initiative.*\n\n## Overview\nWe are proposing a comprehensive solution that will streamline our workflow and improve team collaboration.";

interface MiniDocProps {
  viewMode?: "grid" | "list";
  isRecent?: boolean;
  isShared?: boolean;
  isStarred?: boolean;
}

const MiniDoc = ({
  viewMode = "grid",
  isRecent = false,
  isShared = false,
  isStarred = false,
}: MiniDocProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [starred, setStarred] = useState(isStarred);

  // Mock data
  const docData = {
    title: "Project Proposal",
    lastModified: "2 hours ago",
    author: "John Doe",
    collaborators: ["Alice", "Bob", "Charlie"],
    isPrivate: !isShared,
  };

  const calculateFontSize = (px: number) => {
    const a4Width = 210;
    const a4Height = 297;
    const a4Diagonal = Math.sqrt(a4Width ** 2 + a4Height ** 2);
    const a4FontSize = a4Diagonal / Math.sqrt(2);
    const fontSize = (px * a4FontSize) / a4Diagonal;
    return fontSize;
  };

  const baseSise = {
    h1FontSize: calculateFontSize(20) + "px",
    h2FontSize: calculateFontSize(18) + "px",
    h3FontSize: calculateFontSize(16) + "px",
    body1FontSize: calculateFontSize(10) + "px",
    fontFamily: theme.typography.fontFamily,
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStarToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setStarred(!starred);
  };

  if (viewMode === "list") {
    return (
      <Card
        sx={{
          width: "100%",
          height: "fit-content",
          flexShrink: 0,
          cursor: "pointer",
          transition: "all 0.2s ease",
          borderRadius: 1,
        }}
        onClick={() => navigate("/docs/editor/1")}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Increased padding */}
          <Stack direction="row" spacing={3} alignItems="center">
            {" "}
            {/* Increased spacing */}
            {/* Document Preview */}
            <Box
              sx={{
                width: 100, // Increased width
                height: 120, // Increased height
                borderRadius: 1,
                backgroundColor: theme.palette.common.white,
                border: `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Box sx={{ p: 1, height: "100%", overflow: "hidden" }}>
                {" "}
                {/* Increased padding */}
                <Markdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <Typography
                        fontSize="10px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.5}
                        color="text.primary"
                        fontWeight={600}
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <Typography
                        fontSize="9px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.3}
                        color="text.primary"
                        fontWeight={500}
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <Typography
                        fontSize="8px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        mb={0.2}
                        color="text.primary"
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <Typography
                        fontSize="8px" // Increased font size
                        lineHeight={1.3}
                        margin={0}
                        color="text.primary"
                        component="i"
                        {...props}
                      />
                    ),
                  }}
                >
                  {markdown}
                </Markdown>
              </Box>
            </Box>
            {/* Document Info */}
            <Stack flex={1} spacing={1.5}>
              {" "}
              {/* Increased spacing */}
              <Typography
                variant="h6"
                fontWeight={600}
                color="text.primary"
                fontSize={16}
              >
                {docData.title}
              </Typography>
              <Typography variant="body1" color="text.primary" fontSize={14}>
                Modified {docData.lastModified} by {docData.author}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                {" "}
                {/* Increased spacing */}
                {docData.isPrivate ? (
                  <LockIcon sx={{ fontSize: 20, color: "text.primary" }} /> // Increased icon size
                ) : (
                  <PeopleIcon sx={{ fontSize: 20, color: "text.primary" }} /> // Increased icon size
                )}
                <Typography variant="body2" color="text.primary" fontSize={13}>
                  {docData.isPrivate
                    ? "Private"
                    : `${docData.collaborators.length} collaborators`}
                </Typography>
              </Stack>
            </Stack>
            {/* Actions */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {" "}
              {/* Added spacing */}
              <Tooltip
                title={starred ? "Remove from starred" : "Add to starred"}
              >
                <IconButton size="medium" onClick={handleStarToggle}>
                  {" "}
                  {/* Changed to medium */}
                  {starred ? (
                    <StarIcon sx={{ color: "warning.main" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
              <IconButton size="medium" onClick={handleClick}>
                {" "}
                {/* Changed to medium */}
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Stack
      sx={{
        width: 250,
        borderRadius: 1,
        aspectRatio: "210 / 297",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s ease",
        // boxShadow: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
      onClick={() => navigate("/docs/editor/1")}
    >
      {/* Star Button */}
      <Tooltip title={starred ? "Remove from starred" : "Add to starred"}>
        <IconButton
          size="small"
          onClick={handleStarToggle}
          sx={{
            p: 0.5,
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {starred ? (
            <StarIcon sx={{ color: "warning.main", fontSize: 18 }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: 18 }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Document Preview */}
      <Box
        sx={{
          p: 1.5,
          width: "100%",
          height: "calc(100% - 80px)",
          overflow: "hidden",
          position: "relative",
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Markdown
          components={{
            h1: ({ node, ...props }) => (
              <Typography
                lineHeight={1.3}
                margin={0}
                mb={0.8}
                fontSize={baseSise.h1FontSize}
                color={"#000"}
                fontWeight={600}
                variant="h1"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <Typography
                lineHeight={1.3}
                margin={0}
                mb={0.6}
                fontSize={baseSise.h2FontSize}
                color={"#000"}
                fontWeight={500}
                variant="h2"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <Typography
                lineHeight={1.4}
                margin={0}
                mb={0.4}
                fontSize={baseSise.body1FontSize}
                color={"#000"}
                variant="body1"
                {...props}
              />
            ),
            em: ({ node, ...props }) => (
              <Typography
                lineHeight={1.4}
                margin={0}
                variant="body1"
                color={"#000"}
                component="i"
                fontSize={baseSise.body1FontSize}
                {...props}
              />
            ),
          }}
        >
          {markdown}
        </Markdown>
      </Box>

      {/* Document Footer */}
      <Stack
        py={1.5}
        px={1.5}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        position={"absolute"}
        bottom={0}
        width={"100%"}
        bgcolor={`${theme?.palette?.background?.paper}`}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          minHeight: "80px",
        }}
      >
        <Stack gap={0.5} flex={1}>
          <Typography
            variant="body1"
            fontSize={14}
            fontWeight={600}
            noWrap
            color="text.primary"
          >
            {docData.title}
          </Typography>
          <Typography
            variant="body2"
            fontSize={12}
            fontWeight={400}
            color="text.primary"
            noWrap
          >
            Modified {docData.lastModified}
          </Typography>

          {/* Collaborators or Privacy Status */}
          <Stack direction="row" alignItems="center" spacing={0.8} mt={0.5}>
            {docData.isPrivate ? (
              <>
                <LockIcon sx={{ fontSize: 14, color: "text.primary" }} />
                <Typography
                  variant="caption"
                  fontSize={11}
                  color="text.primary"
                >
                  Private
                </Typography>
              </>
            ) : (
              <>
                <Stack direction="row" spacing={-0.5}>
                  <UserGroup
                    users={docData.collaborators?.map((user) => {
                      return {
                        id: user,
                        username: user,
                        firstname: user,
                        lastname: user,
                      };
                    })}
                    size={22}
                    length={3}
                  />
                  {docData.collaborators.length > 3 && (
                    <Avatar
                      sx={{
                        width: 18,
                        height: 18,
                        fontSize: 9,
                        backgroundColor: "text.secondary",
                        border: `1px solid ${theme.palette.background.paper}`,
                      }}
                    >
                      +{docData.collaborators.length - 3}
                    </Avatar>
                  )}
                </Stack>
                <Typography
                  variant="caption"
                  fontSize={12}
                  color="text.primary"
                >
                  {docData.collaborators.length} collaborators
                </Typography>
              </>
            )}
          </Stack>
        </Stack>

        <IconButton
          sx={{
            p: 0.5,
          }}
          onClick={handleClick}
        >
          <MoreVertIcon
            sx={{
              fontSize: 18,
            }}
          />
        </IconButton>
      </Stack>

      {/* Context Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShareIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LaunchOutlinedIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Open in new tab</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            "&:hover": {
              backgroundColor: "error.main",
              color: "white",
            },
          }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon
              fontSize="small"
              sx={{
                fontSize: 16,
              }}
            />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default MiniDoc;
