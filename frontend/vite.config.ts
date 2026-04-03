import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact()],
    server: {
        host: '0.0.0.0', // Позволяет подключаться к контейнеру извне
        port: 5173,      // Стандартный порт Vite
        watch: {
            usePolling: true, // Нужно для корректного отслеживания изменений в Docker на Windows/macOS
        },
    }
})
