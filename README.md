# vas-ui

Vue 3 component library built with TypeScript, CSS variables, and SCSS.

## Install

```bash
npm install vas-ui
```

Peer dependency: `vue` `^3.5`.

## Usage

Import components and the library stylesheet once in your app entry:

```ts
import { VButton, VInput } from 'vas-ui';
import { createApp } from 'vue';
import App from './App.vue';
import 'vas-ui/style.css';

createApp(App).component('VButton', VButton).component('VInput', VInput).mount('#app');
```

Or register everything via the plugin:

```ts
import VasUi from 'vas-ui';
import { createApp } from 'vue';
import App from './App.vue';
import 'vas-ui/style.css';

createApp(App).use(VasUi).mount('#app');
```

```vue
<template>
  <VButton variant="outlined" color="primary">
    Save
  </VButton>
  <VInput v-model="email" label="Email" placeholder="you@example.com" />
</template>
```

### Notifications

Mount the host once (e.g. in your root layout), then push toasts from anywhere:

```vue
<!-- App.vue / layout -->
<template>
  <VNotificationHost />
  <!-- app content -->
</template>
```

```ts
import { notify } from 'vas-ui';

notify({ type: 'success', text: 'Saved.' });
notify({ type: 'error', text: 'Something went wrong.', duration: 5000 });
notify({ type: 'warning', text: 'Sticky until click.', duration: 0 });
```

Up to 3 are visible at once; extras wait in the queue. Click (or Enter/Space) dismisses early. Default duration is 3s.

> Always import `vas-ui/style.css`. It ships design tokens (`--vas-*` CSS variables) and component styles under a `vas-` class prefix so they won’t clash with your app.

### Theming

Override tokens on `:root` (or a parent) before or after importing the stylesheet:

```css
:root {
  --vas-color-primary: #2563eb;
  --vas-color-primary-hover: #1d4ed8;
  --vas-radius: 0.375rem;
}
```

## Develop

```bash
npm install
npm run storybook   # playground at http://localhost:6006
npm run build       # emit dist/ (JS + types + style.css)
npm run typecheck
```

## Components

| Component | Description |
|-----------|-------------|
| `VButton` | `variant`: outlined / filled / text · `color`: primary / secondary / danger / success / warning / info / light / dark · `size`: sm / md / lg |
| `VInput`  | `v-model`, `variant`, `color`, `size`, label, floating label, clearable, rules, placeholder, type, disabled |
| `VSwitch` | `v-model`, required `label`, `true-value` / `false-value` (default `true` / `false`), `color`, `size`, disabled |
| `VCheckbox` | `v-model` as `boolean` or `array`, `true-value` (default `true`), `false-value` (default `false`), `label`, `color`, `size`, disabled |
| `VRadio` / `VRadioGroup` | `VRadio` has required `value`; use alone with shared `v-model`, or wrap in `VRadioGroup` (group owns `v-model`, `label`, `direction`, `color`, `size`) |
| `VCard` | slots: `title`, `body`, `actions` · optional `title` prop · `variant`: elevated / outlined / flat |
| `VDialog` | `v-model`, `activator` slot, `title` / `body` / `actions` (or default slot), `persistent`, `max-width` |
| `VTooltip` | `text` or default slot, `activator` slot, `location` (top / bottom / left / right / start / end), `disabled`, delays |
| `VNotification` / `VNotificationHost` | toast messages · mount `VNotificationHost` once · call `notify({ type, text, duration? })` · click to dismiss · max 3 visible (queued) |
| `VRow` / `VCol` | 12-col flex grid · `VCol` `cols` (default 12) + `xs`/`sm`/`md`/`lg`/`xl`/`xxl` · `VRow` `no-gutters`, `dense` |
