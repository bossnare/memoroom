import { VitePWA } from 'vite-plugin-pwa';

// This plugin is used to configure the Progressive Web App (PWA) features
export const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Diary',
    short_name: 'Diary',
    description: 'A simple notes app to use everyday life.',
    theme_color: '#000000',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000', // fanampin'ny theme_color

    icons: [
      {
        src: '/icon_192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon_512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  // This is the configuration for the service worker
  // It includes caching strategies and other PWA features
  // workbox: {
  //   navigateFallback: undefined, // Disable navigate fallback for SPA
  //   globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}'],
  //   runtimeCaching: [
  //     {
  //       urlPattern: /^https:\/\/api\.weatherapi\.com\//,
  //       handler: 'NetworkFirst',
  //       options: {
  //         cacheName: 'weather-api-cache',
  //         expiration: {
  //           maxEntries: 50, // Maximum number of entries in the cache
  //           maxAgeSeconds: 24 * 60 * 60, // 1 day
  //         },
  //       },
  //     },
  //   ],
  // },
  //   devOptions: {
  //     enabled: true, // Enable PWA in development mode
  //     type: 'module', // Use module type for service worker
  //   },
  //   injectRegister: 'auto', // Automatically inject the service worker registration script
  //   // This option allows the PWA to be registered automatically
});
