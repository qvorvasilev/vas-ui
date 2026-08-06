import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { VRadio, VRadioGroup } from './index';

const meta = {
  title: 'Components/Radio',
  component: VRadioGroup,
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
    direction: {
      control: 'select',
      options: ['column', 'row'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    color: 'primary',
    size: 'md',
    direction: 'column',
    label: 'Preferred contact',
    disabled: false,
  },
} satisfies Meta<typeof VRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: args => ({
    components: { VRadio, VRadioGroup },
    setup() {
      const selected = ref('email');
      return { args, selected };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <VRadioGroup v-bind="args" v-model="selected">
          <VRadio value="email" label="Email" />
          <VRadio value="sms" label="SMS" />
          <VRadio value="push" label="Push" />
        </VRadioGroup>
        <code>selected: {{ selected }}</code>
      </div>
    `,
  }),
};

export const Row: Story = {
  args: { direction: 'row', label: 'Size' },
  render: args => ({
    components: { VRadio, VRadioGroup },
    setup() {
      const selected = ref('md');
      return { args, selected };
    },
    template: `
      <VRadioGroup v-bind="args" v-model="selected">
        <VRadio value="sm" label="Small" />
        <VRadio value="md" label="Medium" />
        <VRadio value="lg" label="Large" />
      </VRadioGroup>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { VRadio, VRadioGroup },
    setup() {
      const selected = ref('primary');
      return { selected };
    },
    template: `
      <VRadioGroup v-model="selected" label="Color">
        <VRadio value="primary" label="Primary" color="primary" />
        <VRadio value="danger" label="Danger" color="danger" />
        <VRadio value="success" label="Success" color="success" />
        <VRadio value="warning" label="Warning" color="warning" />
      </VRadioGroup>
    `,
  }),
};

export const Standalone: Story = {
  render: () => ({
    components: { VRadio },
    setup() {
      const selected = ref<string | number>('one');
      return { selected };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <VRadio v-model="selected" value="one" label="Option One" />
        <VRadio v-model="selected" value="two" label="Option Two" />
        <VRadio v-model="selected" :value="3" label="Option Three (number)" />
        <code>selected: {{ selected }}</code>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled group' },
  render: args => ({
    components: { VRadio, VRadioGroup },
    setup() {
      const selected = ref('a');
      return { args, selected };
    },
    template: `
      <VRadioGroup v-bind="args" v-model="selected">
        <VRadio value="a" label="Option A" />
        <VRadio value="b" label="Option B" />
      </VRadioGroup>
    `,
  }),
};
