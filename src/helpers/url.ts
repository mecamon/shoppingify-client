export function getBaseUrl(): string {
  // @ts-ignore
  const baseURL = !process.env.PROD ? 'https://shoppingify-be.onrender.com' : 'https://shoppingify-be.onrender.com'
  return baseURL
}