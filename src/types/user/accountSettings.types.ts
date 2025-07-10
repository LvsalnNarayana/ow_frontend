import { faker } from "@faker-js/faker";

export interface AccountSettings {
  language: string;
  timezone: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
}

export const generateAccountSettings = (): AccountSettings => {
  return {
    language: faker.location.language().name,
    timezone: faker.location.timeZone(),
    smsNotifications: faker.datatype.boolean(),
    emailNotifications: faker.datatype.boolean(),
    twoFactorEnabled: faker.datatype.boolean(),
  };
};
