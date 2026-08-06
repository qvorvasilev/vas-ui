import type { Meta, StoryObj } from '@storybook/vue3';
import { VCard } from '../Card';
import { VCol, VRow } from './index';

const meta = {
  title: 'Components/Grid',
  component: VRow,
  tags: ['autodocs'],
  argTypes: {
    noGutters: { control: 'boolean' },
    dense: { control: 'boolean' },
  },
  args: {
    noGutters: false,
    dense: false,
  },
} satisfies Meta<typeof VRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const cellStyle = {
  background: 'color-mix(in srgb, var(--vas-color-primary) 12%, white)',
  border: '1px solid var(--vas-color-border)',
  borderRadius: 'var(--vas-radius)',
  padding: '0.75rem',
  textAlign: 'center' as const,
  fontFamily: 'var(--vas-font-family)',
  fontSize: '0.875rem',
  color: 'var(--vas-color-text)',
};

export const Default: Story = {
  render: args => ({
    components: { VRow, VCol },
    setup() {
      return { args, cellStyle };
    },
    template: `
      <VRow v-bind="args">
        <VCol v-for="n in 12" :key="n" :cols="1">
          <div :style="cellStyle">{{ n }}</div>
        </VCol>
      </VRow>
    `,
  }),
};

export const Responsive: Story = {
  render: args => ({
    components: { VRow, VCol, VCard },
    setup() {
      return { args };
    },
    template: `
      <VRow v-bind="args">
        <VCol cols="12" xs="6" sm="6" md="4" lg="3">
          <VCard title="A" variant="outlined">
            <template #body>cols=12 xs=6 sm=6 md=4 lg=3</template>
          </VCard>
        </VCol>
        <VCol cols="12" xs="6" sm="6" md="4" lg="3">
          <VCard title="B" variant="outlined">
            <template #body>cols=12 xs=6 sm=6 md=4 lg=3</template>
          </VCard>
        </VCol>
        <VCol cols="12" xs="6" sm="6" md="4" lg="3">
          <VCard title="C" variant="outlined">
            <template #body>cols=12 xs=6 sm=6 md=4 lg=3</template>
          </VCard>
        </VCol>
        <VCol cols="12" xs="6" sm="6" md="4" lg="3">
          <VCard title="D" variant="outlined">
            <template #body>cols=12 xs=6 sm=6 md=4 lg=3</template>
          </VCard>
        </VCol>
      </VRow>
    `,
  }),
};

export const Mixed: Story = {
  render: args => ({
    components: { VRow, VCol },
    setup() {
      return { args, cellStyle };
    },
    template: `
      <VRow v-bind="args">
        <VCol cols="12" md="8">
          <div :style="cellStyle">cols=12 md=8</div>
        </VCol>
        <VCol cols="12" md="4">
          <div :style="cellStyle">cols=12 md=4</div>
        </VCol>
        <VCol cols="6">
          <div :style="cellStyle">cols=6</div>
        </VCol>
        <VCol cols="6">
          <div :style="cellStyle">cols=6</div>
        </VCol>
      </VRow>
    `,
  }),
};

export const NoGutters: Story = {
  args: { noGutters: true },
  render: args => ({
    components: { VRow, VCol },
    setup() {
      return { args, cellStyle };
    },
    template: `
      <VRow v-bind="args">
        <VCol cols="4">
          <div :style="{ ...cellStyle, borderRadius: 0 }">4</div>
        </VCol>
        <VCol cols="4">
          <div :style="{ ...cellStyle, borderRadius: 0 }">4</div>
        </VCol>
        <VCol cols="4">
          <div :style="{ ...cellStyle, borderRadius: 0 }">4</div>
        </VCol>
      </VRow>
    `,
  }),
};

export const Auto: Story = {
  render: args => ({
    components: { VRow, VCol },
    setup() {
      return { args, cellStyle };
    },
    template: `
      <VRow v-bind="args">
        <VCol cols="auto">
          <div :style="cellStyle">auto</div>
        </VCol>
        <VCol cols="auto">
          <div :style="cellStyle">auto wider content here</div>
        </VCol>
        <VCol>
          <div :style="cellStyle">default cols=12</div>
        </VCol>
      </VRow>
    `,
  }),
};
