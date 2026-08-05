<script setup lang="ts">
import type {
  ButtonColor,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from './types';
import { computed } from 'vue';
import './Button.scss';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    type?: ButtonType;
  }>(),
  {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  },
);

const classes = computed(() =>
  ['vas-btn', `vas-btn--${props.variant}`, `vas-btn--${props.color}`, `vas-btn--${props.size}`].join(
    ' ',
  ),
);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
