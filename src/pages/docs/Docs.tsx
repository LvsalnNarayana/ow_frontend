import type React from "react";
import type { JSX } from "react";
import { Outlet } from "react-router";
import { DocConfigProvider } from "../../docs/context/DocsConfigContext";

const Docs: React.ElementType = (): JSX.Element => {
  return (
    <DocConfigProvider>
      <Outlet />
    </DocConfigProvider>
  );
};

export default Docs;
