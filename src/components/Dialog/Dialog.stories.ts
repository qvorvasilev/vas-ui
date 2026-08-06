import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { VButton } from '../Button';
import { VCard } from '../Card';
import { VDialog } from './index';

const meta = {
  title: 'Components/Dialog',
  component: VDialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    persistent: { control: 'boolean' },
    maxWidth: { control: 'text' },
  },
  args: {
    title: 'Confirm action',
    persistent: false,
    maxWidth: '28rem',
  },
} satisfies Meta<typeof VDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { VDialog, VButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <VDialog v-bind="args" v-model="open">
        <template #activator="{ props }">
          <VButton v-bind="props" variant="filled" color="primary">
            Open dialog
          </VButton>
        </template>
        <template #body>
          This action cannot be undone. Do you want to continue?
        </template>
        <template #actions="{ close }">
          <VButton variant="text" color="secondary" @click="close">Cancel</VButton>
          <VButton variant="filled" color="primary" @click="close">Confirm</VButton>
        </template>
      </VDialog>
    `,
  }),
};

export const Persistent: Story = {
  args: {
    title: 'Persistent dialog',
    persistent: true,
  },
  render: args => ({
    components: { VDialog, VButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <VDialog v-bind="args" v-model="open">
        <template #activator="{ props }">
          <VButton v-bind="props" variant="outlined" color="danger">
            Open persistent
          </VButton>
        </template>
        <template #body>
          Overlay click and Escape will not close this dialog.
        </template>
        <template #actions="{ close }">
          <VButton variant="filled" color="danger" @click="close">Close</VButton>
        </template>
      </VDialog>
    `,
  }),
};

export const CustomContent: Story = {
  args: { title: undefined },
  render: args => ({
    components: { VDialog, VButton, VCard },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <VDialog v-bind="args" v-model="open" max-width="24rem">
        <template #activator="{ props }">
          <VButton v-bind="props" variant="outlined">Custom content</VButton>
        </template>
        <template #default="{ close }">
          <VCard title="Inside a card" variant="flat">
            <template #body>
              Pass a default slot for fully custom dialog content.
            </template>
            <template #actions>
              <VButton variant="filled" color="primary" @click="close">Done</VButton>
            </template>
          </VCard>
        </template>
      </VDialog>
    `,
  }),
};

export const ModelOnly: Story = {
  render: args => ({
    components: { VDialog, VButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <VButton variant="filled" color="primary" @click="open = true">
          Open via v-model
        </VButton>
        <VDialog v-bind="args" v-model="open">
          <template #body>
            No activator slot — controlled only by v-model.
          </template>
          <template #actions="{ close }">
            <VButton variant="text" @click="close">Close</VButton>
          </template>
        </VDialog>
      </div>
    `,
  }),
};
