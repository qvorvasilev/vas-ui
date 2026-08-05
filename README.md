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
