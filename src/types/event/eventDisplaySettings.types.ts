// Calendar-specific event display settings

export interface EventDisplaySettings {
  showTime: boolean;
  showLocation: boolean;
  showAttendees: boolean;
  compactView: boolean;
  colorScheme: "category" | "priority" | "status" | "custom";
}

export const generateEventDisplaySettings = (): EventDisplaySettings => {
  return {
    showTime: true,
    showLocation: true,
    showAttendees: true,
    compactView: false,
    colorScheme: "category",
  };
};
