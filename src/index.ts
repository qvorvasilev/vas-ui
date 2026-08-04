import type { App, Plugin } from 'vue'
import { VButton } from './components/Button'
import { VInput } from './components/Input'
import './styles.css'

export { VButton, VInput }
export type { ButtonVariant, ButtonSize, ButtonColor } from './components/Button/types'
export type {
  InputVariant,
  InputColor,
  InputSize,
  InputType,
  InputRule,
  InputRules,
} from './components/Input/types'

const components = {
  VButton,
  VInput,
} as const

export type VasUiComponents = typeof components

const VasUi: Plugin = {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}

export default VasUi
