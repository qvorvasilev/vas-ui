<script setup lang="ts">
import type { SwitchColor, SwitchSize, SwitchValue } from './types';
import { computed } from 'vue';
import './Switch.scss';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label: string;
    color?: SwitchColor;
    size?: SwitchSize;
    disabled?: boolean;
    trueValue?: SwitchValue;
    falseValue?: SwitchValue;
    id?: string;
  }>(),
  {
    color: 'primary',
    size: 'md',
    disabled: false,
    trueValue: true,
    falseValue: false,
    id: undefined,
  },
);

const model = defineModel<SwitchValue>({ default: false });

const switchId = computed(
  () => props.id ?? `vas-switch-${props.label.replace(/\s+/g, '-').toLowerCase()}`,
);

const isOn = computed(() => Object.is(model.value, props.trueValue));

const rootClasses = computed(() =>
  [
    'vas-switch',
    `vas-switch--${props.color}`,
    `vas-switch--${props.size}`,
    isOn.value ? 'vas-switch--on' : '',
    props.disabled ? 'vas-switch--disabled' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

function toggle() {
  if (props.disabled) {
    return;
  }
  model.value = isOn.value ? props.falseValue : props.trueValue;
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
      :id="switchId"
      type="button"
      role="switch"
      class="vas-switch__control"
      :aria-checked="isOn"
      :aria-labelledby="`${switchId}-label`"
      :disabled="disabled"
      v-bind="$attrs"
      @click="toggle"
      @keydown="onKeydown"
    >
      <span class="vas-switch__track" aria-hidden="true">
        <span class="vas-switch__thumb" />
      </span>
    </button>

    <label
      :id="`${switchId}-label`"
      :for="switchId"
      class="vas-switch__label"
    >
      {{ label }}
    </label>
  </div>
</template>
