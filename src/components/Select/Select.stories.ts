import type { Meta, StoryObj } from '@storybook/vue3';
import type { SelectRule } from './types';
import { ref } from 'vue';
import { VSelect } from './index';

const objectItems = [
  { text: 'Apple', value: 'apple' },
  { text: 'Banana', value: 'banana' },
  { text: 'Cherry', value: 'cherry' },
  { text: 'Date', value: 'date' },
];

const customKeyItems = [
  { label: 'Admin', id: 1 },
  { label: 'Editor', id: 2 },
  { label: 'Viewer', id: 3 },
];

const meta = {
  title: 'Components/Select',
  component: VSelect,
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
    label: { control: 'text' },
    floating: { control: 'boolean' },
    clearable: { control: 'boolean' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    itemText: { control: 'text' },
    itemValue: { control: 'text' },
  },
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    label: 'Fruit',
    floating: true,
    clearable: false,
    placeholder: '',
    disabled: false,
    multiple: false,
    // items: stringItems,
    items: objectItems,
    itemText: 'text',
    itemValue: 'value',
  },
} satisfies Meta<typeof VSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const ObjectItems: Story = {
  args: {
    items: objectItems,
    label: 'Fruit',
  },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const CustomItemKeys: Story = {
  args: {
    items: customKeyItems,
    itemText: 'label',
    itemValue: 'id',
    label: 'Role',
  },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<number | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    items: objectItems,
    label: 'Fruits',
    clearable: true,
  },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string[]>(['apple', 'banana', 'cherry']);
      return { args, model };
    },
    template: '<div style="max-width: 220px"><VSelect v-bind="args" v-model="model" /></div>',
  }),
};

export const FloatingLabel: Story = {
  args: { floating: true, placeholder: '' },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const Filled: Story = {
  args: { variant: 'filled' },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const Text: Story = {
  args: { variant: 'text' },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const WithoutLabel: Story = {
  args: { label: undefined, placeholder: 'Choose…' },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref('Banana');
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const Clearable: Story = {
  args: { clearable: true },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref('Apple');
      return { args, model };
    },
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
};

export const WithValidation: Story = {
  args: {
    label: 'Fruit',
    clearable: true,
    items: objectItems,
  },
  render: args => ({
    components: { VSelect },
    setup() {
      const model = ref<string | null>(null);
      const rules: SelectRule[] = [v => !!v || 'Please select a fruit'];
      return { args, model, rules };
    },
    template: '<VSelect v-bind="args" v-model="model" :rules="rules" />',
  }),
};
