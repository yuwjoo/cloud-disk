import { defineConfig, presetUno, presetIcons, presetAttributify, presetTagify } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
// import colors from 'tailwindcss/colors';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        custom: FileSystemIconLoader('./src/assets/icons')
      }
    }),
    presetTagify({
      prefix: 'un-',
      extraProperties: { display: 'block' }
    })
  ],
  theme: {
    colors: {
      light: {
        primary: 'var(--light-primary-color, #4f46e5)',
        success: 'var(--light-success-color, #16a34a)',
        warning: 'var(--light-warning-color, #ea580c)',
        danger: 'var(--light-danger-color, #dc2626)',
        text: 'var(--light-text-color, #111827)'
      },
      dark: {
        primary: 'var(--dark-primary-color, #111827)',
        success: 'var(--dark-success-color, #16a34a)',
        warning: 'var(--dark-warning-color, #ea580c)',
        danger: 'var(--dark-danger-color, #dc2626)',
        text: 'var(--dark-text-color, #f3f4f6)'
      }
    }
  }
});
// colors.indigo;
// colors.green;
// colors.orange;
// colors.red;
// colors.gray;
