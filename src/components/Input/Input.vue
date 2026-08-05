<script setup lang="ts">
import type {
  InputColor,
  InputRules,
  InputSize,
  InputType,
  InputVariant,
} from './types';
import { computed, ref } from 'vue';
import './Input.scss';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: InputVariant;
    color?: InputColor;
    size?: InputSize;
    label?: string;
    floating?: boolean;
    clearable?: boolean;
    rules?: InputRules;
    placeholder?: string;
    disabled?: boolean;
    type?: InputType;
    id?: string;
  }>(),
  {
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    label: undefined,
    floating: true,
    clearable: false,
    rules: () => [],
    placeholder: '',
    disabled: false,
    type: 'text',
    id: undefined,
  },
);

const model = defineModel<string>({ default: '' });

const focused = ref(false);

const inputId = computed(
  () => props.id ?? (props.label ? `vas-input-${props.label.replace(/\s+/g, '-').toLowerCase()}` : undefined),
);

const isFloating = computed(() => props.floating && !!props.label);
const isLabelRaised = computed(() => isFloating.value && (focused.value || !!model.value));

function runRules(value: string): string[] {
  const messages: string[] = [];
  for (const rule of props.rules) {
    const result = rule(value);
    if (result === true)
      continue;
    messages.push(typeof result === 'string' && result ? result : 'Invalid value');
  }
  return messages;
}

const errorMessages = computed(() => runRules(model.value));
const hasError = computed(() => errorMessages.value.length > 0);

const showClear = computed(() => props.clearable && !!model.value && !props.disabled);

const rootClasses = computed(() =>
  [
    'vas-input',
    `vas-input--${props.variant}`,
    `vas-input--${props.color}`,
    `vas-input--${props.size}`,
    props.clearable ? 'vas-input--clearable' : '',
    hasError.value ? 'vas-input--error' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const controlClasses = computed(() =>
  ['vas-input__control', isFloating.value ? 'vas-input__control--floating' : ''].filter(Boolean).join(' '),
);

const floatingLabelClasses = computed(() =>
  [
    'vas-input__floating-label',
    isLabelRaised.value ? 'vas-input__floating-label--raised' : '',
    focused.value && !hasError.value ? 'vas-input__floating-label--focused' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const resolvedPlaceholder = computed(() => {
  if (isFloating.value && !isLabelRaised.value)
    return ' ';
  return props.placeholder;
});

function clear() {
  model.value = '';
}

function validate() {
  return runRules(model.value).length === 0;
}

defineExpose({ validate });
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label && !isFloating" :for="inputId" class="vas-input__label">
      {{ label }}
    </label>

    <div class="vas-input__field">
      <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="resolvedPlaceholder"
        :disabled="disabled"
        :class="controlClasses"
        :aria-invalid="hasError || undefined"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
        v-bind="$attrs"
        @focus="focused = true"
        @blur="focused = false"
      >
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
        class="vas-input__clear"
        @mousedown.prevent
        @click="clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="vas-input__clear-icon"
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
      class="vas-input__errors"
      :class="rules.length ? 'vas-input__errors--reserved' : ''"
      role="alert"
      aria-live="polite"
    >
      <p v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </p>
    </div>
  </div>
</template>
