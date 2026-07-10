import { defineConfig } from 'vite';

export default defineConfig({
    // Add this base path for GitHub Pages
    base: '/archa-media/',
    
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                contact: 'contact.html',
                academics: 'academics.html',
                art: 'art.html',
                electronics: 'electronics.html',
                other: 'other.html',
                photography: 'photography.html',
                programming: 'programming.html'
            }
        }
    },
    server: {
        open: true
    },
    publicDir: 'public'
});