export const validatePort = (
  port: number | string | undefined,
): number | null => {
  port = Number(port)
  if (Number.isInteger(port) && port >= 0 && port <= 65535) return port
  return null
}
