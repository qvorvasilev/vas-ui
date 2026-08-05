import type { App, Plugin } from 'vue';
import { VButton } from './components/Button';
import { VInput } from './components/Input';
import { VSelect } from './components/Select';
import './styles.css';

export { VButton, VInput, VSelect };
export type { ButtonColor, ButtonSize, ButtonVariant } from './components/Button/types';
export type {
  InputColor,
  InputRule,
  InputRules,
  InputSize,
  InputType,
  InputVariant,
} from './components/Input/types';
export type {
  SelectColor,
  SelectItem,
  SelectItemObject,
  SelectItems,
  SelectModelValue,
  SelectPrimitive,
  SelectRule,
  SelectRules,
  SelectSize,
  SelectVariant,
} from './components/Select/types';

const components = {
  VButton,
  VInput,
  VSelect,
} as const;

export type VasUiComponents = typeof components;

const VasUi: Plugin = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};

export default VasUi;
