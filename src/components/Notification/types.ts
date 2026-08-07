export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type NotificationPosition
  = | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';

export interface NotifyOptions {
  type: NotificationType;
  text: string;
  /** Auto-dismiss delay in ms. Default `3000`. Pass `0` to keep until click. */
  duration?: number;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  text: string;
  duration: number;
}
