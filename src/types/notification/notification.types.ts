import type { NotificationType } from "./notification.constants";

export interface Notification {
  id: string;
  read: boolean;
  type: NotificationType;
  created_at: string;
  content: string;
}
