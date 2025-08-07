import { Stack, Button } from "@mui/material";
import CreatePostActions from "./CreatePostActions";
import CreatePostUser from "./CreatePostUser";
import CreatePostInput from "./CreatePostInput";
import CreatePostMedia from "./CreatePostMedia";

import PollIcon from "@mui/icons-material/Poll";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GifBoxIcon from "@mui/icons-material/GifBox";

const CreatePostDraft = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        width: "100%",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
        sx={{
          p: 2,
          width: "100%",
          overflowY: "auto",
        }}
      >
        <CreatePostUser />
        <CreatePostInput />
        <CreatePostMedia />
        <CreatePostActions />
        <Stack
          gap={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              gap: 0.5,
              flex: 1,
              fontSize: "12px",
              py: 0.5,
            }}
            onClick={() => {}}
          >
            <PollIcon sx={{ fontSize: 16, color: "blue" }} />
            Poll
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              gap: 0.5,
              flex: 1,
              fontSize: "12px",
              py: 0.5,
            }}
            onClick={() => {}}
          >
            <EventIcon sx={{ fontSize: 16, color: "purple" }} />
            Event
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              gap: 0.5,
              flex: 1,
              fontSize: "12px",
              py: 0.5,
            }}
            onClick={() => {}}
          >
            <LocationOnIcon sx={{ fontSize: 16, color: "red" }} />
            Check-in
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              gap: 0.5,
              flex: 1,
              fontSize: "12px",
              py: 0.5,
            }}
            onClick={() => {}}
          >
            <LocalOfferIcon sx={{ fontSize: 16, color: "green" }} />
            Tag
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              gap: 0.5,
              flex: 1,
              fontSize: "12px",
              py: 0.5,
            }}
            onClick={() => {}}
          >
            <GifBoxIcon sx={{ fontSize: 16, color: "pink" }} />
            GIF
          </Button>
        </Stack>
        <Button variant="contained" disableElevation sx={{ width: "100%" }}>
          Post
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreatePostDraft;
