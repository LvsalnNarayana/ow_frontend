import { generateMockUser } from "./MockUserData.script";

// Generate a user with specific properties
const customUser = generateMockUser({
  firstName: "John",
  lastName: "Doe",
  username: "johndoe123",
  isVerified: true,
  isActive: true,
  // Override any other properties as needed
});

console.log("Custom User:", customUser);

// Generate a user with specific email
export const userWithCustomEmail = generateMockUser({
  email: [
    {
      id: "custom-email-id",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email: "john.doe@company.com",
      visibility: "public",
      verified: true,
      primary: false,
    },
  ],
});

console.log("User with Custom Email:", userWithCustomEmail);
