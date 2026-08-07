<script setup lang="ts">
import type { NotificationType } from './types';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { DEFAULT_DURATION } from './queue';
import './Notification.scss';

const props = withDefaults(
  defineProps<{
    type: NotificationType;
    text: string;
    /** Auto-dismiss delay in ms. Default `3000`. Pass `0` to keep until click. */
    duration?: number;
  }>(),
  { duration: DEFAULT_DURATION },
);

const emit = defineEmits<{
  dismiss: [];
}>();

const rootClasses = computed(() =>
  ['vas-notification', `vas-notification--${props.type}`].join(' '),
);

const liveRole = computed(() =>
  props.type === 'error' || props.type === 'warning' ? 'alert' : 'status',
);

let timer: ReturnType<typeof setTimeout> | undefined;

function dismiss() {
  clearTimer();
  emit('dismiss');
}

function clearTimer() {
  if (timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    dismiss();
  }
}

onMounted(() => {
  if (props.duration > 0)
    timer = setTimeout(dismiss, props.duration);
});

onBeforeUnmount(clearTimer);
</script>

<template>
  <div
    :class="rootClasses"
    :role="liveRole"
    tabindex="0"
    aria-label="Dismiss notification"
    title="Click to dismiss"
    @click="dismiss"
    @keydown="onKeydown"
  >
    <span class="vas-notification__text">{{ text }}</span>
  </div>
</template>
