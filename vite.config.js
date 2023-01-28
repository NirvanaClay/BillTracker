import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.jsx']),
        react(),
    ],
    build: {
        target: 'exnext'
    }
    // plugins: [
    //     laravel([
    //         'resources/js/app.jsx',
    //         // input: 'resources/js/app.jsx',
    //         // refresh: true,
    // ]),
    //     react(),
    // ],
    // proxy: {
    //     '/api': 'http://localhost:80'
    // }
    // resolve: {
    //     alias: {
    //         '@' : '/resources/js'
    //     }
    // }
});
