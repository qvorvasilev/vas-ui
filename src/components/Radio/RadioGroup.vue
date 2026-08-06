<script setup lang="ts">
import type { RadioColor, RadioGroupDirection, RadioSize, RadioValue } from './types';
import { computed, provide, useId } from 'vue';
import { radioGroupKey } from './context';
import './RadioGroup.scss';

const props = withDefaults(
  defineProps<{
    label?: string;
    color?: RadioColor;
    size?: RadioSize;
    disabled?: boolean;
    direction?: RadioGroupDirection;
    name?: string;
    id?: string;
  }>(),
  {
    label: undefined,
    color: 'primary',
    size: 'md',
    disabled: false,
    direction: 'column',
    name: undefined,
    id: undefined,
  },
);

const model = defineModel<RadioValue | undefined>({ default: undefined });
const autoId = useId();

const groupId = computed(() => props.id ?? autoId);
const groupName = computed(() => props.name ?? `vas-radio-group-${groupId.value}`);

const rootClasses = computed(() =>
  [
    'vas-radio-group',
    `vas-radio-group--${props.direction}`,
    props.disabled ? 'vas-radio-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

function select(value: RadioValue) {
  if (props.disabled)
    return;
  model.value = value;
}

provide(radioGroupKey, {
  model,
  name: groupName,
  color: computed(() => props.color),
  size: computed(() => props.size),
  disabled: computed(() => props.disabled),
  select,
});
</script>

<template>
  <div
    :id="groupId"
    :class="rootClasses"
    role="radiogroup"
    :aria-labelledby="label ? `${groupId}-label` : undefined"
    :aria-disabled="disabled || undefined"
  >
    <div
      v-if="label"
      :id="`${groupId}-label`"
      class="vas-radio-group__label"
    >
      {{ label }}
    </div>

    <div class="vas-radio-group__items">
      <slot />
    </div>
  </div>
</template>
