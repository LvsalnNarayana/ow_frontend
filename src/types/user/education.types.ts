import { faker } from "@faker-js/faker";
import { generateBaseEntity, type VisibilityMixin } from "../base/base.types";
import { generatePlace, type Place } from "../place/place.types";
import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";

export interface Education extends VisibilityMixin {
  id: string;
  current: boolean;
  school: string;
  degree: string;
  endDate: string;
  startDate: string;
  description: string;
  place: Place;
}

export const generateEducation = (): Education => {
  return {
    ...generateBaseEntity(),
    current: faker.datatype.boolean(),
    school: faker.company.name(),
    degree: faker.person.jobTitle(),
    endDate: faker.date.past().toISOString(),
    startDate: faker.date.past().toISOString(),
    description: faker.lorem.paragraph(),
    place: generatePlace(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      ?.value as Visibility,
  };
};
