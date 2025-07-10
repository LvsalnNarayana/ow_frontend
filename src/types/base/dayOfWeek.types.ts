export const Sunday = "SUNDAY" as const;
export const Monday = "MONDAY" as const;
const Tuesday = "TUESDAY" as const;
const Wednesday = "WEDNESDAY" as const;
const Thursday = "THURSDAY" as const;
const Friday = "FRIDAY" as const;
const Saturday = "SATURDAY" as const;

export type DayOfWeek =
  | typeof Sunday
  | typeof Monday
  | typeof Tuesday
  | typeof Wednesday
  | typeof Thursday
  | typeof Friday
  | typeof Saturday;

export const DAY_OF_WEEK_OPTIONS: { label: string; value: DayOfWeek }[] = [
  {
    label: "Sunday",
    value: Sunday,
  },
  {
    label: "Monday",
    value: Monday,
  },
  {
    label: "Tuesday",
    value: Tuesday,
  },
  {
    label: "Wednesday",
    value: Wednesday,
  },
  {
    label: "Thursday",
    value: Thursday,
  },
  {
    label: "Friday",
    value: Friday,
  },
  {
    label: "Saturday",
    value: Saturday,
  },
];
