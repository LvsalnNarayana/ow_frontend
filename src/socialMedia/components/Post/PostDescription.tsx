import { Button, Chip, Stack, Typography } from "@mui/material";
import type { PostInterface } from "../../../types/post/post.types";
import { useNavigate } from "react-router";
import CustomTooltip from "../../../shared/CustomTooltip";
import UserAvatar from "../../../shared/UserAvatar";
import { CheckOutlined } from "@mui/icons-material";

const PostDescription = ({ post }: { post: PostInterface }) => {
  const renderDescription = (description: string) => {
    const FONT_SIZE = 16;
    const navigate = useNavigate();
    if (!description) return null;

    // eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
    const parts = description.split(/(@\w+|#\w+)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <CustomTooltip
            key={index}
            title={
              <Stack
                minWidth={300}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gap={2}
                p={2}
              >
                <Stack mt={1}>
                  <UserAvatar username={part.slice(1)} width={70} />
                </Stack>
                <Stack gap={1}>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 18 }}
                    fontWeight={600}
                  >
                    hello world
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 14 }}>
                    @{part.slice(1)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 14 }}>
                    14 mutual connections
                  </Typography>
                  <Button variant="text" startIcon={<CheckOutlined />}>
                    Following
                  </Button>
                </Stack>
              </Stack>
            }
          >
            <Chip
              // eslint-disable-next-line react/no-array-index-key

              label={part}
              onClick={() => {
                navigate(`/profile/${part.slice(1)}`);
              }}
              sx={{
                p: 0,
                height: "auto",
                margin: "0 2px",
                cursor: "pointer",
                "& .MuiChip-label": {
                  px: "8px",
                  fontSize: FONT_SIZE,
                },
              }}
              component="span"
            />
          </CustomTooltip>
        );
      }
      if (part.startsWith("#")) {
        return (
          <Typography
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            sx={{
              cursor: "pointer",
              color: "dodgerblue",
              margin: "0 4px",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
            component={"span"}
            fontSize={FONT_SIZE}
          >
            {part}
          </Typography>
        );
      }

      return part;
    });
  };

  return (
    <Typography variant="body1" sx={{ fontSize: 16 }}>
      {renderDescription(post?.content?.text as string)}
    </Typography>
  );
};

export default PostDescription;
