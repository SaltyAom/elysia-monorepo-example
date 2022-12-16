import { sveltekit } from '@sveltejs/kit/vite'
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit(), WindiCSS()],
    server: {
        port: 3002
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
}

export default config
