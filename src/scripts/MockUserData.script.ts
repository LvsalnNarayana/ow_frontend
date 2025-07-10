import type {
  User,
  Email,
  Phone,
  Friend,
  FriendRequest,
  UserReference,
  Website,
  PostSubscription,
  Event,
  PrivacySettings,
} from "../types/user/user.types";
import type { AccountSettings } from "../types/user/accountSettings.types";
import type { UserInfo } from "../types/user/userInfo.types";
import type { Education } from "../types/user/education.types";
import type { Group } from "../types/group/group.types";
import type { Notification } from "../types/notification/notification.types";
import type { Place, Coordinates, Address } from "../types/place/place.types";
import type { Work } from "../types/user/work.types";

// Helper function to generate random IDs
const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Helper function to generate random dates
const generateRandomDate = (daysBack: number = 365): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
};

// Helper function to generate random usernames
const generateUsername = (): string => {
  const adjectives = [
    "cool",
    "smart",
    "funny",
    "awesome",
    "creative",
    "bright",
    "amazing",
    "stellar",
    "dynamic",
    "vibrant",
  ];
  const nouns = [
    "user",
    "coder",
    "dev",
    "ninja",
    "guru",
    "master",
    "pro",
    "ace",
    "star",
    "hero",
  ];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${randomNum}`;
};

// Helper function to generate random names
const generateFirstName = (): string => {
  const names = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Emily",
    "Chris",
    "Lisa",
    "Alex",
    "Maria",
    "James",
    "Anna",
    "Robert",
    "Emma",
    "Michael",
    "Olivia",
    "William",
    "Sophia",
    "Daniel",
    "Isabella",
    "Matthew",
    "Mia",
    "Andrew",
    "Charlotte",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const generateLastName = (): string => {
  const names = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate mock coordinates
const generateMockCoordinates = (): Coordinates => ({
  latitude: (Math.random() - 0.5) * 180,
  longitude: (Math.random() - 0.5) * 360,
  accuracy: Math.floor(Math.random() * 100) + 1,
});

// Generate mock address
const generateMockAddress = (): Address => {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ];
  const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA"];
  const countries = ["United States", "Canada", "United Kingdom", "Australia"];
  const countryCodes = ["US", "CA", "GB", "AU"];

  const cityIndex = Math.floor(Math.random() * cities.length);
  const countryIndex = Math.floor(Math.random() * countries.length);

  return {
    street: `${Math.floor(Math.random() * 9999) + 1} ${
      ["Main", "Oak", "Pine", "Maple", "Cedar"][Math.floor(Math.random() * 5)]
    } St`,
    city: cities[cityIndex],
    state: states[cityIndex],
    country: countries[countryIndex],
    postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
    countryCode: countryCodes[countryIndex],
  };
};

// Generate mock place
const generateMockPlace = (): Place => {
  const placeNames = [
    "Central Park",
    "Downtown Office",
    "University Campus",
    "Shopping Mall",
    "Coffee Shop",
    "Gym",
    "Library",
  ];
  const name = placeNames[Math.floor(Math.random() * placeNames.length)];
  const address = generateMockAddress();

  return {
    id: generateId(),
    name,
    placeTag: `${name.toLowerCase().replace(/\s+/g, "-")}-${address.city
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
    address,
    coordinates: generateMockCoordinates(),
    timezone: "America/New_York",
    createdAt: generateRandomDate(),
    updatedAt: generateRandomDate(),
    isActive: Math.random() > 0.1,
  };
};

// Mock data generators for nested interfaces
const generateMockEmail = (): Email => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  email: `${generateUsername()}@example.com`,
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  verified: Math.random() > 0.5,
  primary: Math.random() > 0.5,
});

const generateMockPhone = (): Phone => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  countryCode: "+1",
  country: "US",
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  verified: Math.random() > 0.5,
  primary: Math.random() > 0.5,
});

const generateMockUserReference = (): UserReference => ({
  id: generateId(),
  username: generateUsername(),
  firstName: generateFirstName(),
  lastName: generateLastName(),
});

const generateMockFriend = (): Friend => ({
  ...generateMockUserReference(),
  mutualFriendsCount: Math.floor(Math.random() * 50),
  friendsSince: generateRandomDate(1000),
});

const generateMockFriendRequest = (): FriendRequest => ({
  ...generateMockUserReference(),
  mutualFriendsCount: Math.floor(Math.random() * 20),
  requestedAt: generateRandomDate(30),
  status: ["requested", "accepted", "declined", "blocked", "request_sent"][
    Math.floor(Math.random() * 5)
  ] as any,
});

const generateMockWebsite = (): Website => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  url: `https://www.${generateUsername()}.com`,
  title: `${generateFirstName()}'s Portfolio`,
  visibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockPostSubscription = (): PostSubscription => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  postId: generateId(),
});

const generateMockEvent = (): Event => ({
  id: generateId(),
  createdAt: generateRandomDate(),
  updatedAt: generateRandomDate(),
  name: `Event ${Math.floor(Math.random() * 100)}`,
  date: generateRandomDate(-30), // Future date
  status: ["going", "interested", "not_going"][
    Math.floor(Math.random() * 3)
  ] as any,
  type: ["virtual", "in_person"][Math.floor(Math.random() * 2)] as any,
  location: Math.random() > 0.5 ? "New York, NY" : undefined,
});

const generateMockPrivacySettings = (): PrivacySettings => ({
  profileVisibility: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  messagePrivacy: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
  timelinePostPrivacy: ["public", "friends", "only_me"][
    Math.floor(Math.random() * 3)
  ] as any,
});

const generateMockAccountSettings = (): AccountSettings => ({
  language: "en",
  timezone: "America/New_York",
  smsNotifications: Math.random() > 0.5,
  emailNotifications: Math.random() > 0.5,
  twoFactorEnabled: Math.random() > 0.5,
});

// Generate mock notification with proper structure
const generateMockNotification = (): Notification => {
  const notificationTypes = [
    "like",
    "comment",
    "friend_request",
    "message",
    "mention",
    "post_share",
  ];
  const contents = [
    "liked your post",
    "commented on your photo",
    "sent you a friend request",
    "sent you a message",
    "mentioned you in a post",
    "shared your post",
  ];

  return {
    id: generateId(),
    read: Math.random() > 0.6,
    type: notificationTypes[
      Math.floor(Math.random() * notificationTypes.length)
    ] as any,
    created_at: generateRandomDate(30),
    content: contents[Math.floor(Math.random() * contents.length)],
  };
};

// Generate mock work with proper structure
const generateMockWork = (): Work => {
  const companies = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Meta",
    "Netflix",
    "Tesla",
    "Spotify",
    "Uber",
    "Airbnb",
  ];
  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
  ];
  const isCurrent = Math.random() > 0.7;
  const startDate = generateRandomDate(2000);

  return {
    id: generateId(),
    current: isCurrent,
    company: companies[Math.floor(Math.random() * companies.length)],
    visibility: ["public", "friends", "only_me"][
      Math.floor(Math.random() * 3)
    ] as any,
    position: positions[Math.floor(Math.random() * positions.length)],
    startDate,
    endDate: isCurrent ? "" : generateRandomDate(100),
    description: `Working as a ${
      positions[Math.floor(Math.random() * positions.length)]
    } with focus on innovative solutions and team collaboration.`,
    place: generateMockPlace(),
  };
};

// Generate mock education with proper structure
const generateMockEducation = (): Education => {
  const schools = [
    "Harvard University",
    "MIT",
    "Stanford University",
    "UC Berkeley",
    "Yale University",
    "Princeton University",
  ];
  const degrees = [
    "Bachelor of Science",
    "Master of Science",
    "Bachelor of Arts",
    "Master of Arts",
    "PhD",
    "Associate Degree",
  ];
  const cities = [
    "Cambridge, MA",
    "Palo Alto, CA",
    "Berkeley, CA",
    "New Haven, CT",
    "Princeton, NJ",
    "Boston, MA",
  ];
  const isCurrent = Math.random() > 0.8;
  const startDate = generateRandomDate(3000);

  return {
    id: generateId(),
    current: isCurrent,
    city: cities[Math.floor(Math.random() * cities.length)],
    school: schools[Math.floor(Math.random() * schools.length)],
    visibility: ["public", "friends", "only_me"][
      Math.floor(Math.random() * 3)
    ] as any,
    degree: degrees[Math.floor(Math.random() * degrees.length)],
    startDate,
    endDate: isCurrent ? "" : generateRandomDate(500),
    description: `Studied ${
      degrees[Math.floor(Math.random() * degrees.length)]
    } with focus on computer science and technology.`,
    place: generateMockPlace(),
  };
};

// Generate mock group with proper structure
const generateMockGroup = (): Group => {
  const groupNames = [
    "Tech Enthusiasts",
    "Photography Club",
    "Book Lovers",
    "Fitness Community",
    "Travel Buddies",
    "Cooking Masters",
    "Gaming Squad",
    "Music Lovers",
  ];
  const roles = ["Member", "Admin", "Moderator"];
  const privacyOptions = ["private", "public"];
  const activityStatuses = ["active", "inactive"];
  const descriptions = [
    "A community for tech enthusiasts to share knowledge and experiences",
    "Photography lovers sharing tips and showcasing their work",
    "Book club for avid readers and literary discussions",
    "Fitness community supporting healthy lifestyle choices",
    "Travel enthusiasts sharing adventures and tips",
    "Cooking enthusiasts sharing recipes and techniques",
  ];

  const maxMembers = Math.floor(Math.random() * 10000) + 100;
  const currentMembers = Math.floor(Math.random() * maxMembers);

  return {
    id: generateId(),
    role: roles[Math.floor(Math.random() * roles.length)] as any,
    members_count: currentMembers,
    privacy: privacyOptions[
      Math.floor(Math.random() * privacyOptions.length)
    ] as any,
    max_members_count: maxMembers,
    joined_at: generateRandomDate(365),
    name: groupNames[Math.floor(Math.random() * groupNames.length)],
    activity_status: activityStatuses[
      Math.floor(Math.random() * activityStatuses.length)
    ] as any,
    icon: `https://via.placeholder.com/64x64?text=${groupNames[
      Math.floor(Math.random() * groupNames.length)
    ].charAt(0)}`,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
  };
};

// Mock generators for UserInfo (basic implementation - adjust based on actual interface)
const generateMockUserInfo = (): UserInfo =>
  ({
    gender: "female",
    birthdate: {
      visibility: "public",
      date: generateRandomDate(18),
    },
    bio: "This is a mock bio.",
    relationship: {
      status: "Single",
      visibility: "public",
    },
    languages: {
      values: ["English", "Spanish"],
      visibility: "public",
    },
    interests: {
      values: ["Travel", "Photography"],
      visibility: "public",
    },
    hobbies: {
      values: ["Reading", "Painting"],
      visibility: "public",
    },
  } as UserInfo);

/**
 * Generates mock data for a User interface
 * @param overrides - Optional partial User object to override default values
 * @returns Complete User object with mock data
 */
export const generateMockUser = (overrides?: Partial<User>): User => {
  const firstName = generateFirstName();
  const lastName = generateLastName();
  const username = generateUsername();

  const mockUser: User = {
    id: generateId(),
    createdAt: generateRandomDate(),
    updatedAt: generateRandomDate(),
    username,
    firstName,
    lastName,
    email: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      generateMockEmail
    ),
    phone: Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      generateMockPhone
    ),
    info: generateMockUserInfo(),
    friends: Array.from(
      { length: Math.floor(Math.random() * 20) + 5 },
      generateMockFriend
    ),
    friendRequests: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateMockFriendRequest
    ),
    blockedUsers: Array.from(
      { length: Math.floor(Math.random() * 3) },
      generateMockUserReference
    ),
    posts: Array.from({ length: Math.floor(Math.random() * 50) + 10 }, () =>
      generateId()
    ),
    websites: Array.from(
      { length: Math.floor(Math.random() * 3) },
      generateMockWebsite
    ),
    postSubscriptions: Array.from(
      { length: Math.floor(Math.random() * 10) },
      generateMockPostSubscription
    ),
    events: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateMockEvent
    ),
    workHistory: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      generateMockWork
    ),
    education: Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      generateMockEducation
    ),
    places: Array.from(
      { length: Math.floor(Math.random() * 5) },
      generateMockPlace
    ),
    groups: Array.from(
      { length: Math.floor(Math.random() * 8) },
      generateMockGroup
    ),
    notifications: Array.from(
      { length: Math.floor(Math.random() * 15) + 5 },
      generateMockNotification
    ),
    privacySettings: generateMockPrivacySettings(),
    accountSettings: generateMockAccountSettings(),
    isActive: Math.random() > 0.1,
    isVerified: Math.random() > 0.3,
    isDeleted: Math.random() > 0.9,
    isBanned: Math.random() > 0.95,
    sessions: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      generateId()
    ),
    lastActive: generateRandomDate(7),
  };

  return { ...mockUser, ...overrides };
};

/**
 * Generates an array of mock users
 * @param count - Number of users to generate
 * @returns Array of User objects with mock data
 */
export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => generateMockUser());
};

/**
 * Generates a mock user with specific characteristics
 * @param type - Type of user to generate ('active', 'new', 'inactive', 'verified')
 * @returns User object with mock data matching the specified type
 */
export const generateMockUserByType = (
  type: "active" | "new" | "inactive" | "verified"
): User => {
  const baseUser = generateMockUser();

  switch (type) {
    case "active":
      return generateMockUser({
        ...baseUser,
        isActive: true,
        lastActive: generateRandomDate(1),
        friends: Array.from(
          { length: Math.floor(Math.random() * 50) + 20 },
          generateMockFriend
        ),
        posts: Array.from(
          { length: Math.floor(Math.random() * 100) + 50 },
          () => generateId()
        ),
        notifications: Array.from(
          { length: Math.floor(Math.random() * 25) + 10 },
          generateMockNotification
        ),
      });

    case "new":
      return generateMockUser({
        ...baseUser,
        createdAt: generateRandomDate(7),
        friends: Array.from(
          { length: Math.floor(Math.random() * 5) },
          generateMockFriend
        ),
        posts: Array.from({ length: Math.floor(Math.random() * 5) }, () =>
          generateId()
        ),
        isVerified: false,
        notifications: Array.from(
          { length: Math.floor(Math.random() * 5) + 1 },
          generateMockNotification
        ),
        workHistory: [],
        education: Array.from(
          { length: Math.floor(Math.random() * 1) + 1 },
          generateMockEducation
        ),
      });

    case "inactive":
      return generateMockUser({
        ...baseUser,
        isActive: false,
        lastActive: generateRandomDate(90),
        notifications: Array.from(
          { length: Math.floor(Math.random() * 30) + 20 },
          () => ({ ...generateMockNotification(), read: false })
        ),
      });

    case "verified":
      return generateMockUser({
        ...baseUser,
        isVerified: true,
        email: [
          {
            ...generateMockEmail(),
            verified: true,
            primary: false,
          },
        ],
        phone: [
          {
            ...generateMockPhone(),
            verified: true,
            primary: false,
          },
        ],
        accountSettings: {
          ...generateMockAccountSettings(),
          twoFactorEnabled: true,
        },
      });

    default:
      return baseUser;
  }
};

/**
 * Generates a mock user with custom profile data
 * @param profileType - Type of profile ('student', 'professional', 'entrepreneur', 'freelancer')
 * @returns User object with mock data matching the specified profile type
 */
export const generateMockUserByProfile = (
  profileType: "student" | "professional" | "entrepreneur" | "freelancer"
): User => {
  const baseUser = generateMockUser();

  switch (profileType) {
    case "student":
      return generateMockUser({
        ...baseUser,
        education: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({ ...generateMockEducation(), current: true })
        ),
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 2) },
          () => ({
            ...generateMockWork(),
            position: ["Intern", "Part-time Assistant", "Research Assistant"][
              Math.floor(Math.random() * 3)
            ],
          })
        ),
        groups: Array.from(
          { length: Math.floor(Math.random() * 5) + 3 },
          () => ({
            ...generateMockGroup(),
            name: [
              "Study Group",
              "University Club",
              "Academic Society",
              "Student Union",
            ][Math.floor(Math.random() * 4)],
          })
        ),
      });

    case "professional":
      return generateMockUser({
        ...baseUser,
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 4) + 2 },
          generateMockWork
        ),
        education: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          generateMockEducation
        ),
        isVerified: true,
        websites: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({
            ...generateMockWebsite(),
            title: "Professional Portfolio",
          })
        ),
      });

    case "entrepreneur":
      return generateMockUser({
        ...baseUser,
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => ({
            ...generateMockWork(),
            position: ["Founder", "CEO", "Co-founder", "Business Owner"][
              Math.floor(Math.random() * 4)
            ],
            company: [
              "Startup Inc",
              "Innovation Labs",
              "Tech Ventures",
              "Digital Solutions",
            ][Math.floor(Math.random() * 4)],
          })
        ),
        websites: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          generateMockWebsite
        ),
        groups: Array.from(
          { length: Math.floor(Math.random() * 6) + 2 },
          () => ({
            ...generateMockGroup(),
            name: [
              "Entrepreneurs Network",
              "Business Leaders",
              "Startup Community",
            ][Math.floor(Math.random() * 3)],
            role: ["Admin", "Moderator"][Math.floor(Math.random() * 2)] as any,
          })
        ),
      });

    case "freelancer":
      return generateMockUser({
        ...baseUser,
        workHistory: Array.from(
          { length: Math.floor(Math.random() * 5) + 2 },
          () => ({
            ...generateMockWork(),
            position: [
              "Freelance Designer",
              "Independent Consultant",
              "Contract Developer",
              "Freelance Writer",
            ][Math.floor(Math.random() * 4)],
            current: Math.random() > 0.3,
          })
        ),
        websites: Array.from(
          { length: Math.floor(Math.random() * 2) + 1 },
          () => ({
            ...generateMockWebsite(),
            title: "Portfolio & Services",
          })
        ),
      });

    default:
      return baseUser;
  }
};

// Export individual generators for reuse
export {
  generateMockEmail,
  generateMockPhone,
  generateMockUserReference,
  generateMockFriend,
  generateMockFriendRequest,
  generateMockWebsite,
  generateMockEvent,
  generateMockPrivacySettings,
  generateMockAccountSettings,
  generateMockNotification,
  generateMockWork,
  generateMockEducation,
  generateMockGroup,
  generateMockPlace,
  generateMockUserInfo,
  generateId,
  generateRandomDate,
  generateUsername,
  generateFirstName,
  generateLastName,
};
