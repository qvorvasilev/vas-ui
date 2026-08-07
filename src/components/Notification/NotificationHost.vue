<script setup lang="ts">
import type { NotificationPosition } from './types';
import { computed } from 'vue';
import Notification from './Notification.vue';
import { dismissNotification, useNotificationQueue } from './queue';
import './Notification.scss';

const props = withDefaults(
  defineProps<{
    /** Max notifications shown at once. Extra items wait in the queue. */
    maxVisible?: number;
    position?: NotificationPosition;
  }>(),
  {
    maxVisible: 3,
    position: 'top-right',
  },
);

const { items } = useNotificationQueue();

const visibleItems = computed(() => items.value.slice(0, props.maxVisible));

const hostClasses = computed(() =>
  ['vas-notification-host', `vas-notification-host--${props.position}`].join(' '),
);
</script>

<template>
  <Teleport to="body">
    <div :class="hostClasses" aria-live="polite" aria-relevant="additions text">
      <TransitionGroup name="vas-notification">
        <Notification
          v-for="item in visibleItems"
          :key="item.id"
          :type="item.type"
          :text="item.text"
          :duration="item.duration"
          @dismiss="dismissNotification(item.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
