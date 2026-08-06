<script setup lang="ts">
import type { DialogMaxWidth } from './types';
import { computed, onBeforeUnmount, useSlots, watch } from 'vue';
import './Dialog.scss';

const props = withDefaults(
  defineProps<{
    title?: string;
    persistent?: boolean;
    maxWidth?: DialogMaxWidth;
  }>(),
  {
    title: undefined,
    persistent: false,
    maxWidth: '28rem',
  },
);

const model = defineModel<boolean>({ default: false });
const slots = useSlots();

const showTitle = computed(() => !!slots.title || !!props.title);
const showBody = computed(() => !!slots.body);
const showActions = computed(() => !!slots.actions);
const useStructuredContent = computed(
  () => showTitle.value || showBody.value || showActions.value,
);

const panelStyle = computed(() => ({
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
}));

const activatorProps = {
  onClick: (event?: Event) => {
    event?.preventDefault?.();
    open();
  },
};

function open() {
  model.value = true;
}

function close() {
  model.value = false;
}

function onOverlayClick() {
  if (!props.persistent)
    close();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && model.value && !props.persistent) {
    event.stopPropagation();
    close();
  }
}

function lockScroll(locked: boolean) {
  if (typeof document === 'undefined')
    return;
  document.body.style.overflow = locked ? 'hidden' : '';
}

watch(
  model,
  (openState) => {
    lockScroll(openState);
    if (typeof window === 'undefined')
      return;
    if (openState)
      window.addEventListener('keydown', onKeydown);
    else
      window.removeEventListener('keydown', onKeydown);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  lockScroll(false);
  if (typeof window !== 'undefined')
    window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <slot name="activator" :props="activatorProps" :is-active="model" :open="open" :close="close" />

  <Teleport to="body">
    <Transition name="vas-dialog">
      <div
        v-if="model"
        class="vas-dialog"
        role="presentation"
      >
        <div
          class="vas-dialog__overlay"
          aria-hidden="true"
          @click="onOverlayClick"
        />

        <div
          class="vas-dialog__panel"
          :class="useStructuredContent ? 'vas-dialog__panel--chrome' : 'vas-dialog__panel--raw'"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="showTitle ? 'vas-dialog-title' : undefined"
          :style="panelStyle"
          @click.stop
        >
          <template v-if="useStructuredContent">
            <div
              v-if="showTitle"
              id="vas-dialog-title"
              class="vas-dialog__title"
            >
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <div v-if="showBody" class="vas-dialog__body">
              <slot name="body" :is-active="model" :close="close" />
            </div>

            <div v-if="showActions" class="vas-dialog__actions">
              <slot name="actions" :is-active="model" :close="close" />
            </div>
          </template>

          <slot
            v-else
            :is-active="model"
            :close="close"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
