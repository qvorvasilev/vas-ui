<script setup lang="ts">
import type { CardVariant } from './types';
import { computed, useSlots } from 'vue';
import './Card.scss';

const props = withDefaults(
  defineProps<{
    title?: string;
    variant?: CardVariant;
  }>(),
  {
    title: undefined,
    variant: 'elevated',
  },
);

const slots = useSlots();

const showTitle = computed(() => !!slots.title || !!props.title);
const showBody = computed(() => !!slots.body);
const showActions = computed(() => !!slots.actions);

const rootClasses = computed(() =>
  ['vas-card', `vas-card--${props.variant}`].join(' '),
);
</script>

<template>
  <div :class="rootClasses">
    <div v-if="showTitle" class="vas-card__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div v-if="showBody" class="vas-card__body">
      <slot name="body" />
    </div>

    <div v-if="showActions" class="vas-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>
