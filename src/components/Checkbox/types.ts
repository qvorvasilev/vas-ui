export type CheckboxColor
  = | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxValue = boolean | string | number;
export type CheckboxModelValue = CheckboxValue | CheckboxValue[];
