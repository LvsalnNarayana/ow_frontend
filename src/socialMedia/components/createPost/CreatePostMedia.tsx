/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper, IconButton } from "@mui/material";
import { useCreatePostContext } from "../../context/CreatePostContext";

// PostMedia interface (with id included for this component)
export interface PostMedia {
  id: string;
  url: string;
  thumbnail_url?: string;
  metadata: {
    filename: string;
    size: number;
    duration?: number;
    dimensions?: {
      width: number;
      height: number;
    };
    format: string;
  };
  alt_text?: string;
  is_processed: boolean;
}

const CreatePostMedia = () => {
  const {
    data: { media },
    actions: { removeMedia },
  } = useCreatePostContext();

  const handleRemoveMedia = (index: number) => {
    removeMedia(index);
  };

  // Helper function to check if media is an image
  const isImage = (format: string): boolean => {
    const imageFormats = [
      "JPEG",
      "JPG",
      "PNG",
      "GIF",
      "WEBP",
      "SVG",
      "BMP",
      "TIFF",
    ];
    return imageFormats.includes(format.toUpperCase());
  };

  // Helper function to check if media is a video
  const isVideo = (format: string): boolean => {
    const videoFormats = [
      "MP4",
      "WEBM",
      "OGG",
      "AVI",
      "MOV",
      "WMV",
      "FLV",
      "MKV",
    ];
    return videoFormats.includes(format.toUpperCase());
  };

  return (
    <Box sx={{ gap: 2, display: "flex", flexWrap: "wrap",flexGrow: 1 }}>
      {media &&
        media.map((item: Omit<PostMedia, "id">, index: number) => {
          const { format } = item.metadata;

          return (
            <Paper
              key={index}
              elevation={0}
              sx={{
                width: 100,
                height: 100,
                display: "flex",
                overflow: "hidden",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isImage(format) && (
                <>
                  <img
                    src={item.url}
                    alt={item.alt_text || `Uploaded content ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      return handleRemoveMedia(index);
                    }}
                    sx={{
                      p: 0.5,
                      top: 2,
                      right: 2,
                      color: "white",
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                      },
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: 14,
                      }}
                    />
                  </IconButton>
                </>
              )}

              {isVideo(format) && (
                <>
                  <video
                    src={item.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    muted
                    preload="metadata"
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      return handleRemoveMedia(index);
                    }}
                    sx={{
                      top: 2,
                      right: 2,
                      color: "white",
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  {/* Video duration overlay */}
                  {item.metadata.duration && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        right: 4,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: 1,
                        fontSize: "10px",
                        fontWeight: 500,
                      }}
                    >
                      {Math.floor(item.metadata.duration / 60)}:
                      {Math.floor(item.metadata.duration % 60)
                        .toString()
                        .padStart(2, "0")}
                    </Box>
                  )}
                </>
              )}

              {/* Fallback for unsupported formats */}
              {!isImage(format) && !isVideo(format) && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 1,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "text.secondary",
                        mb: 0.5,
                      }}
                    >
                      {format}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "8px",
                        color: "text.disabled",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "80px",
                      }}
                    >
                      {item.metadata.filename}
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => {
                      return handleRemoveMedia(index);
                    }}
                    sx={{
                      p: 0.5,
                      top: 2,
                      right: 2,
                      color: "white",
                      position: "absolute",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                      },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 12 }} />
                  </IconButton>
                </>
              )}
            </Paper>
          );
        })}
    </Box>
  );
};

export default CreatePostMedia;
