export { default as VNotification } from './Notification.vue';
export { default as VNotificationHost } from './NotificationHost.vue';
export {
  clearNotifications,
  DEFAULT_DURATION,
  dismissNotification,
  notify,
  useNotificationQueue,
} from './queue';
export type {
  NotificationItem,
  NotificationPosition,
  NotificationType,
  NotifyOptions,
} from './types';
