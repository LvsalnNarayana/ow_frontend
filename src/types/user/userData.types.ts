import { faker } from "@faker-js/faker";
import {
  generateBaseEntity,
  type BaseEntity,
  type VerifiableMixin,
  type VisibilityMixin,
} from "../base/base.types";
import { VISIBILITY_OPTIONS, type Visibility } from "../base/visibility.types";

export interface Email extends BaseEntity, VisibilityMixin, VerifiableMixin {
  email: string;
}

export interface Phone extends BaseEntity, VisibilityMixin, VerifiableMixin {
  phone: string;
  countryCode: string;
  country: string;
}

export interface Website extends BaseEntity, VisibilityMixin {
  url: string;
  title?: string;
}

export const generateEmail = (): Email => {
  return {
    ...generateBaseEntity(),
    email: faker.internet.email(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
    verified: faker.datatype.boolean(),
  };
};

export const generatePhone = (): Phone => {
  return {
    ...generateBaseEntity(),
    phone: faker.phone.number(),
    countryCode: faker.location.countryCode(),
    country: faker.location.country(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
    verified: faker.datatype.boolean(),
  };
};
export const generateWebsite = (): Website => {
  return {
    ...generateBaseEntity(),
    url: faker.internet.url(),
    visibility: faker.helpers.arrayElement(VISIBILITY_OPTIONS)
      .value as Visibility,
  };
};