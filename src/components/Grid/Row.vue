<script setup lang="ts">
import { computed } from 'vue';
import './Grid.scss';

const props = withDefaults(
  defineProps<{
    noGutters?: boolean;
    dense?: boolean;
  }>(),
  {
    noGutters: false,
    dense: false,
  },
);

const classes = computed(() =>
  [
    'vas-row',
    props.noGutters ? 'vas-row--no-gutters' : '',
    props.dense ? 'vas-row--dense' : '',
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
