import path from 'path';
import { defineConfig} from 'vite';


export default defineConfig(() => {
  return {
    define: {},
    server: {
      port: 3100,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [],
    build: {},
  };
});
