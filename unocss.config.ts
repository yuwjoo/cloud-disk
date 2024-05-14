import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import colors from 'tailwindcss/colors';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        custom: FileSystemIconLoader('./src/assets/icons')
      }
    })
  ],
  theme: {
    colors: {
      primary: colors.indigo,
      success: colors.green,
      warning: colors.orange,
      danger: colors.red
    }
  }
});
