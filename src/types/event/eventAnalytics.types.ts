import { faker } from "@faker-js/faker";

// Event analytics and tracking
export interface EventAnalytics {
  views: number;
  responses: {
    accepted: number;
    declined: number;
    tentative: number;
    pending: number;
  };
}

export const generateEventAnalytics = (): EventAnalytics => {
  return {
    views: faker.number.int({ min: 0, max: 100 }),
    responses: {
      accepted: faker.number.int({ min: 0, max: 20 }),
      declined: faker.number.int({ min: 0, max: 10 }),
      tentative: faker.number.int({ min: 0, max: 5 }),
      pending: faker.number.int({ min: 0, max: 15 }),
    },
  };
};
