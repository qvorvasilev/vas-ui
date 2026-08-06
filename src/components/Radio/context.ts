import type { ComputedRef, InjectionKey, Ref, WritableComputedRef } from 'vue';
import type { RadioColor, RadioSize, RadioValue } from './types';

export interface RadioGroupContext {
  model: WritableComputedRef<RadioValue | undefined> | Ref<RadioValue | undefined>;
  name: ComputedRef<string>;
  color: ComputedRef<RadioColor>;
  size: ComputedRef<RadioSize>;
  disabled: ComputedRef<boolean>;
  select: (value: RadioValue) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('vas-radio-group');
