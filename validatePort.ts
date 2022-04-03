export const validatePort = (port: number | string | undefined) => {
  port = Number(port);
  if (Number.isInteger(port) && 0 <= port && port <= 65535) return port;
  return null;
};

const test_hoge = 'aaa';
