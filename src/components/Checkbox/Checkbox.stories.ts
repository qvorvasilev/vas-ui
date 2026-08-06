import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { VCheckbox } from './index';

const meta = {
  title: 'Components/Checkbox',
  component: VCheckbox,
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
    label: 'Accept terms',
    disabled: false,
  },
} satisfies Meta<typeof VCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Boolean: Story = {
  render: args => ({
    components: { VCheckbox },
    setup() {
      const model = ref(false);
      return { args, model };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <VCheckbox v-bind="args" v-model="model" />
        <code>model: {{ model }}</code>
      </div>
    `,
  }),
};

export const CustomTrueValue: Story = {
  args: {
    label: 'Subscribe',
    trueValue: 'yes',
    falseValue: 'no',
  },
  render: args => ({
    components: { VCheckbox },
    setup() {
      const model = ref('no');
      return { args, model };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <VCheckbox v-bind="args" v-model="model" />
        <code>model: {{ model }}</code>
      </div>
    `,
  }),
};

export const ArrayModel: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const selected = ref<string[]>([]);
      return { selected };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <VCheckbox v-model="selected" label="Email" true-value="email" />
        <VCheckbox v-model="selected" label="SMS" true-value="sms" />
        <VCheckbox v-model="selected" label="Push" true-value="push" />
        <code>selected: {{ selected }}</code>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const sm = ref(true);
      const md = ref(true);
      const lg = ref(true);
      return { sm, md, lg };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VCheckbox v-model="sm" label="Small" size="sm" />
        <VCheckbox v-model="md" label="Medium" size="md" />
        <VCheckbox v-model="lg" label="Large" size="lg" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { VCheckbox },
    setup() {
      const primary = ref(true);
      const danger = ref(true);
      const success = ref(true);
      const warning = ref(true);
      return { primary, danger, success, warning };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <VCheckbox v-model="primary" label="Primary" color="primary" />
        <VCheckbox v-model="danger" label="Danger" color="danger" />
        <VCheckbox v-model="success" label="Success" color="success" />
        <VCheckbox v-model="warning" label="Warning" color="warning" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled' },
  render: args => ({
    components: { VCheckbox },
    setup() {
      const model = ref(true);
      return { args, model };
    },
    template: '<VCheckbox v-bind="args" v-model="model" />',
  }),
};
