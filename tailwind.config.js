/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#ffffff',
                    dark: '#2a3549',
                },
                sidebar: {
                    DEFAULT: '#f8f9fa',
                    dark: '#2d3748',
                },
                text: {
                    DEFAULT: '#1a1a1a',
                    dark: '#f8f9fa',
                },
                border: {
                    DEFAULT: '#e2e8f0',
                    dark: '#4a5568',
                }
            }
        },
    },
    plugins: [],
}
