<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonColor, ButtonSize, ButtonVariant, ButtonType } from './types'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    color?: ButtonColor
    size?: ButtonSize
    disabled?: boolean
    type?: ButtonType
  }>(),
  {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    disabled: false,
    type: 'button',
  },
)

const baseClasses =
  'vas:inline-flex vas:items-center vas:justify-center vas:font-medium vas:rounded-vas vas:transition-colors vas:focus-visible:outline-none vas:focus-visible:ring-2 vas:focus-visible:ring-primary vas:focus-visible:ring-offset-2 vas:disabled:opacity-50 vas:disabled:pointer-events-none'

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'vas:h-8 vas:px-3 vas:text-sm',
  md: 'vas:h-10 vas:px-4 vas:text-sm',
  lg: 'vas:h-12 vas:px-6 vas:text-base',
}

const outlinedColorClasses: Record<ButtonColor, string> = {
  primary:
    'vas:bg-white vas:text-primary vas:border vas:border-primary vas:hover:bg-primary vas:hover:text-white',
  secondary:
    'vas:bg-white vas:text-secondary vas:border vas:border-secondary vas:hover:bg-secondary vas:hover:text-white',
  danger:
    'vas:bg-white vas:text-danger vas:border vas:border-danger vas:hover:bg-danger vas:hover:text-white',
  success:
    'vas:bg-white vas:text-success vas:border vas:border-success vas:hover:bg-success vas:hover:text-white',
  warning:
    'vas:bg-white vas:text-warning vas:border vas:border-warning vas:hover:bg-warning vas:hover:text-white',
  info: 'vas:bg-white vas:text-info vas:border vas:border-info vas:hover:bg-info vas:hover:text-white',
  light:
    'vas:bg-white vas:text-light vas:border vas:border-light vas:hover:bg-light vas:hover:text-white',
  dark: 'vas:bg-white vas:text-dark vas:border vas:border-dark vas:hover:bg-dark vas:hover:text-white',
}

const filledColorClasses: Record<ButtonColor, string> = {
  primary: 'vas:bg-primary vas:text-white vas:border vas:border-transparent vas:hover:bg-primary-hover',
  secondary:
    'vas:bg-surface vas:text-text vas:border vas:border-border vas:hover:bg-muted/40',
  danger: 'vas:bg-danger vas:text-white vas:border vas:border-transparent vas:hover:bg-danger-hover',
  success:
    'vas:bg-success vas:text-white vas:border vas:border-transparent vas:hover:bg-success-hover',
  warning:
    'vas:bg-warning vas:text-white vas:border vas:border-transparent vas:hover:bg-warning-hover',
  info: 'vas:bg-info vas:text-white vas:border vas:border-transparent vas:hover:bg-info-hover',
  light: 'vas:bg-light vas:text-text vas:border vas:border-transparent vas:hover:bg-light-hover',
  dark: 'vas:bg-dark vas:text-white vas:border vas:border-transparent vas:hover:bg-dark-hover',
}

const textColorClasses: Record<ButtonColor, string> = {
  primary: 'vas:bg-transparent vas:text-primary vas:hover:bg-primary/10',
  secondary: 'vas:bg-transparent vas:text-secondary vas:hover:bg-secondary/10',
  danger: 'vas:bg-transparent vas:text-danger vas:hover:bg-danger/10',
  success: 'vas:bg-transparent vas:text-success vas:hover:bg-success/10',
  warning: 'vas:bg-transparent vas:text-warning vas:hover:bg-warning/10',
  info: 'vas:bg-transparent vas:text-info vas:hover:bg-info/10',
  light: 'vas:bg-transparent vas:text-light vas:hover:bg-light/10',
  dark: 'vas:bg-transparent vas:text-dark vas:hover:bg-dark/10',
}

const variantColorClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  outlined: outlinedColorClasses,
  filled: filledColorClasses,
  text: textColorClasses,
}

const classes = computed(() =>
  [baseClasses, variantColorClasses[props.variant][props.color], sizeClasses[props.size]].join(' '),
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="classes" v-bind="$attrs">
    <slot />
  </button>
</template>
