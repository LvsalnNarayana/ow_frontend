// External
import type { JSX } from "react";
import { Outlet } from "react-router";


// Parent, Sibling, Index
import CreatePostProvider from "../../socialMedia/context/CreatePostContext";

const Feed = (): JSX.Element => {
  return (
    <CreatePostProvider>
      <Outlet />
    </CreatePostProvider>
  );
};

export default Feed;
