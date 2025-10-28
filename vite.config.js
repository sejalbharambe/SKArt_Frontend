import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000, // optional: choose port
  //   proxy: {
  //     '/users': 'http://localhost:8080' // redirect API calls to backend
  //   }
  // }
});
