const navigationData = [
  {
    name: "Docs",
    id: "docs",
    href: "docs",
    icon: "documents.png",
    pageTitle: "One World | Docs",
    pageDescription: "Docs page",
    children: [
      {
        name: "List",
        href: "",
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
    name: "Flow",
    id: "flow",
    href: "flow",
    icon: "flow.png",
    pageTitle: "One World | Flow",
    pageDescription: "Flow page",
    children: [
      {
        name: "FlowDashboard",
        href: "",
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
    name: "Calendar",
    id: "calendar",
    href: "calendar",
    icon: "calendar.png",
    pageTitle: "One World | Calendar",
    pageDescription: "Calendar page",
    children: [
      {
        name: "CalendarDashboard",
        href: "",
        componentName: "CalendarDashboard",
      },
      {
        name: "Day",
        href: "day/:year/:month/:day",
        componentName: "Day",
      },
      {
        name: "Month",
        href: "month/:year/:month",
        componentName: "Month",
      },
      {
        name: "Year",
        href: "year/:year",
        componentName: "Year",
      },
      {
        name: "Week",
        href: "week/:year/:week",
        componentName: "Week",
      },
      {
        name: "Event",
        href: "event/:eventId",
        componentName: "EventPage",
      },
      {
        name: "CalendarSettings",
        href: "settings",
        componentName: "CalendarSettings",
      }
    ],
  },
  {
    name: "Feed",
    id: "feed",
    href: "feed",
    icon: "post.png",
    pageTitle: "One World | Feed",
    pageDescription: "Feed page",
    children: [
      {
        name: "FeedDashboard",
        href: "",
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
    name: "Tools",
    id: "tools",
    href: "tools",
    icon: "tools.png",
    pageTitle: "One World | Tools",
    pageDescription: "Tools page",
  },
  {
    name: "Meet",
    id: "meet",
    href: "meet",
    icon: "videocall.png",
    pageTitle: "One World | Meet",
    pageDescription: "Meet page",
    children: [
      {
        name: "Dashboard",
        href: "",
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
    name: "Friends",
    id: "friends",
    href: "friends",
    icon: "friends.png",
    pageTitle: "One World | Friends",
    pageDescription: "Friends page",
    children: [
      {
        name: "FriendsDashboard",
        href: "",
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
    name: "Maps",
    id: "maps",
    href: "maps",
    icon: "map.png",
    pageTitle: "One World | Maps",
    pageDescription: "Maps page",
    children: [
      {
        name: "MapsDashboard",
        href: "",
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
    name: "Profile",
    id: "profile",
    href: "profile",
    pageTitle: "One World | Profile",
    pageDescription: "Profile page",
    children: [
      {
        name: "Profile",
        href: "/:profileId",
        componentName: "Profile",
      },
    ],
  },
  {
    name: "Chat",
    id: "chat",
    href: "chat/",
    icon: "message.png",
    pageTitle: "One World | Chat",
    pageDescription: "Chat page",
    children: [
      {
        name: "ChatRoom",
        href: "/:chatId",
        componentName: "ChatRoom",
      },
    ],
  },
  {
    name: "Settings",
    id: "settings",
    href: "settings",
    icon: "settings.png",
    pageTitle: "One World | Settings",
    pageDescription: "Settings page",
  },
];

export default navigationData;
export type NavigationDataType = (typeof navigationData)[number];
