import { generatePlace, type Place } from "../place/place.types";
import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";
import { faker } from "@faker-js/faker";

export interface Work {
  id: string;
  current: boolean;
  company: string;
  visibility: Visibility;
  position: string;
  endDate: string;
  startDate: string;
  description: string;
  place: Place;
}

export const generateWork = (): Work => {
  return {
    id: faker.string.uuid(),
    current: faker.datatype.boolean(),
    company: faker.company.name(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      ?.value as Visibility,
    position: faker.person.jobTitle(),
    endDate: faker.date.past().toISOString(),
    startDate: faker.date.past().toISOString(),
    description: faker.lorem.paragraph(),
    place: generatePlace(),
  };
};
