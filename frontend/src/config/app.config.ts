
export const AppConfig = () => ({
  environment: import.meta.env.VITE_ENV || 'dev',
  app: {
    name: import.meta.env.VITE_SPA_NAME || '',
    hostUrl: import.meta.env.VITE_SPA_URI || '',
  },
  api: { products: import.meta.env.VITE_API_PRODUCTS_URI || '', }
});
