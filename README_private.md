# vas-ui

Vue 3 component library built with TypeScript and Tailwind CSS.

## Install

```bash
npm install vas-ui
```

Peer dependency: `vue` `^3.5`.

## Usage

Import components and the library stylesheet once in your app entry:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { VButton, VInput } from 'vas-ui'
import 'vas-ui/style.css'

createApp(App).component('VButton', VButton).component('VInput', VInput).mount('#app')
```

Or register everything via the plugin:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import VasUi from 'vas-ui'
import 'vas-ui/style.css'

createApp(App).use(VasUi).mount('#app')
```

```vue
<template>
  <VButton variant="primary">Save</VButton>
  <VInput v-model="email" label="Email" placeholder="you@example.com" />
</template>
```

> Always import `vas-ui/style.css`. Styles are prebuilt Tailwind CSS with a `vas-` utility prefix so they won’t clash with your app’s Tailwind setup.

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
| `VButton` | `variant`: primary / secondary / ghost · `size`: sm / md / lg |
| `VInput`  | `v-model`, label, placeholder, type, disabled |

## Publish to npm

When you’re ready:

1. `npm run build`
2. Confirm `dist/` contains `vas-ui.js`, `index.d.ts`, and `style.css`
3. Bump `"version"` in `package.json`
4. `npm login` (if needed)
5. `npm publish --access public`

Only `dist/` is published (`files` field).
