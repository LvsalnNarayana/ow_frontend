const January = "JANUARY" as const;
const February = "FEBRUARY" as const;
const March = "MARCH" as const;
const April = "APRIL" as const;
const May = "MAY" as const;
const June = "JUNE" as const;
const July = "JULY" as const;
const August = "AUGUST" as const;
const September = "SEPTEMBER" as const;
const October = "OCTOBER" as const;
const November = "NOVEMBER" as const;
const December = "DECEMBER" as const;

export type Month =
  | typeof January
  | typeof February
  | typeof March
  | typeof April
  | typeof May
  | typeof June
  | typeof July
  | typeof August
  | typeof September
  | typeof October
  | typeof November
  | typeof December;

export const MONTH_OPTIONS: { label: string; value: Month }[] = [
  {
    label: "January",
    value: January,
  },
  {
    label: "February",
    value: February,
  },
  {
    label: "March",
    value: March,
  },
  {
    label: "April",
    value: April,
  },
  {
    label: "May",
    value: May,
  },
  {
    label: "June",
    value: June,
  },
  {
    label: "July",
    value: July,
  },
  {
    label: "August",
    value: August,
  },
  {
    label: "September",
    value: September,
  },
  {
    label: "October",
    value: October,
  },
  {
    label: "November",
    value: November,
  },
  {
    label: "December",
    value: December,
  },
];
