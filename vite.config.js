import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })




module.exports = defineConfig({
  plugins: [react()],
  theme: {
    extend: {
      fontFamily: {
        'bad-script': ['"Bad Script"', 'cursive']
      }
    }
  }

})