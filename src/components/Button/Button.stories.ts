import type { Meta, StoryObj } from '@storybook/vue3';
import { VButton } from './index';

const meta = {
  title: 'Components/Button',
  component: VButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof VButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Outlined</VButton>',
  }),
};

export const Filled: Story = {
  args: { variant: 'filled' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Filled</VButton>',
  }),
};

export const Text: Story = {
  args: { variant: 'text' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Text</VButton>',
  }),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Small</VButton>',
  }),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Large</VButton>',
  }),
};

export const Primary: Story = {
  args: { color: 'primary' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Primary</VButton>',
  }),
};

export const Secondary: Story = {
  args: { color: 'secondary' },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Secondary</VButton>',
  }),
};
export const Disabled: Story = {
  args: { disabled: true },
  render: args => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Disabled</VButton>',
  }),
};
