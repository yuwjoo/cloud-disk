import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default)
      }
    })
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary))',
      success: 'rgb(var(--color-success))',
      warning: 'rgb(var(--color-warning))',
      danger: 'rgb(var(--color-danger))',
      error: 'rgb(var(--color-error))'
    }
  }
});
