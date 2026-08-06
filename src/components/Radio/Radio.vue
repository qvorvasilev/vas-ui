<script setup lang="ts">
import type { RadioColor, RadioSize, RadioValue } from './types';
import { computed, inject, useId } from 'vue';
import { radioGroupKey } from './context';
import './Radio.scss';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: RadioValue;
    label?: string;
    color?: RadioColor;
    size?: RadioSize;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    label: undefined,
    color: undefined,
    size: undefined,
    disabled: false,
    id: undefined,
  },
);

const model = defineModel<RadioValue | undefined>();
const group = inject(radioGroupKey, null);
const autoId = useId();

const resolvedColor = computed(() => props.color ?? group?.color.value ?? 'primary');
const resolvedSize = computed(() => props.size ?? group?.size.value ?? 'md');
const resolvedDisabled = computed(() => props.disabled || (group?.disabled.value ?? false));
const resolvedName = computed(() => group?.name.value);

const radioId = computed(
  () =>
    props.id
    ?? (props.label
      ? `vas-radio-${String(props.value)}-${props.label.replace(/\s+/g, '-').toLowerCase()}`
      : autoId),
);

const isSelected = computed(() => {
  if (group)
    return Object.is(group.model.value, props.value);
  return Object.is(model.value, props.value);
});

const rootClasses = computed(() =>
  [
    'vas-radio',
    `vas-radio--${resolvedColor.value}`,
    `vas-radio--${resolvedSize.value}`,
    isSelected.value ? 'vas-radio--selected' : '',
    resolvedDisabled.value ? 'vas-radio--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

function select() {
  if (resolvedDisabled.value)
    return;

  if (group) {
    group.select(props.value);
    return;
  }

  model.value = props.value;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    select();
  }
}
</script>

<template>
  <div :class="rootClasses">
    <button
      :id="radioId"
      type="button"
      role="radio"
      class="vas-radio__control"
      :aria-checked="isSelected"
      :aria-labelledby="label ? `${radioId}-label` : undefined"
      :aria-label="!label ? String(value) : undefined"
      :disabled="resolvedDisabled"
      :name="resolvedName"
      v-bind="$attrs"
      @click="select"
      @keydown="onKeydown"
    >
      <span class="vas-radio__circle" aria-hidden="true">
        <span class="vas-radio__dot" />
      </span>
    </button>

    <label
      v-if="label"
      :id="`${radioId}-label`"
      :for="radioId"
      class="vas-radio__label"
    >
      {{ label }}
    </label>
  </div>
</template>
