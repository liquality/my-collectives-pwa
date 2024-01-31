import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import mkcert from 'vite-plugin-mkcert';
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: false },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  plugins: [
    nodePolyfills(),
    mkcert(),
    react(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
      manifest: {
        display: 'standalone',
        scope: '/',
        name: 'Liquality MyCollective.tech',
        short_name: 'MyCollective.tech',
        description: 'Liquality MyCollective.tech',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  /*   test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    }, */
});
