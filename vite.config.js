import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "/home/kevineitor/repos/shopping-cart/src/components/Home/Home.css",
        "/home/kevineitor/repos/shopping-cart/src/App.css",
        '/home/kevineitor/repos/shopping-cart/src/components/Shop/Shop.css',
        '/home/kevineitor/repos/shopping-cart/src/components/Cart/Cart.css',
        '/home/kevineitor/repos/shopping-cart/src/components/ProductInfo/ProductInfo.css',
        '/home/kevineitor/repos/shopping-cart/src/App.jsx',
        "/home/kevineitor/repos/shopping-cart/src/components/Home/Home.jsx",
        '/home/kevineitor/repos/shopping-cart/src/components/Shop/Shop.jsx',
        '/home/kevineitor/repos/shopping-cart/src/components/Cart/Cart.jsx',
        '/home/kevineitor/repos/shopping-cart/src/components/ProductInfo/ProductInfo.jsx',
        '/react',
        '/react-dom/client',
        "/react-router-dom",
        '/react-transition-group',
        '/home/kevineitor/repos/shopping-cart/src/main.jsx'
      ],
    },
  },
})
