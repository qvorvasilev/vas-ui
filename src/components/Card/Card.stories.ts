import type { Meta, StoryObj } from '@storybook/vue3';
import { VButton } from '../Button';
import { VCard } from './index';

const meta = {
  title: 'Components/Card',
  component: VCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
    },
    title: { control: 'text' },
  },
  args: {
    variant: 'elevated',
    title: 'Card title',
  },
} satisfies Meta<typeof VCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { VCard, VButton },
    setup() {
      return { args };
    },
    template: `
      <VCard v-bind="args" style="max-width: 22rem;">
        <template #body>
          A flexible container for grouping related content and actions.
        </template>
        <template #actions>
          <VButton variant="text" color="primary">Cancel</VButton>
          <VButton variant="filled" color="primary">Save</VButton>
        </template>
      </VCard>
    `,
  }),
};

export const WithTitleSlot: Story = {
  args: { title: undefined },
  render: args => ({
    components: { VCard, VButton },
    setup() {
      return { args };
    },
    template: `
      <VCard v-bind="args" style="max-width: 22rem;">
        <template #title>
          <span>Custom <em>title</em> slot</span>
        </template>
        <template #body>
          Use the title slot when you need markup instead of a plain string.
        </template>
        <template #actions>
          <VButton variant="outlined" color="primary">Learn more</VButton>
        </template>
      </VCard>
    `,
  }),
};

export const Outlined: Story = {
  args: { variant: 'outlined', title: 'Outlined card' },
  render: args => ({
    components: { VCard },
    setup() {
      return { args };
    },
    template: `
      <VCard v-bind="args" style="max-width: 22rem;">
        <template #body>
          Border only, no elevation.
        </template>
      </VCard>
    `,
  }),
};

export const Flat: Story = {
  args: { variant: 'flat', title: 'Flat card' },
  render: args => ({
    components: { VCard },
    setup() {
      return { args };
    },
    template: `
      <VCard v-bind="args" style="max-width: 22rem;">
        <template #body>
          Soft surface background, no shadow.
        </template>
      </VCard>
    `,
  }),
};

export const BodyOnly: Story = {
  args: { title: undefined },
  render: args => ({
    components: { VCard },
    setup() {
      return { args };
    },
    template: `
      <VCard v-bind="args" style="max-width: 22rem;">
        <template #body>
          Card with only a body slot.
        </template>
      </VCard>
    `,
  }),
};
