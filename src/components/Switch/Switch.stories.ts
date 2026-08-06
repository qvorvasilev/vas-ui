import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { VSwitch } from './index';

const meta = {
  title: 'Components/Switch',
  component: VSwitch,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    trueValue: { control: 'text' },
    falseValue: { control: 'text' },
  },
  args: {
    color: 'primary',
    size: 'md',
    label: 'Enable notifications',
    disabled: false,
  },
} satisfies Meta<typeof VSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => ({
    components: { VSwitch },
    setup() {
      const model = ref(false);
      return { args, model };
    },
    template: '<VSwitch v-bind="args" v-model="model" />',
  }),
};

export const On: Story = {
  render: args => ({
    components: { VSwitch },
    setup() {
      const model = ref(true);
      return { args, model };
    },
    template: '<VSwitch v-bind="args" v-model="model" />',
  }),
};

export const CustomValues: Story = {
  args: {
    label: 'Status',
    trueValue: 'active',
    falseValue: 'inactive',
  },
  render: args => ({
    components: { VSwitch },
    setup() {
      const model = ref('inactive');
      return { args, model };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <VSwitch v-bind="args" v-model="model" />
        <code>model: {{ model }}</code>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { VSwitch },
    setup() {
      const sm = ref(true);
      const md = ref(true);
      const lg = ref(true);
      return { sm, md, lg };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VSwitch v-model="sm" label="Small" size="sm" />
        <VSwitch v-model="md" label="Medium" size="md" />
        <VSwitch v-model="lg" label="Large" size="lg" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { VSwitch },
    setup() {
      const primary = ref(true);
      const danger = ref(true);
      const success = ref(true);
      const warning = ref(true);
      return { primary, danger, success, warning };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VSwitch v-model="primary" label="Primary" color="primary" />
        <VSwitch v-model="danger" label="Danger" color="danger" />
        <VSwitch v-model="success" label="Success" color="success" />
        <VSwitch v-model="warning" label="Warning" color="warning" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
  render: args => ({
    components: { VSwitch },
    setup() {
      const model = ref(true);
      return { args, model };
    },
    template: '<VSwitch v-bind="args" v-model="model" />',
  }),
};
