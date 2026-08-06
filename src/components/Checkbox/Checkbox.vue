<script setup lang="ts">
import type {
  CheckboxColor,
  CheckboxModelValue,
  CheckboxSize,
  CheckboxValue,
} from './types';
import { computed, useId } from 'vue';
import './Checkbox.scss';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    color?: CheckboxColor;
    size?: CheckboxSize;
    disabled?: boolean;
    trueValue?: CheckboxValue;
    falseValue?: CheckboxValue;
    id?: string;
  }>(),
  {
    label: undefined,
    color: 'primary',
    size: 'md',
    disabled: false,
    trueValue: true,
    falseValue: false,
    id: undefined,
  },
);

const model = defineModel<CheckboxModelValue>({ default: false });
const autoId = useId();

const checkboxId = computed(
  () =>
    props.id
    ?? (props.label
      ? `vas-checkbox-${props.label.replace(/\s+/g, '-').toLowerCase()}`
      : autoId),
);

const isArrayModel = computed(() => Array.isArray(model.value));

const isChecked = computed(() => {
  if (isArrayModel.value) {
    return (model.value as CheckboxValue[]).some(value => Object.is(value, props.trueValue));
  }
  return Object.is(model.value, props.trueValue);
});

const rootClasses = computed(() =>
  [
    'vas-checkbox',
    `vas-checkbox--${props.color}`,
    `vas-checkbox--${props.size}`,
    isChecked.value ? 'vas-checkbox--checked' : '',
    props.disabled ? 'vas-checkbox--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

function toggle() {
  if (props.disabled)
    return;

  if (isArrayModel.value) {
    const next = [...(model.value as CheckboxValue[])];
    const index = next.findIndex(value => Object.is(value, props.trueValue));
    if (index >= 0)
      next.splice(index, 1);
    else
      next.push(props.trueValue);
    model.value = next;
    return;
  }

  model.value = isChecked.value ? props.falseValue : props.trueValue;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggle();
  }
}
</script>

<template>
  <div :class="rootClasses">
    <button
      :id="checkboxId"
      type="button"
      role="checkbox"
      class="vas-checkbox__control"
      :aria-checked="isChecked"
      :aria-labelledby="label ? `${checkboxId}-label` : undefined"
      :aria-label="!label ? 'Checkbox' : undefined"
      :disabled="disabled"
      v-bind="$attrs"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="vas-checkbox__box" aria-hidden="true">
        <svg
          class="vas-checkbox__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="vas-checkbox__check"
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <label
      v-if="label"
      :id="`${checkboxId}-label`"
      :for="checkboxId"
      class="vas-checkbox__label"
    >
      {{ label }}
    </label>
  </div>
</template>
