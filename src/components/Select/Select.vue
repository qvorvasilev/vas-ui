<script setup lang="ts">
import type {
  SelectColor,
  SelectItem,
  SelectItems,
  SelectModelValue,
  SelectPrimitive,
  SelectRules,
  SelectSize,
  SelectVariant,
} from './types';
import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';
import './Select.scss';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: SelectVariant;
    color?: SelectColor;
    size?: SelectSize;
    label?: string;
    floating?: boolean;
    clearable?: boolean;
    rules?: SelectRules;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    multiple?: boolean;
    items?: SelectItems;
    itemText?: string;
    itemValue?: string;
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
    id: undefined,
    multiple: false,
    items: () => [],
    itemText: 'text',
    itemValue: 'value',
  },
);

const model = defineModel<SelectModelValue>({ default: null });

const focused = ref(false);
const open = ref(false);
const fieldRef = ref<HTMLElement | null>(null);

const selectId = computed(
  () => props.id ?? (props.label ? `vas-select-${props.label.replace(/\s+/g, '-').toLowerCase()}` : undefined),
);

const listboxId = computed(() => (selectId.value ? `${selectId.value}-listbox` : undefined));

const isFloating = computed(() => props.floating && !!props.label);

function getItemValue(item: SelectItem): SelectPrimitive {
  if (typeof item !== 'object' || item === null)
    return item;
  const value = item[props.itemValue];
  if (value === undefined || value === null)
    return null;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return value;
  return String(value);
}

function getItemText(item: SelectItem): string {
  if (typeof item !== 'object' || item === null)
    return String(item);
  const text = item[props.itemText];
  return text == null ? '' : String(text);
}

function toOptionKey(value: SelectPrimitive): string {
  if (value === null || value === undefined)
    return '';
  return String(value);
}

/** Strings by value; objects by `itemValue`. First occurrence wins. */
const uniqueItems = computed((): SelectItems => {
  const seen = new Set<string>();
  const result: SelectItems = [];

  for (const item of props.items) {
    const key = toOptionKey(getItemValue(item));
    if (seen.has(key))
      continue;
    seen.add(key);
    result.push(item);
  }

  return result;
});

function findItemByValue(value: SelectPrimitive): SelectItem | undefined {
  const key = toOptionKey(value);
  return uniqueItems.value.find(item => toOptionKey(getItemValue(item)) === key);
}

const selectedValues = computed((): SelectPrimitive[] => {
  if (props.multiple)
    return Array.isArray(model.value) ? model.value : [];

  if (Array.isArray(model.value) || model.value === null || model.value === undefined || model.value === '')
    return [];

  return [model.value];
});

const displayText = computed(() => {
  return selectedValues.value
    .map((value) => {
      const item = findItemByValue(value);
      return item != null ? getItemText(item) : String(value ?? '');
    })
    .filter(Boolean)
    .join(', ');
});

const hasValue = computed(() => selectedValues.value.length > 0);

const isLabelRaised = computed(
  () => isFloating.value && (focused.value || open.value || hasValue.value || !!props.placeholder),
);

function isSelected(item: SelectItem): boolean {
  const key = toOptionKey(getItemValue(item));
  return selectedValues.value.some(value => toOptionKey(value) === key);
}

function selectItem(item: SelectItem) {
  if (props.disabled)
    return;

  const value = getItemValue(item);

  if (!props.multiple) {
    model.value = value;
    closeDropdown();
    return;
  }

  const key = toOptionKey(value);
  const next = [...selectedValues.value];
  const index = next.findIndex(selected => toOptionKey(selected) === key);

  if (index >= 0)
    next.splice(index, 1);
  else
    next.push(value);

  model.value = next;
}

function runRules(value: SelectModelValue): string[] {
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

const showClear = computed(() => props.clearable && hasValue.value && !props.disabled);

const rootClasses = computed(() =>
  [
    'vas-select',
    `vas-select--${props.variant}`,
    `vas-select--${props.color}`,
    `vas-select--${props.size}`,
    props.multiple ? 'vas-select--multiple' : '',
    props.clearable ? 'vas-select--clearable' : '',
    open.value ? 'vas-select--open' : '',
    hasError.value ? 'vas-select--error' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const controlClasses = computed(() =>
  ['vas-select__control', isFloating.value ? 'vas-select__control--floating' : ''].filter(Boolean).join(' '),
);

const floatingLabelClasses = computed(() =>
  [
    'vas-select__floating-label',
    isLabelRaised.value ? 'vas-select__floating-label--raised' : '',
    (focused.value || open.value) && !hasError.value ? 'vas-select__floating-label--focused' : '',
  ]
    .filter(Boolean)
    .join(' '),
);

function onDocumentPointerDown(event: MouseEvent) {
  if (!fieldRef.value?.contains(event.target as Node))
    closeDropdown();
}

function openDropdown() {
  if (props.disabled)
    return;
  open.value = true;
  focused.value = true;
}

function closeDropdown() {
  open.value = false;
  focused.value = false;
}

function toggleDropdown() {
  if (props.disabled)
    return;
  if (open.value)
    closeDropdown();
  else
    openDropdown();
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled)
    return;

  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openDropdown();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeDropdown();
  }
}

function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDropdown();
  }
}

watch(open, (isOpen) => {
  if (isOpen)
    document.addEventListener('mousedown', onDocumentPointerDown);
  else
    document.removeEventListener('mousedown', onDocumentPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentPointerDown);
});

function clear() {
  model.value = props.multiple ? [] : null;
  closeDropdown();
}

function validate() {
  return runRules(model.value).length === 0;
}

defineExpose({ validate });
</script>

<template>
  <div :class="rootClasses">
    <label v-if="label && !isFloating" :for="selectId" class="vas-select__label">
      {{ label }}
    </label>

    <div ref="fieldRef" class="vas-select__field">
      <button
        :id="selectId"
        type="button"
        :disabled="disabled"
        :class="controlClasses"
        :aria-invalid="hasError || undefined"
        :aria-describedby="hasError ? `${selectId}-error` : undefined"
        :aria-expanded="open"
        :aria-controls="listboxId"
        aria-haspopup="listbox"
        v-bind="$attrs"
        @click="toggleDropdown"
        @keydown="onTriggerKeydown"
        @focus="focused = true"
      >
        <span
          class="vas-select__value"
          :class="{ 'vas-select__value--placeholder': !hasValue }"
        >
          {{ hasValue ? displayText : placeholder }}
        </span>
      </button>

      <ul
        v-if="open"
        :id="listboxId"
        class="vas-select__menu"
        role="listbox"
        :aria-multiselectable="multiple || undefined"
        @keydown="onMenuKeydown"
      >
        <li
          v-for="(item, index) in uniqueItems"
          :key="`${toOptionKey(getItemValue(item))}-${index}`"
          class="vas-select__option"
          :class="{ 'vas-select__option--selected': isSelected(item) }"
          role="option"
          :aria-selected="isSelected(item)"
          @click="selectItem(item)"
        >
          <div class="vas-select__option-label">
            <input
              v-if="multiple"
              type="checkbox"
              class="vas-select__checkbox"
              :checked="isSelected(item)"
              :disabled="disabled"
              tabindex="-1"
              @click.prevent
            >
            <span class="vas-select__option-text">{{ getItemText(item) }}</span>
          </div>
        </li>
      </ul>

      <label v-if="isFloating" :for="selectId" :class="floatingLabelClasses">
        {{ label }}
      </label>

      <span class="vas-select__caret" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="vas-select__caret-icon"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>

      <button
        v-if="showClear"
        type="button"
        aria-label="Clear selection"
        class="vas-select__clear"
        @mousedown.prevent
        @click="clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="vas-select__clear-icon"
          aria-hidden="true"
        >
          <path
            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
          />
        </svg>
      </button>
    </div>

    <div
      :id="selectId ? `${selectId}-error` : undefined"
      class="vas-select__errors"
      :class="rules.length ? 'vas-select__errors--reserved' : ''"
      role="alert"
      aria-live="polite"
    >
      <p v-for="(message, index) in errorMessages" :key="index">
        {{ message }}
      </p>
    </div>
  </div>
</template>
