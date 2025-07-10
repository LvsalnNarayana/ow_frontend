/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-extra-parens */
/* eslint-disable operator-linebreak */
import { Stack, Typography } from "@mui/material";

import UserAvatar from "../../../shared/UserAvatar";
import { user } from "../../../sampleData/user";
import { useCreatePostContext } from "../../context/CreatePostContext";
import ChangeAudience from "../../../shared/ChangeAudience";
import type { Visibility } from "../../../types/base/visibility.types";
import type { PostPrivacy } from "../../../types/post/post.enums";
import SearchUser from "../../../shared/SearchUser";

const CreatePostUser = () => {
  const {
    data: {
      feeling,
      publishing,
      metadata: { location, tagged_users },
    },
    actions: { setPrivacy },
  } = useCreatePostContext();

  return (
    <>
      <Stack
        gap={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <UserAvatar username={user?.username} width={42} />
        <Stack
          gap={1}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: 18,
              display: "inline",
              verticalAlign: "middle",
            }}
          >
            <span style={{ fontWeight: 600 }}>
              {user?.firstName} {user?.lastName}
            </span>
            {(Object.keys(location || {}).length > 0 ||
              tagged_users.length > 0 ||
              feeling?.feeling !== "") && <span>&nbsp;is&nbsp;</span>}
            {feeling?.feeling !== "" && (
              <>
                <span> feeling</span>
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    margin: "0px 5px",
                    alignItems: "center",
                    display: "inline-block",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%", marginBottom: -5 }}
                    alt={feeling?.feeling}
                    src={feeling?.image}
                  />
                </span>
                <span>{feeling?.feeling}</span>
              </>
            )}
            {tagged_users.length > 0 && (
              <>
                <span> with </span>
                {tagged_users.slice(0, 2).map((tag, index) => {
                  return (
                    <span key={tag.id} style={{ fontWeight: 600 }}>
                      {tag?.firstName} {tag.lastName}
                      {index < tagged_users.slice(0, 2).length - 1 ? ", " : ""}
                    </span>
                  );
                })}
                {tagged_users.length > 2 && (
                  <span> and {tagged_users.length - 2} others</span>
                )}
              </>
            )}
            {Object.keys(location || {}).length > 0 && (
              <>
                &nbsp;at&nbsp;
                <span style={{ fontWeight: 600 }}>
                  {location?.name}, {location?.address?.city},{" "}
                  {location?.address?.country}
                </span>
              </>
            )}
          </Typography>

          <ChangeAudience
            sx={{
              p: 0.1,
            }}
            iconFontSize={18}
            fontSize={12}
            visibility={publishing?.privacy as Visibility}
            label
            onVisibilityChange={(value: PostPrivacy) => {
              setPrivacy(value);
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default CreatePostUser;
