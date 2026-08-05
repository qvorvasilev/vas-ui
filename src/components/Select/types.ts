export type SelectVariant = 'outlined' | 'filled' | 'text';
export type SelectColor
  = | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectItemObject = Record<string, unknown>;
export type SelectItem = string | SelectItemObject;
export type SelectItems = SelectItem[];

export type SelectPrimitive = string | number | boolean | null;
export type SelectModelValue = SelectPrimitive | SelectPrimitive[];

/** Return `true` when valid, or an error message / `false` when invalid. */
export type SelectRule = (value: SelectModelValue) => boolean | string;
export type SelectRules = SelectRule[];
