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
        '/home/kevineitor/repos/shopping-cart/src/components/ProductInfo/ProductInfo.css'
      ],
    },
  },
})
