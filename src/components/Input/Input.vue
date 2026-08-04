<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputColor, InputRules, InputSize, InputType, InputVariant } from './types'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })

const props = withDefaults(
  defineProps<{
    variant?: InputVariant
    color?: InputColor
    size?: InputSize
    label?: string
    floating?: boolean
    clearable?: boolean
    rules?: InputRules
    placeholder?: string
    disabled?: boolean
    type?: InputType
    id?: string
  }>(),
  {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    label: undefined,
    floating: true,
    clearable: false,
    rules: () => [(input) => input && input.length > 0 || 'Input is required'],
    placeholder: '',
    disabled: false,
    type: 'text',
    id: undefined,
  },
)

const focused = ref(false)

const inputId = computed(
  () => props.id ?? (props.label ? `vas-input-${props.label.replace(/\s+/g, '-').toLowerCase()}` : undefined),
)

const isFloating = computed(() => props.floating && !!props.label)
const isLabelRaised = computed(() => isFloating.value && (focused.value || !!model.value))

function runRules(value: string): string[] {
  const messages: string[] = []
  for (const rule of props.rules) {
    const result = rule(value)
    if (result === true) continue
    messages.push(typeof result === 'string' && result ? result : 'Invalid value')
  }
  return messages
}

const errorMessages = computed(() => runRules(model.value))
const hasError = computed(() => errorMessages.value.length > 0)

const baseClasses = 'vas:w-full vas:rounded-vas vas:text-text vas:transition-colors vas:focus-visible:outline-none vas:focus-visible:ring-2 vas:focus-visible:ring-offset-2 vas:disabled:cursor-not-allowed vas:disabled:opacity-50 vas:placeholder:text-text-muted/60'

const sizeClasses: Record<InputSize, string> = {
  sm: 'vas:h-8 vas:px-3 vas:text-sm',
  md: 'vas:h-10 vas:px-3 vas:text-sm',
  lg: 'vas:h-12 vas:px-3 vas:text-base',
}

const floatingSizeClasses: Record<InputSize, string> = {
  sm: 'vas:h-10 vas:px-3 vas:pt-4 vas:pb-1 vas:text-sm',
  md: 'vas:h-12 vas:px-3 vas:pt-5 vas:pb-1.5 vas:text-sm',
  lg: 'vas:h-14 vas:px-3 vas:pt-6 vas:pb-2 vas:text-base',
}

const outlinedColorClasses: Record<InputColor, string> = {
  primary:
    'vas:bg-white vas:border vas:border-primary vas:focus-visible:ring-primary vas:focus-visible:border-primary',
  secondary:
    'vas:bg-white vas:border vas:border-secondary vas:focus-visible:ring-secondary vas:focus-visible:border-secondary',
  danger:
    'vas:bg-white vas:border vas:border-danger vas:focus-visible:ring-danger vas:focus-visible:border-danger',
  success:
    'vas:bg-white vas:border vas:border-success vas:focus-visible:ring-success vas:focus-visible:border-success',
  warning:
    'vas:bg-white vas:border vas:border-warning vas:focus-visible:ring-warning vas:focus-visible:border-warning',
  info: 'vas:bg-white vas:border vas:border-info vas:focus-visible:ring-info vas:focus-visible:border-info',
  light:
    'vas:bg-white vas:border vas:border-light vas:focus-visible:ring-light vas:focus-visible:border-light',
  dark: 'vas:bg-white vas:border vas:border-dark vas:focus-visible:ring-dark vas:focus-visible:border-dark',
}

const filledColorClasses: Record<InputColor, string> = {
  primary:
    'vas:bg-primary/10 vas:border vas:border-transparent vas:focus-visible:ring-primary vas:focus-visible:border-primary',
  secondary:
    'vas:bg-secondary/10 vas:border vas:border-transparent vas:focus-visible:ring-secondary vas:focus-visible:border-secondary',
  danger:
    'vas:bg-danger/10 vas:border vas:border-transparent vas:focus-visible:ring-danger vas:focus-visible:border-danger',
  success:
    'vas:bg-success/10 vas:border vas:border-transparent vas:focus-visible:ring-success vas:focus-visible:border-success',
  warning:
    'vas:bg-warning/10 vas:border vas:border-transparent vas:focus-visible:ring-warning vas:focus-visible:border-warning',
  info: 'vas:bg-info/10 vas:border vas:border-transparent vas:focus-visible:ring-info vas:focus-visible:border-info',
  light:
    'vas:bg-light/10 vas:border vas:border-transparent vas:focus-visible:ring-light vas:focus-visible:border-light',
  dark: 'vas:bg-dark/10 vas:border vas:border-transparent vas:focus-visible:ring-dark vas:focus-visible:border-dark',
}

const textColorClasses: Record<InputColor, string> = {
  primary:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-primary vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-primary',
  secondary:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-secondary vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-secondary',
  danger:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-danger vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-danger',
  success:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-success vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-success',
  warning:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-warning vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-warning',
  info: 'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-info vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-info',
  light:
    'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-light vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-light',
  dark: 'vas:bg-transparent vas:rounded-none vas:border-0 vas:border-b vas:border-dark vas:px-0 vas:focus-visible:ring-0 vas:focus-visible:ring-offset-0 vas:focus-visible:border-dark',
}

const variantColorClasses: Record<InputVariant, Record<InputColor, string>> = {
  outlined: outlinedColorClasses,
  filled: filledColorClasses,
  text: textColorClasses,
}

const floatingLabelColorClasses: Record<InputColor, string> = {
  primary: 'vas:text-primary',
  secondary: 'vas:text-secondary',
  danger: 'vas:text-danger',
  success: 'vas:text-success',
  warning: 'vas:text-warning',
  info: 'vas:text-info',
  light: 'vas:text-light',
  dark: 'vas:text-dark',
}

const showClear = computed(() => props.clearable && !!model.value && !props.disabled)

const clearPaddingClasses: Record<InputSize, string> = {
  sm: 'vas:pr-8',
  md: 'vas:pr-9',
  lg: 'vas:pr-10',
}

const errorBorderClasses =
  'vas:border-red-500 vas:focus-visible:ring-red-500 vas:focus-visible:border-red-500'

const inputClasses = computed(() =>
  [
    baseClasses,
    hasError.value ? errorBorderClasses : variantColorClasses[props.variant][props.color],
    isFloating.value ? floatingSizeClasses[props.size] : sizeClasses[props.size],
    props.clearable ? clearPaddingClasses[props.size] : '',
  ].join(' '),
)

const floatingLabelClasses = computed(() => {
  const raised = isLabelRaised.value
  const colorClass = hasError.value
    ? 'vas:text-red-500'
    : focused.value
      ? floatingLabelColorClasses[props.color]
      : 'vas:text-text-muted'

  const raisedTop = props.size === 'sm' ? 'vas:top-0.5' : props.size === 'lg' ? 'vas:top-1' : 'vas:top-1'

  return [
    'vas:pointer-events-none vas:absolute vas:origin-left vas:transition-all vas:duration-150',
    props.variant === 'text' ? 'vas:left-0' : 'vas:left-3',
    raised
      ? `${raisedTop} vas:translate-y-0 vas:scale-75`
      : 'vas:top-1/2 vas:-translate-y-1/2 vas:scale-100',
    colorClass,
    props.size === 'lg' ? 'vas:text-base' : 'vas:text-sm',
  ].join(' ')
})

const resolvedPlaceholder = computed(() => {
  if (isFloating.value && !isLabelRaised.value) return ' '
  return props.placeholder
})

function clear() {
  model.value = ''
}

function validate() {
  return runRules(model.value).length === 0
}

defineExpose({
  validate,
})
</script>

<template>
  <div class="vas:flex vas:flex-col vas:gap-1.5">
    <label
      v-if="label && !isFloating"
      :for="inputId"
      class="vas:text-sm vas:font-medium vas:text-text"
    >
      {{ label }}
    </label>

    <div class="vas:relative">
      <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="resolvedPlaceholder"
        :disabled="disabled"
        :class="inputClasses"
        :aria-invalid="hasError || undefined"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
        v-bind="$attrs"
        @focus="focused = true"
        @blur="focused = false"
      />
      <label
        v-if="isFloating"
        :for="inputId"
        :class="floatingLabelClasses"
      >
        {{ label }}
      </label>
      <button
        v-if="showClear"
        type="button"
        aria-label="Clear input"
        class="vas:absolute vas:right-2 vas:top-1/2 vas:-translate-y-1/2 vas:inline-flex vas:items-center vas:justify-center vas:rounded-vas vas:p-0.5 vas:text-gray-400 vas:transition-colors vas:hover:text-gray-500 vas:focus-visible:outline-none vas:focus-visible:ring-2 vas:focus-visible:ring-primary vas:cursor-pointer"
        @mousedown.prevent
        @click="clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="vas:h-4 vas:w-4"
          aria-hidden="true"
        >
          <path
            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
          />
        </svg>
      </button>
    </div>

    <div
      :id="inputId ? `${inputId}-error` : undefined"
      class="vas:text-xs vas:text-red-500"
      :class="rules.length ? 'vas:min-h-5' : ''"
      role="alert"
      aria-live="polite"
    >
      <p v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </p>
    </div>
  </div>
</template>
