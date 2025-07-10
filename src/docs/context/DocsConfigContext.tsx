import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// ----------------------
// Interfaces
// ----------------------
export interface LayoutSettings {
  tableOfContents: boolean;
  pageSetup: boolean;
  comments: boolean;
}

export interface DocumentSettings {
  zoom: number;
  wordCount: boolean;
}

export interface EditorSettings {
  spellingGrammar: boolean;
}

export interface DocSettings {
  layout: LayoutSettings;
  document: DocumentSettings;
  editor: EditorSettings;
}

// Unified key structure for updating
type SettingSection = keyof DocSettings;
type SettingKey = string; // dynamic string indexing

interface UpdateSettingKey {
  section: SettingSection;
  key: SettingKey;
}

// ----------------------
// Initial State
// ----------------------
const initialSettingsState: DocSettings = {
  layout: {
    tableOfContents: false,
    pageSetup: false,
    comments: true,
  },
  document: {
    zoom: 100,
    wordCount: false,
  },
  editor: {
    spellingGrammar: true,
  },
};

// ----------------------
// Context Type
// ----------------------
interface DocConfigContextType {
  settings: DocSettings;
  updateSetting: (
    target: UpdateSettingKey,
    value: boolean | string | number
  ) => void;
}

// ----------------------
// Create Context
// ----------------------
const DocConfigContext = createContext<DocConfigContextType | undefined>(
  undefined
);

// ----------------------
// Provider Component
// ----------------------
export const DocConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<DocSettings>(initialSettingsState);

  const updateSetting = (
    { section, key }: UpdateSettingKey,
    value: boolean | string | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const value = useMemo(
    () => ({
      settings,
      updateSetting,
    }),
    [settings]
  );

  return (
    <DocConfigContext.Provider value={value}>
      {children}
    </DocConfigContext.Provider>
  );
};

// ----------------------
// Hook for Consumers
// ----------------------
export const useDocConfig = (): DocConfigContextType => {
  const context = useContext(DocConfigContext);
  if (!context) {
    throw new Error("useDocConfig must be used within a DocConfigProvider");
  }
  return context;
};
