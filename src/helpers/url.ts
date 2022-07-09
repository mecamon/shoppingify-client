export function getBaseUrl(): string {
  // @ts-ignore
  const baseURL = !process.env.PROD ? 'http://localhost:8080' : process.env.API_URL as string
  return baseURL
}