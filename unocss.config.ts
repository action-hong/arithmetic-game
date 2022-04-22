import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-block', 'flex items-center justify-center'],
    ['square-btn', 'flex-block border-1 p-1 relative min-w-20 hover:(color-teal-500 border-teal-500)'],
    ['square-selected-btn', 'color-teal-500 border-teal-500'],
    ['cell', 'rounded bg-gray-600 color-white w-8 h-8 m-1 flex justify-center items-center'],
    ['cell-btn', 'cell cursor-pointer hover:opacity-50'],
    ['btn', 'px-4 py-1 rounded inline-block bg-green-600 text-white cursor-pointer hover:bg-green-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-green-600'],
    {
      'bg-base': 'bg-white dark:bg-[#121212]',
      'bg-overlay': 'bg-[#eee]:50 dark:bg-[#222]:50',
      'bg-header': 'bg-gray-500:5',
      'bg-active': 'bg-gray-500:8',
      'bg-hover': 'bg-gray-500:20',
      'border-base': 'border-gray-400:10',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    breakpoints: {
      mm: '420px',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
