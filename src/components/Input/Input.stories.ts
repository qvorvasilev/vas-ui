import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { VInput } from './index'
import type { InputRule } from './types'

const meta = {
  title: 'Components/Input',
  component: VInput,
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
    },
  },
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    label: 'Email',
    floating: true,
    clearable: false,
    placeholder: 'you@example.com',
    disabled: false,
    type: 'email',
  },
} satisfies Meta<typeof VInput>

export default meta
type Story = StoryObj<typeof meta>

export const Outlined: Story = {
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const FloatingLabel: Story = {
  args: { floating: true, placeholder: '' },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const Filled: Story = {
  args: { variant: 'filled' },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const Text: Story = {
  args: { variant: 'text' },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const WithoutLabel: Story = {
  args: { label: undefined, placeholder: 'Search…' },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled' },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('Cannot edit')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const Clearable: Story = {
  args: { clearable: true },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('Clear me')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}

export const WithValidation: Story = {
  args: {
    label: 'Email',
    type: 'email',
    clearable: true,
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      const rules: InputRule[] = [
        (v) => !!v || 'This field is required',
        (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
      ]
      return { args, model, rules }
    },
    template: '<VInput v-bind="args" v-model="model" :rules="rules" />',
  }),
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
  render: (args) => ({
    components: { VInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: '<VInput v-bind="args" v-model="model" />',
  }),
}
