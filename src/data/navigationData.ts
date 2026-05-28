const navigationData = [
  {
    id: "docs",
    name: "Docs",
    href: "docs",
    icon: "documents.png",
    pageDescription: "Docs page",
    pageTitle: "One World | Docs",
    children: [
      {
        href: "",
        name: "List",
        componentName: "DocList",
      },
      {
        name: "Editor",
        href: "editor/:docId",
        componentName: "DocEditor",
      },
    ],
  },
  {
    id: "flow",
    name: "Flow",
    href: "flow",
    icon: "flow.png",
    pageDescription: "Flow page",
    pageTitle: "One World | Flow",
    children: [
      {
        href: "",
        name: "FlowDashboard",
        componentName: "FlowDashboard",
      },
      {
        name: "FlowDiagram",
        href: "flow/:flowId",
        componentName: "FlowDiagram",
      },
    ],
  },
  {
    id: "calendar",
    name: "Calendar",
    href: "calendar",
    icon: "calendar.png",
    pageDescription: "Calendar page",
    pageTitle: "One World | Calendar",
    children: [
      {
        href: "",
        name: "CalendarDashboard",
        componentName: "CalendarDashboard",
      },
      {
        name: "Day",
        componentName: "Day",
        href: "day/:year/:month/:day",
      },
      {
        name: "Month",
        componentName: "Month",
        href: "month/:year/:month",
      },
      {
        name: "Year",
        href: "year/:year",
        componentName: "Year",
      },
      {
        name: "Week",
        componentName: "Week",
        href: "week/:year/:week",
      },
      {
        name: "Event",
        href: "event/:eventId",
        componentName: "EventPage",
      },
      {
        href: "settings",
        name: "CalendarSettings",
        componentName: "CalendarSettings",
      }
    ],
  },
  {
    id: "feed",
    name: "Feed",
    href: "feed",
    icon: "post.png",
    pageDescription: "Feed page",
    pageTitle: "One World | Feed",
    children: [
      {
        href: "",
        name: "FeedDashboard",
        componentName: "FeedDashboard",
      },
      {
        name: "Post",
        href: "post/:postId",
        componentName: "Post",
      },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    href: "tools",
    icon: "tools.png",
    pageDescription: "Tools page",
    pageTitle: "One World | Tools",
  },
  {
    id: "meet",
    name: "Meet",
    href: "meet",
    icon: "videocall.png",
    pageDescription: "Meet page",
    pageTitle: "One World | Meet",
    children: [
      {
        href: "",
        name: "Dashboard",
        componentName: "MeetDashboard",
      },
      {
        name: "Room",
        href: "room/:roomId",
        componentName: "MeetRoom",
      },
    ],
  },
  {
    id: "friends",
    name: "Friends",
    href: "friends",
    icon: "friends.png",
    pageDescription: "Friends page",
    pageTitle: "One World | Friends",
    children: [
      {
        href: "",
        name: "FriendsDashboard",
        componentName: "FriendsDashboard",
      },
      // {
      //   name: "Friend",
      //   href: "friend/:friendId",
      //   componentName: "Friend",
      // },
    ],
  },
  {
    id: "maps",
    name: "Maps",
    href: "maps",
    icon: "map.png",
    pageDescription: "Maps page",
    pageTitle: "One World | Maps",
    children: [
      {
        href: "",
        name: "MapsDashboard",
        componentName: "MapsDashboard",
      },
      {
        name: "MapTag",
        href: "tags/:tagId",
        componentName: "MapTag",
      },
    ],
  },
  {
    id: "profile",
    name: "Profile",
    href: "profile",
    pageDescription: "Profile page",
    pageTitle: "One World | Profile",
    children: [
      {
        name: "Profile",
        href: "/:profileId",
        componentName: "Profile",
      },
    ],
  },
  {
    id: "chat",
    name: "Chat",
    href: "chat/",
    icon: "message.png",
    pageDescription: "Chat page",
    pageTitle: "One World | Chat",
    children: [
      {
        name: "ChatRoom",
        href: "/:chatId",
        componentName: "ChatRoom",
      },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    href: "settings",
    icon: "settings.png",
    pageDescription: "Settings page",
    pageTitle: "One World | Settings",
  },
];

export default navigationData;
export type NavigationDataType = (typeof navigationData)[number];
