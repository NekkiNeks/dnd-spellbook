import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Загружаем переменные окружения из .env и системных переменных
    const env = loadEnv(mode, process.cwd(), '');

    return {
        server: {
            host: '0.0.0.0',
            port: 5173,
            allowedHosts: env.VITE_ALLOWED_HOSTS
                ? env.VITE_ALLOWED_HOSTS.split(',')
                : true, // Если переменная не задана, разрешаем все (удобно для дева)
        },
    };
});
