import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { glob } from 'glob'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('./**/*.html', { ignore: ['./node_modules/**', './dist/**'] })
          .map(file => [
            path.relative('.', file).replace(/\.html$/, ''),
            path.resolve(file)
          ])
      )
    }
  }
})