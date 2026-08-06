<script setup lang="ts">
import type { ColCols } from './types';
import { computed } from 'vue';
import './Grid.scss';

const props = withDefaults(
  defineProps<{
    cols?: ColCols;
    xs?: ColCols;
    sm?: ColCols;
    md?: ColCols;
    lg?: ColCols;
    xl?: ColCols;
    xxl?: ColCols;
  }>(),
  {
    cols: 12,
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
    xl: undefined,
    xxl: undefined,
  },
);

function colClass(prefix: string, value: ColCols | undefined) {
  if (value == null)
    return '';
  return `vas-col--${prefix}-${value}`;
}

const classes = computed(() =>
  [
    'vas-col',
    colClass('cols', props.cols),
    colClass('xs', props.xs),
    colClass('sm', props.sm),
    colClass('md', props.md),
    colClass('lg', props.lg),
    colClass('xl', props.xl),
    colClass('xxl', props.xxl),
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
