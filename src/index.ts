import type { App, Plugin } from 'vue';
import { VButton } from './components/Button';
import { VCard } from './components/Card';
import { VCheckbox } from './components/Checkbox';
import { VDialog } from './components/Dialog';
import { VCol, VRow } from './components/Grid';
import { VInput } from './components/Input';
import {
  clearNotifications,
  dismissNotification,
  notify,
  useNotificationQueue,
  VNotification,
  VNotificationHost,
} from './components/Notification';
import { VRadio, VRadioGroup } from './components/Radio';
import { VSelect } from './components/Select';
import { VSwitch } from './components/Switch';
import { VTooltip } from './components/Tooltip';
import './styles.css';

export {
  clearNotifications,
  dismissNotification,
  notify,
  useNotificationQueue,
  VButton,
  VCard,
  VCheckbox,
  VCol,
  VDialog,
  VInput,
  VNotification,
  VNotificationHost,
  VRadio,
  VRadioGroup,
  VRow,
  VSelect,
  VSwitch,
  VTooltip,
};
export type { ButtonColor, ButtonSize, ButtonVariant } from './components/Button/types';
export type { CardVariant } from './components/Card/types';
export type {
  CheckboxColor,
  CheckboxModelValue,
  CheckboxSize,
  CheckboxValue,
} from './components/Checkbox/types';
export type { DialogMaxWidth } from './components/Dialog/types';
export type { ColBreakpointProps, ColCols } from './components/Grid/types';
export type {
  InputColor,
  InputRule,
  InputRules,
  InputSize,
  InputType,
  InputVariant,
} from './components/Input/types';
export type {
  NotificationItem,
  NotificationPosition,
  NotificationType,
  NotifyOptions,
} from './components/Notification/types';
export type {
  RadioColor,
  RadioGroupDirection,
  RadioSize,
  RadioValue,
} from './components/Radio/types';
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
export type { SwitchColor, SwitchSize, SwitchValue } from './components/Switch/types';
export type { TooltipLocation } from './components/Tooltip/types';

const components = {
  VButton,
  VCard,
  VCheckbox,
  VCol,
  VDialog,
  VInput,
  VNotification,
  VNotificationHost,
  VRadio,
  VRadioGroup,
  VRow,
  VSelect,
  VSwitch,
  VTooltip,
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
