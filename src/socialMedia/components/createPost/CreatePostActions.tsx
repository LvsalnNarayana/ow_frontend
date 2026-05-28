// External
import React from "react";


// MUI
import TagFacesIcon from "@mui/icons-material/TagFaces";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Stack,
  Tooltip,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";


// Context
import { useCreatePostContext } from "../../context/CreatePostContext";


// Parent, Sibling, Index
import type { PostMedia } from "../../../types/post/postMedia.types";

// PostMedia interface (omitting id as requested)

const CreatePostActions = () => {
  const theme = useTheme();

  const {
    actions: { addMedia, setCreatePostScreen },
  } = useCreatePostContext();

  // Helper function to get image/video dimensions
  const getMediaDimensions = (
    file: File
  ): Promise<{ width: number; height: number } | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => resolve(undefined);
        img.src = URL.createObjectURL(file);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.onloadedmetadata = () => {
          resolve({ width: video.videoWidth, height: video.videoHeight });
        };
        video.onerror = () => resolve(undefined);
        video.src = URL.createObjectURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  // Helper function to get video duration
  const getVideoDuration = (file: File): Promise<number | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.onloadedmetadata = () => {
          resolve(video.duration);
        };
        video.onerror = () => resolve(undefined);
        video.src = URL.createObjectURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  // Helper function to get file format from MIME type
  const getFileFormat = (mimeType: string): string => {
    const formatMap: Record<string, string> = {
      "video/mp4": "MP4",
      "video/ogg": "OGG",
      "video/avi": "AVI",
      "video/mov": "MOV",
      "video/webm": "WEBM",
      "video/quicktime": "MOV",
      "image/jpg": "JPG",
      "image/png": "PNG",
      "image/gif": "GIF",
      "image/jpeg": "JPEG",
      "image/webp": "WEBP",
      "image/svg+xml": "SVG",
    };

    return (
      formatMap[mimeType] || mimeType.split("/")[1]?.toUpperCase() || "UNKNOWN"
    );
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    // Process each file and create PostMedia objects
    const mediaPromises = fileArray.map(
      async (file): Promise<Omit<PostMedia, "id">> => {
        const url = URL.createObjectURL(file);

        const dimensions = await getMediaDimensions(file);

        const duration = await getVideoDuration(file);

        return {
          url,
          is_processed: false, // Initially not processed
          metadata: {
            duration,
            dimensions,
            size: file.size,
            filename: file.name,
            format: getFileFormat(file.type),
          },
        };
      }
    );

    try {
      const mediaFiles = await Promise.all(mediaPromises);

      // Add media files to context (assuming addMedia accepts PostMedia[])
      addMedia(mediaFiles);
    } catch (error) {
      console.error("Error processing media files:", error);
    }

    // Reset the input value to allow selecting the same files again
    event.target.value = "";
  };

  return (
    <Stack
      sx={{
        width: "100%",
        p: 1,
        px: 2,
        mb: 2,
        borderRadius: theme?.shape?.radius?.xs,
        border: `1px solid ${theme?.palette?.divider}`,
      }}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="body1" sx={{ fontSize: "14px" }}>
        Add to your post
      </Typography>
      <Stack
        gap={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Tooltip title="Photo / Video" arrow placement="top">
          <IconButton component="label" style={{ cursor: "pointer" }}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
              accept="image/*,video/*"
              multiple
            />
            <AddPhotoAlternateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tag people" arrow placement="top">
          <IconButton
            onClick={() => {
              return setCreatePostScreen("tags");
            }}
          >
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Feeling" arrow placement="top">
          <IconButton
            onClick={() => {
              return setCreatePostScreen("feelings");
            }}
          >
            <TagFacesIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Check in" arrow placement="top">
          <IconButton
            onClick={() => {
              return setCreatePostScreen("location");
            }}
          >
            <LocationOnIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Live Video" arrow placement="top">
          <IconButton>
            <PhotoCameraFrontIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default CreatePostActions;
