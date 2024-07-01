import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      host: '127.0.0.1',
      port: 3100,
      proxy: {
        '/RockBlade-System': {
          target: 'http://localhost:18080/RockBlade-System',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/RockBlade-System`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:18080/RockBlade-System/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
      open: true, // 项目启动后，自动打开
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
  },
});
