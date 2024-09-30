import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/face-recognition/",
  plugins: [react()],
//   server: {
//     port: 3000, // Change this to the desired port
// },
})
