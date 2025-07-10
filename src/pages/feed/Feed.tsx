import { Outlet } from "react-router";
import CreatePostProvider from "../../socialMedia/context/CreatePostContext";

const Feed = () => {
  return (
    <CreatePostProvider>
      <Outlet />
    </CreatePostProvider>
  );
};

export default Feed;
