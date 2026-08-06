<script setup lang="ts">
import type { TooltipLocation } from './types';
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import './Tooltip.scss';

const props = withDefaults(
  defineProps<{
    text?: string;
    location?: TooltipLocation;
    disabled?: boolean;
    openDelay?: number;
    closeDelay?: number;
  }>(),
  {
    text: undefined,
    location: 'top',
    disabled: false,
    openDelay: 100,
    closeDelay: 50,
  },
);

const model = defineModel<boolean>({ default: false });

const activatorEl = ref<HTMLElement | null>(null);
const tooltipEl = ref<HTMLElement | null>(null);
const coords = ref({ top: 0, left: 0 });
const tooltipId = useId();

let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

const resolvedLocation = computed(() => {
  if (props.location === 'start')
    return 'left';
  if (props.location === 'end')
    return 'right';
  return props.location;
});

const contentStyle = computed(() => ({
  top: `${coords.value.top}px`,
  left: `${coords.value.left}px`,
}));

const activatorProps = {
  onMouseenter: () => show(),
  onMouseleave: () => hide(),
  onFocus: () => show(),
  onBlur: () => hide(),
};

function clearTimers() {
  if (openTimer)
    clearTimeout(openTimer);
  if (closeTimer)
    clearTimeout(closeTimer);
  openTimer = undefined;
  closeTimer = undefined;
}

function show() {
  if (props.disabled)
    return;
  clearTimers();
  openTimer = setTimeout(async () => {
    model.value = true;
    await nextTick();
    updatePosition();
  }, props.openDelay);
}

function hide() {
  if (props.disabled)
    return;
  clearTimers();
  closeTimer = setTimeout(() => {
    model.value = false;
  }, props.closeDelay);
}

function updatePosition() {
  const activator = activatorEl.value;
  const tip = tooltipEl.value;
  if (!activator || !tip)
    return;

  const rect = activator.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  const gap = 8;
  let top = 0;
  let left = 0;

  switch (resolvedLocation.value) {
    case 'bottom':
      top = rect.bottom + gap;
      left = rect.left + (rect.width - tipRect.width) / 2;
      break;
    case 'left':
      top = rect.top + (rect.height - tipRect.height) / 2;
      left = rect.left - tipRect.width - gap;
      break;
    case 'right':
      top = rect.top + (rect.height - tipRect.height) / 2;
      left = rect.right + gap;
      break;
    case 'top':
    default:
      top = rect.top - tipRect.height - gap;
      left = rect.left + (rect.width - tipRect.width) / 2;
      break;
  }

  const pad = 8;
  left = Math.min(Math.max(pad, left), window.innerWidth - tipRect.width - pad);
  top = Math.min(Math.max(pad, top), window.innerHeight - tipRect.height - pad);

  coords.value = { top, left };
}

function onScrollOrResize() {
  if (model.value)
    updatePosition();
}

watch(model, (open) => {
  if (typeof window === 'undefined')
    return;
  if (open) {
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    nextTick(() => updatePosition());
  }
  else {
    window.removeEventListener('scroll', onScrollOrResize, true);
    window.removeEventListener('resize', onScrollOrResize);
  }
});

onBeforeUnmount(() => {
  clearTimers();
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScrollOrResize, true);
    window.removeEventListener('resize', onScrollOrResize);
  }
});
</script>

<template>
  <span
    ref="activatorEl"
    class="vas-tooltip"
    :aria-describedby="model ? tooltipId : undefined"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot
      name="activator"
      :props="activatorProps"
      :is-active="model"
    />
  </span>

  <Teleport to="body">
    <Transition name="vas-tooltip">
      <div
        v-if="model"
        :id="tooltipId"
        ref="tooltipEl"
        class="vas-tooltip__content"
        :class="`vas-tooltip__content--${resolvedLocation}`"
        role="tooltip"
        :style="contentStyle"
      >
        <slot>
          {{ text }}
        </slot>
      </div>
    </Transition>
  </Teleport>
</template>
