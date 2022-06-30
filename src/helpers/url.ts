export function getBaseUrl(): string {
  // @ts-ignore
  const baseURL = !process.env.PROD ? 'http://localhost:8080' : 'https://shoppingify-be.onrender.com'
  return baseURL
}