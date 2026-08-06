import type { Meta, StoryObj } from '@storybook/vue3';
import { VButton } from '../Button';
import { VTooltip } from './index';

const meta = {
  title: 'Components/Tooltip',
  component: VTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    location: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'start', 'end'],
    },
    disabled: { control: 'boolean' },
    openDelay: { control: 'number' },
    closeDelay: { control: 'number' },
  },
  args: {
    text: 'Tooltip text',
    location: 'top',
    disabled: false,
    openDelay: 100,
    closeDelay: 50,
  },
} satisfies Meta<typeof VTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { VTooltip, VButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <VTooltip v-bind="args">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="filled" color="primary">
              Hover me
            </VButton>
          </template>
        </VTooltip>
      </div>
    `,
  }),
};

export const Locations: Story = {
  render: () => ({
    components: { VTooltip, VButton },
    template: `
      <div style="padding: 5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <VTooltip text="Top" location="top">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="outlined">Top</VButton>
          </template>
        </VTooltip>
        <VTooltip text="Bottom" location="bottom">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="outlined">Bottom</VButton>
          </template>
        </VTooltip>
        <VTooltip text="Left" location="left">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="outlined">Left</VButton>
          </template>
        </VTooltip>
        <VTooltip text="Right" location="right">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="outlined">Right</VButton>
          </template>
        </VTooltip>
      </div>
    `,
  }),
};

export const CustomContent: Story = {
  args: { location: 'bottom' },
  render: args => ({
    components: { VTooltip, VButton },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <VTooltip v-bind="args">
          <template #activator="{ props }">
            <VButton v-bind="props" variant="outlined" color="info">Details</VButton>
          </template>
          <span><strong>Tip:</strong> use the default slot for rich content.</span>
        </VTooltip>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, text: 'You should not see this' },
  render: args => ({
    components: { VTooltip, VButton },
    setup() {
      return { args };
    },
    template: `
      <VTooltip v-bind="args">
        <template #activator="{ props }">
          <VButton v-bind="props" variant="outlined" disabled>Disabled tooltip</VButton>
        </template>
      </VTooltip>
    `,
  }),
};
