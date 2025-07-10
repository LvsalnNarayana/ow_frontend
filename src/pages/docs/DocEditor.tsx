import { useSearchParams } from "react-router";
import EditorLayout from "../../docs/components/EditorLayout";
import type React from "react";
import type { JSX } from "react";

const DocEditor: React.ElementType = (): JSX.Element | null => {
  const [searchParams] = useSearchParams();
  const docId = searchParams?.get("docId");
  if (docId === undefined) {
    console.error("warning");
    return null;
  }
  return <EditorLayout />;
};

export default DocEditor;
