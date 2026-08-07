import type { NotificationItem, NotifyOptions } from './types';
import { readonly, ref } from 'vue';

const DEFAULT_DURATION = 3000;

const items = ref<NotificationItem[]>([]);
let seed = 0;

function createId(): string {
  seed += 1;
  return `vas-notification-${seed}`;
}

/**
 * Push a notification onto the shared queue.
 * Mount `<VNotificationHost />` once in your app to render them.
 */
export function notify(options: NotifyOptions): string {
  const id = createId();
  items.value = [
    ...items.value,
    {
      id,
      type: options.type,
      text: options.text,
      duration: options.duration ?? DEFAULT_DURATION,
    },
  ];
  return id;
}

export function dismissNotification(id: string): void {
  items.value = items.value.filter(item => item.id !== id);
}

export function clearNotifications(): void {
  items.value = [];
}

export function useNotificationQueue() {
  return {
    items: readonly(items),
    notify,
    dismiss: dismissNotification,
    clear: clearNotifications,
  };
}

export { DEFAULT_DURATION };
