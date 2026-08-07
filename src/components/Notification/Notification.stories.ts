import type { Meta, StoryObj } from '@storybook/vue3';
import { onBeforeUnmount } from 'vue';
import { VButton } from '../Button';
import {
  clearNotifications,
  notify,
  VNotification,
  VNotificationHost,
} from './index';

const meta = {
  title: 'Components/Notification',
  component: VNotification,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    text: { control: 'text' },
    duration: { control: 'number' },
  },
  args: {
    type: 'info',
    text: 'Something happened.',
    duration: 3000,
  },
} satisfies Meta<typeof VNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { duration: 0 },
  render: args => ({
    components: { VNotification },
    setup() {
      return { args };
    },
    template: `
      <VNotification v-bind="args" />
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    components: { VNotification },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <VNotification type="success" text="Booking confirmed." :duration="0" />
        <VNotification type="error" text="Payment failed. Try again." :duration="0" />
        <VNotification type="warning" text="Only 2 sunbeds left." :duration="0" />
        <VNotification type="info" text="Season opens on June 1." :duration="0" />
      </div>
    `,
  }),
};

export const Queue: Story = {
  render: () => ({
    components: { VButton, VNotificationHost },
    setup() {
      onBeforeUnmount(() => {
        clearNotifications();
      });

      function pushOne(type: 'success' | 'error' | 'warning' | 'info', text: string) {
        notify({ type, text });
      }

      function pushBurst() {
        notify({ type: 'info', text: 'Queued #1' });
        notify({ type: 'success', text: 'Queued #2 — saved' });
        notify({ type: 'warning', text: 'Queued #3 — check availability' });
        notify({ type: 'error', text: 'Queued #4 — waits until a slot frees' });
        notify({ type: 'info', text: 'Queued #5 — also waiting' });
      }

      return { pushOne, pushBurst };
    },
    template: `
      <div>
        <VNotificationHost />
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
          <VButton variant="filled" color="success" @click="pushOne('success', 'Saved successfully.')">
            Success
          </VButton>
          <VButton variant="filled" color="danger" @click="pushOne('error', 'Something went wrong.')">
            Error
          </VButton>
          <VButton variant="filled" color="warning" @click="pushOne('warning', 'Please review the form.')">
            Warning
          </VButton>
          <VButton variant="filled" color="info" @click="pushOne('info', 'Heads up.')">
            Info
          </VButton>
          <VButton variant="outlined" color="secondary" @click="pushBurst">
            Push 5 (max 3 visible)
          </VButton>
        </div>
        <p style="margin-top: 1rem; color: #0f766e; font-size: 0.875rem;">
          Click a notification to dismiss early. Max 3 visible; extras wait in the queue.
        </p>
      </div>
    `,
  }),
};

export const Sticky: Story = {
  render: () => ({
    components: { VButton, VNotificationHost },
    setup() {
      onBeforeUnmount(() => {
        clearNotifications();
      });

      function pushSticky() {
        notify({
          type: 'error',
          text: 'Connection lost. Click to dismiss.',
          duration: 0,
        });
      }

      return { pushSticky };
    },
    template: `
      <div>
        <VNotificationHost />
        <VButton variant="filled" color="danger" @click="pushSticky">
          Sticky error (duration: 0)
        </VButton>
      </div>
    `,
  }),
};
