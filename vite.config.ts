import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/**/*.vue', 'src/lib/**/*.ts', 'src/components/**/*.ts'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace(/src\//, ''),
        content,
      }),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Standard app build configuration
    outDir: 'dist',
    // Library build configuration
    lib: {
      entry: fileURLToPath(new URL('./src/lib/index.ts', import.meta.url)),
      name: '@indiebold/authkit',
      fileName: (format) => `authkit.${format === 'es' ? 'mjs' : 'umd.js'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  define: {
    // Injecting the missing feature flag to fix the warning
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false',  // Set to 'true' if you want detailed mismatch info
  }
})
