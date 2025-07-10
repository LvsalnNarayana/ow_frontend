// User notification preferences
export interface EventNotificationPreferences {
  email: {
    enabled: boolean;
    eventInvites: boolean;
    eventUpdates: boolean;
    eventReminders: boolean;
    dailyAgenda: boolean;
    weeklyDigest: boolean;
    eventCancellations: boolean;
    responseUpdates: boolean;
  };
  push: {
    enabled: boolean;
    eventReminders: boolean;
    eventInvites: boolean;
    eventUpdates: boolean;
    upcomingEvents: boolean;
    conflictAlerts: boolean;
  };
  desktop: {
    enabled: boolean;
    eventReminders: boolean;
    eventStarting: boolean;
    conflictAlerts: boolean;
    showPreview: boolean;
  };
  sms: {
    enabled: boolean;
    eventReminders: boolean;
    urgentUpdates: boolean;
    phoneNumber?: string;
  };
}

export const defaultEventNotificationPreferences: EventNotificationPreferences =
  {
    email: {
      enabled: true,
      eventInvites: true,
      eventUpdates: true,
      eventReminders: true,
      dailyAgenda: true,
      weeklyDigest: true,
      eventCancellations: true,
      responseUpdates: true,
    },
    push: {
      enabled: true,
      eventReminders: true,
      eventInvites: true,
      eventUpdates: true,
      upcomingEvents: true,
      conflictAlerts: true,
    },
    desktop: {
      enabled: true,
      eventReminders: true,
      eventStarting: true,
      conflictAlerts: true,
      showPreview: true,
    },
    sms: {
      enabled: true,
      eventReminders: true,
      urgentUpdates: true,
      phoneNumber: "",
    },
  };
