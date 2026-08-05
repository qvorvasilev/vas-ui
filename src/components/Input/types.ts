export type InputVariant = 'outlined' | 'filled' | 'text';
export type InputColor
  = | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';

/** Return `true` when valid, or an error message / `false` when invalid. */
export type InputRule = (value: string) => boolean | string;
export type InputRules = InputRule[];
