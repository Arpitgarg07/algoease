export function getIconUrl(symbol: string) {
  return "https://coinicons-api.vercel.app/api/icon/" + symbol.toLowerCase();
}
